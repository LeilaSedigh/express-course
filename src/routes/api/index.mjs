import express from "express";
import article from "./article.mjs";
import auth from "./auth.mjs";
import file from "./file.mjs";

const router = express.Router()
router.use("/article" , article)
router.use("/file" , file)
router.use("/" , auth)

export default router