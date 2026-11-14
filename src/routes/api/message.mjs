import express from "express";
import MessageController from '../../controllers/api/message.mjs'

const router = express.Router()

router.get("/",  MessageController.list)

export default router