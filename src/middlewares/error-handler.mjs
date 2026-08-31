export default (error, req, res, next) => {
  console.log(error.stack);

  const status = error.status || 500;
  let content, stack='';

  if (process.env.NODE_ENV === "development") {
    stack = error.stack;
    content = error.message
  } else {
    content = status < 500 ? error.message : "server Error"
  }


  console.log(process.env.NODE_ENV);

  res.status(status).render("error", {
    title: `Error ${status}`,
    content,
    stack
  });
};
