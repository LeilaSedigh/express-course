import Article from "../models/article.mjs";

class ArticleControler{
    async list(req, res) {
        const data = await Article.findPaginate(req.query.page,{
            include: ["user"],
            limit: 4,
        })

        res.render("article/list", {
            title: "Article List",
            ...data
        });
    }
}

export default new ArticleControler()