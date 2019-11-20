import express from "express";
import parentController from "../../controller/auth";

const { createParent, parentLogin } = parentController;

const router = express.Router();

router.post("/signup", createParent);
router.post("/login", parentLogin);

export default router;
