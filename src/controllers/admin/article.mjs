class ArticleController {
    list(req, res ) {
        res.render("/admin/article/list" , {
            title: "Article List",
            content: "Salam"
        })
    }
}

export default new ArticleController()