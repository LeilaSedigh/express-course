import Article from "../../models/article.mjs";
import { NotFoundError } from "../../utils/errors.mjs";

const DEFULT_PAGE_SIZE = 3;

class ArticleController {
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
    async get(req, res) {
        const { id } = req.params;
        const article = await Article.findByPk(id, { include: ["user"] })

        if (!article) {
            throw new NotFoundError("Article Not Found")
        }

        res.render("admin/article/detail", {
            title: article.title,
            article,
            user: req.user,
        })
    }
    create(req, res) {
        res.render('admin/article/create', {
            title: "Create new Article",
            user: req.user,
        })
    }
    async add(req, res) {
        const { title, text } = req.body;

        await Article.create({ title, text, userId: req.user.id })
        res.redirect("/admin/article/")
    }
    async edit(req, res) {
        const { id } = req.params;

        const article = await Article.findByPk(id, { include: ["user"] })
        if (!article) {
            throw new NotFoundError("Article Not Found")
        }
        res.render('admin/article/edit', {
            title: `Edit Article ${article.title}`,
            article,
            user: req.user,
        })
    }
    async update(req, res) {
        const { id } = req.params;
        const { title, text } = req.body

        const article = await Article.findByPk(id)
        if (!article) {
            throw new NotFoundError("Article Not Found")
        }

        article.title = title;
        article.text = text;
        await article.save()

        res.redirect(`/admin/article/${article.id}`)

    }
    async delete(req, res) {
        const { id } = req.params;

        const article = await Article.findByPk(id)

        if (!article) {
            throw new NotFoundError("Article Not Found")
        }

        await article.destroy();

        res.redirect("/admin/article")
    }
}

export default new ArticleController();
