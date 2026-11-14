import Meessage from './models/message.mjs'
const map = new Map()


export default function chat(socket, io) {
  const user = socket.request.user;

  map.set(user.id, socket.id)

  console.log("User:", user);

  socket.on("message", async (data) => {
    console.log(data)
    console.log(map.get(data.to))

    const message = new Meessage(data);
    await message.save()

    socket.to(map.get(data.to)).emit("message", message)
    socket.emit("message", message)

  })
}
