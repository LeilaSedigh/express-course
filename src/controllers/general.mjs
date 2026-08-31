import { NotFoundError } from "../utils/errors.mjs";

export function home(req, res) {
  console.log(leila)
  res.render("index", { title: "Home age", content: "This is Home Page" });
}

export function about(req, res) {
  res.render("about", { title: "About age", content: "This is About Page" });
}
