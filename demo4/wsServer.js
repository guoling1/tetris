var ws = require('nodejs-websocket');

var clientCount = 0;
var server = ws.createServer(function (conn) {
    console.log("new connection");
    clientCount++;
    conn.nickname = 'user' + clientCount;
    var mes = {};
    mes.type = 'enter';
    mes.data = conn.nickname + ' comes in';
    broadcast(JSON.stringify(mes));
    conn.on("text", function (str) {
        console.log("Received "+ str);
        var mes = {};
        mes.type = 'message';
        mes.data = conn.nickname +"say: "+str;
        broadcast(JSON.stringify(mes));
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
        var mes = {};
        mes.type = 'leave';
        mes.data = conn.nickname + ' leave';
        broadcast(JSON.stringify(mes));
    })
    conn.on("error", function (err) {
        console.log("handle err");
        console.log(err)
    })
}).listen(8001);

function broadcast(str) {
    server.connections.forEach(function (connection) {
        connection.sendText(str)
    })
}