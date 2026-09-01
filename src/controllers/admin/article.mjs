class ArticleController {
    list(req, res ) {
        res.send("Admin Article")
    }
}

export default new ArticleController()