import express from "express";
import ArticleController from "../../controllers/admin/article.mjs"

const router = express.Router()

router.get("/", ArticleController.list)
router.get("/create", ArticleController.create)
router.post("/add", ArticleController.add)
router.get("/:id", ArticleController.get)
router.get("/edit/:id", ArticleController.edit)


export default router
