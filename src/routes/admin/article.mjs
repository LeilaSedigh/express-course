import express from "express";
import ArticleController from "../../controllers/admin/article.mjs"

const router = express.Router()

router.get("/", ArticleController.list)
router.get("/:id", ArticleController.get)
router.get("/create", ArticleController.create)


export default router
