const articles =[]

class ArticleController {
    list(req, res) {
        res.render("admin/article/list", {
            title: "Article List",
            articles
        });

    }
    get(req, res) {
        const {id} = req.params;
        const article = articles.find(article => article.id === +id)

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

        articles.push({id:Date.now() ,...req.body})
        res.redirect("/admin/article")
    }
}

export default new ArticleController();
