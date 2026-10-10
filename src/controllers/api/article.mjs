import Article from "../../models/article.mjs"

class ArticleControler {
    async list(req, res) {
        const data = await Article.findPaginate(req.query.page, {
            include: ["user"],
        })

        res.json(data)
    }
    async get(req, res) {
        const { id } = req.params;
        const article = await Article.findByPk(id, { include: ["user"] })

        if (!article) {
            throw new NotFoundError("Article Not Found")
        }

        res.json(article)
    }
    async add(req, res) {
        const { title, text } = req.body;

        await Article.create({ title, text, userId: req.user.id })
        res.redirect("/admin/article/")
    }
}

export default new ArticleControler()