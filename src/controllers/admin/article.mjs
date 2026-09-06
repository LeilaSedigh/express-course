class ArticleController {
    list(req, res) {
        res.render("admin/article/list", {
            title: "Article List",
            articles: [
                { id: 1, title: "Article" },
                { id: 2, title: "Article 2" },
            ],
        });

    }
    get(req, res) {
        const article = {
            id: 1,
            title: "Article",
            text: "Salam man de to yar ghadimi"
        }

        res.render("admin/article/detail", {
            title: article.title,
            article
        })
    }
    create(req ,res){
        res.render('admin/article/create' ,{
            title: "Create new Article"
        })
    }
    add(req,res){
        console.log(req.body)
        res.redirect("/admin/article")
    }
}

export default new ArticleController();
