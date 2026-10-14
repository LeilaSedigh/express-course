import express from "express";
import ArticleControler from "../../controllers/api/article.mjs";
import acl from "../../middlewares/acl.mjs";
import { validate } from "express-jsonschema";
import { articleSchema } from "../../validators/article.mjs";

const router = express.Router()

router.get("/" , acl("WRITER"), ArticleControler.list)
router.get("/:id" , acl("WRITER"),ArticleControler.get)
router.post("/" ,  acl("WRITER"),validate(articleSchema),ArticleControler.create)
router.put("/:id" ,  acl("MODERATOR"),ArticleControler.update)
router.delete("/:id" , acl("ADMIN"),ArticleControler.delete)

export default router