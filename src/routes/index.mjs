import express from "express";
import general from "./general.mjs";
import admin from "./admin/index.mjs"

const router = express.Router()


router.use("/", general); 

router.use("/admin", admin)

// 404 Middleware 
router.use((req,res , next) => {
    res.status(404).send("Not Found");
});

export default router
