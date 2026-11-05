import io from 'socket.io-client'

const socket = io(import.meta.env.VITE_BASE_URL,)

export default function ChatApp() {

  
  return (
    <div>ChatApp</div>
  )
}
