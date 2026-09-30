import express from "express";
import routes from "./routes/index.mjs";
import errorHandler from "./middlewares/error-handler.mjs";
import path from "path"
import overrideMethod from "./middlewares/override-method.mjs";
import { sequelize } from "./config/database.mjs";
import session from "express-session";
import { RedisStore } from 'connect-redis'
import { createClient } from "redis"

// Initialize client.
const redisClient = createClient({
  url: "redis://localhost:6377",
});
redisClient.connect().catch(console.error)

// initialize store 
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp"
})

const app = express();
await sequelize.authenticate();
await sequelize.sync();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", path.resolve(import.meta.dirname, 'views'))

app.use(session({
  store: redisStore,
  resave: false,
  saveUninitialized: true,
  secret: "your-super-secret-key;lfvdf;jkbndf/fvbkdfjn;vsdfvfv",
}))

app.use(overrideMethod)

app.use(routes);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is Runing Port", PORT);
});