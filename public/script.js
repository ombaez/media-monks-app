const socket = io("http://localhost:3000");

socket.emit("test-connection", { msg: "Connection OK" });

function handlerSubmit() {
  const newKey = document.querySelector("#user-key").value;
  const newValue = document.querySelector("#user-value").value;
  socket.emit("messageToServer", { newKey, newValue });
  if (!newKey || !newValue) {
    alert("Insert key and value");
  }
}

socket.on("confirmStorage", (data) => {
  alert(JSON.stringify(data.message));
});

socket.on("value-error", (data) => {
  alert(data.message);
});
