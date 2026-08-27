import path from "path";
import fs from "fs";
import { title } from "process";

function renderTemplate(parms) {
  const filePath = path.resolve(
    import.meta.dirname,
    "..",
    "views",
    "index.html",
  );

  let view = fs.readFileSync(filePath, "utf-8");
  console.log("view", view);

  const entries = Object.entries(parms);
  entries.forEach(([key , value]) => {
    view = view.replace(`#${key}#` , value)
  })

  return view;
}

export function home(req, res) {
  res.send(renderTemplate({ title: "Home age", content: "This is Home Page" }));
}

export function about(req, res) {
  res.send(renderTemplate({ title: "About age", content: "This is About Page" }));
}
