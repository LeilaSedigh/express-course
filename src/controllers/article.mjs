import Article from "../models/article.mjs";

const DEFULT_PAGE_SIZE = 3;
class ArticleControler{
    async list(req, res) {
        const { page = 1 } = req.query
        const { rows: articles, count: totals } = await Article.findAndCountAll({
            include: ["user"],
            order: [["id", "DESC"]],
            limit: DEFULT_PAGE_SIZE,
            offset: (page - 1) * DEFULT_PAGE_SIZE
        })

        res.render("admin/article/list", {
            title: "Article List",
            articles,
            user: req.user,
            totals,
            page: +page,
            pages: Math.ceil(totals / DEFULT_PAGE_SIZE)
        });
    }
}

export default new Article()