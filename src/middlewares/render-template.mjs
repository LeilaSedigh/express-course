import fs from "fs";

export default (filePath, parms, cb) => {
  let view = fs.readFileSync(filePath, "utf-8");
  console.log("view", view);

  const entries = Object.entries(parms);

  entries.forEach(([key, value]) => {
    if (typeof value === "string") {
      view = view.replace(`#${key}#`, value);
    }
  });
  return cb(null, view);
};
