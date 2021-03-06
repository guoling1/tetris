var ws = require('nodejs-websocket');

var clientCount = 0;
var server = ws.createServer(function (conn) {
    console.log("new connection");
    clientCount++;
    conn.nickname = 'user' + clientCount;
    broadcast(conn.nickname + ' comes in');
    conn.on("text", function (str) {
        console.log("Received "+ str);
        broadcast(str)
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        broadcast(conn.nickname +" left")
    })
    conn.on("error", function (err) {
        console.log("handle err")
        console.log(err)
    })
}).listen(8001);

function broadcast(str) {
    server.connections.forEach(function (connection) {
        connection.sendText(str)
    })
}