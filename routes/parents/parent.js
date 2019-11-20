import express from "express";
import parentController from "../../controller/auth";

const { createParent } = parentController;

const router = express.Router();

router.post("/signup", createParent);

export default router;
