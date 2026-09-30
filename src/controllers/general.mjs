export function home(req, res) {
  res.render("index", { title: req.session.user?.username, content: "This is Home Page" });
}

export function about(req, res) {
  res.render("about", { title: "About age", content: "This is About Page" });
}