import express from "express";
import AuthCotroler from "../controllers/auth.mjs"

const router = express.Router()

router.get("/register", AuthCotroler.registerPage)
router.post("/register", AuthCotroler.register)



export default router
