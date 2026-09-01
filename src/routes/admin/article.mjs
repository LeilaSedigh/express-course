import express from "express";
import ArticleController from "../../controllers/admin/article.mjs"

const router = express.Router()

router.get("/admin/article", ArticleController.list)


export default router
