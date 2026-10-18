import express from "express";
import article from "./article.mjs";
import auth from "./auth.mjs";
import authenticate from "../../middlewares/auth.mjs";

const router = express.Router();

router.use("/", auth);
router.use("/article", authenticate, article);

export default router;