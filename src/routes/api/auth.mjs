import express from "express";
import AuthController from "../../controllers/api/auth.mjs";

const router = express.Router()

router.post("/login" , AuthController.login)
router.post("/user" , AuthController.user)

export default router