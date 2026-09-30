export function home(req, res) {
  res.render("index", {
    title: "HomePage",
    content: "This is Home Page",
    user: req.user,
  });
}

export function about(req, res) {
  res.render("about", {
    title: "About age",
    content: "This is About Page",
    user: req.user,
  });
}