import express from "express";
import ArticleControler from "../../controllers/api/article.mjs";

const router = express.Router()

router.get("/" , ArticleControler.list)
router.get("/:id" , ArticleControler.get)
router.post("/" , ArticleControler.create)
router.put("/:id" , ArticleControler.update)
router.delete("/:id" , ArticleControler.delete)

export default router