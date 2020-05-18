const app = require("http").createServer(handler);
const fs = require("fs");
const io = require("socket.io")(app);

app.listen(3333);

function handler(req, res) {
  fs.readFile(__dirname + "/index.html", (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("Erro ao acessar o arquivo !");
    }

    res.writeHead(200);
    res.end(data);
  });
}

const users = {};

io.on("connection", (socket) => {
  console.log(`${socket.id} acessou o chat!`);

  socket.on("joinning", (data) => {
    users[socket.id] = data.username;
    console.log(`${users[socket.id]} entrou no chat !`);
    io.emit("joinning", data.username);
  });

  socket.on("new-message", (data) =>
    io.emit("new-message", `${users[socket.id]} disse ${data}`)
  );
});
