import express from "express";
import routes from "./routes/index.mjs";
import errorHandler from "./middlewares/error-handler.mjs";
import renderTemplate from "./middlewares/render-template.mjs";
import path from "path"

const app = express();

app.use(express.static("public"));

app.engine('leila' , renderTemplate)
app.set("view engine" , "leila")
app.set("views" , path.resolve(import.meta.dirname , 'views'))


app.use(routes);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is Runing Port", PORT);
});
