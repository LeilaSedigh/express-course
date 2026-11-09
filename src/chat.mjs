export default function chat(socket, io) {
  const user = socket.request.user;
  console.log("User:", user);
  socket.on("message", (data)=>{
    console.log(data)
  })
  socket.emit("message", "salam");
}
