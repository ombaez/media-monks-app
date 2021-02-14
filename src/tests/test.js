const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const io = require("socket.io-client");

test("Check-> Connection", (done) => {
  const socket = io("http://localhost:3000");
  socket.emit("ping", { msg: "ping" });
  socket.on("pong", (data) => {
    expect(data.msg).contain("pong");
  });
  done();
});

test("Check-> No Connection", (done) => {
  const socket = io("http://localhost:3001/invalidSocket");
  socket.emit("ping", { msg: "ping" });
  socket.on("pong", (data) => {
    should.not.exist(data);
  });
  done();
});

test("Send values to storage", (done) => {
  const socket = io("http://localhost:3000");

  const newKey = "Test";
  const newValue = "Value";

  socket.emit("messageToServer", { newKey, newValue });
  socket.on("confirmStorage", (data) => {
    expect(data.message).contain("Guardado OK");
  });
  done();
});
