import path from "path";
import fs from "fs";
import { title } from "process";

export function home(req, res) {
  res.renderTemplate('index',{ title: "Home age", content: "This is Home Page" });
}

export function about(req, res) {
  res.renderTemplate('about',{ title: "About age", content: "This is About Page" });
}
