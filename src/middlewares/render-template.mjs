import path from 'path'
import fs from 'fs'

export default (req, res, next) => {
  res.renderTemplate = function renderTemplate(filename,parms) {
    const filePath = path.resolve(
      import.meta.dirname,
      "views",
      "..",
      `${filename}.html`,
    );
    let view = fs.readFileSync(filePath, "utf-8");
    console.log("view", view);

    const entries = Object.entries(parms);
    entries.forEach(([key, value]) => {
      view = view.replace(`#${key}#`, value);
    });

    res.send(view)
  };
  next();
}