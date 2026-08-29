import express from "express";
import routes from "./routes/index.mjs";
import errorHandler from "./middlewares/error-handler.mjs";
import renderTemplate from "./middlewares/render-template.mjs";

const app = express();
app.use(express.static("public"));

app.use(render-renderTemplate);

app.use(routes);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is Runing Port", PORT);
});
