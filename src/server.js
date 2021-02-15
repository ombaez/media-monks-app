const app = require("../index");
const socketio = require("socket.io");
const { set, client } = require("./redis/config");
const PORT = process.env.PORT || 3000;

const expressServer = app.listen(PORT, () =>
  console.log(`Listening on ${PORT} for Express-WS-Redis Server`)
);

const io = socketio(expressServer);

io.on("connection", (socket) => {
  socket.on("ping", ({ msg }) => {
    if (msg === "ping") {
      socket.emit("pong", { msg: "pong" });
    }
  });
  socket.on("messageToServer", async ({ newKey, newValue }) => {
    try {
      if (newKey && newValue) {
        const check = await set(newKey, newValue);
        if (check === "OK") {
          socket.emit("confirmStorage", {
            status: 200,
            message: "Guardado OK",
          });
        }
      } else {
        socket.emit("value-error", {
          message: "Missing value",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
});

process.on("SIGTERM", () => {
  expressServer.end();
  client.end();
  console.log("byebye");
});
