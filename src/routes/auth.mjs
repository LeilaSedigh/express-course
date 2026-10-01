import express from "express";
import AuthCotroler from "../controllers/auth.mjs"

const router = express.Router()

router.get("/register", AuthCotroler.registerPage)
router.post("/register", AuthCotroler.register)
router.get("/login", AuthCotroler.loginPage)
router.post("/login", AuthCotroler.login)
router.get("/logout", AuthCotroler.logout)

export default router
