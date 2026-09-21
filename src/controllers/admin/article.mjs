import { NotFoundError } from "../../utils/errors.mjs";

const articles = []

class ArticleController {
    list(req, res) {
        res.render("admin/article/list", {
            title: "Article List",
            articles
        });
    }
    get(req, res) {
        const { id } = req.params;
        const article = articles.find(article => article.id === +id)

        if (!article) {
            throw new NotFoundError("Article Not Found")
        }

        res.render("admin/article/detail", {
            title: article.title,
            article
        })
    }
    create(req, res) {
        res.render('admin/article/create', {
            title: "Create new Article"
        })
    }
    add(req, res) {
        console.log(req.body)

        articles.push({ id: Date.now(), ...req.body })
        res.redirect("/admin/article/")
    }

    edit(req, res) {
        const { id } = req.params;

        const article = articles.find(article => article.id === +id)
        if (!article) {
            throw new NotFoundError("Article Not Found")
        }
        res.render('admin/article/edit', {
            title: `Edit Article ${article.title}`,
            article
        })
    }
    update(req, res) {
        const { id } = req.params;
        const { title, text } = req.body

        const article = articles.find(article => article.id === +id)
        if (!article) {
            throw new NotFoundError("Article Not Found")
        }

        article.title = title;
        article.text = text;

        res.redirect(`/admin/article/${article.id}`)

    }
    delete(req, res) {
        const { id } = req.params;

        const article = articles.find(article => article.id === +id)
        if (!article) {
            throw new NotFoundError("Article Not Found")
        }

        const newArticles = articles.filter(article => article.id !== +id)

        articles = newArticles
        res.redirect("admin/article")
    }
}

export default new ArticleController();
