export default (error, req, res, next) =>{
console.log(error);

const status = error.status || 500

const content = status < 500 ? error.message : process.env.NODE_ENV === "development" ? error.message : "server Error"

console.log(process.env.NODE_ENV)



res.status(status).render("error" , {
    title: `Error ${status}`,
    content
})
}