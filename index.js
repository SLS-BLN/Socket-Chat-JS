const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

app.use(express.static(__dirname + "/public"));

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
