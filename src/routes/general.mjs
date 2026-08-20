import express from "express";
import { home, about } from"../controllers/general.mjs"

const router = express.Router()

router.get("/", home)

router.get("/about" , about)

router.get("/api",(req,res) => {
   return res.json({ name : "Leila" })
})

export default router
