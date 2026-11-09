import io from "socket.io-client";
import { getAccessToken } from "../tools/utils";
import { useEffect } from "react";

const socket = io(import.meta.env.VITE_BASE_URL, {
  extraHeaders: {
    authorization: `Bearer ${getAccessToken()}`,
  },
});

export default function ChatApp() {
  useEffect(() => {
    socket.emit("message", "Hello server")
    socket.on("message", (data) => console.log("Salam", data));

  }, []);

  return <div>ChatApp</div>;
}
