import express from "express";
import routes from "./routes/index.mjs";
import errorHandler from "./middlewares/error-handler.mjs";
import path from "path"
import overrideMethod from "./middlewares/override-method.mjs";
import { sequelize } from "./config/database.mjs";
import session from "express-session";
import auth from "./middlewares/auth.mjs";
import { redisStore } from "./config/redis.mjs";
import cors from 'cors'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import chat from "./chat.mjs";

const app = express();
await sequelize.authenticate();
// await sequelize.sync({alter: true});
await sequelize.sync();
app.use(cors({
  origin: "*",
}));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")
app.set("views", path.resolve(import.meta.dirname, 'views'))

app.use(session({
  store: redisStore,
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
}))

app.use(auth)
app.use(overrideMethod)
app.use(routes);
app.use(errorHandler);

const server = http.createServer(app)

const io = new SocketServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

io.use((socket, next) => {
  try {
    auth(socket.request, {}, next)
  } catch (e) {
    console.log(e)
  }
})

io.on("connection", (socket) => chat(socket, io))
const PORT = 3000;

server.listen(PORT, () => {
  console.log("Server is Runing Port", PORT);
});
