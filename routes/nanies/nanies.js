import express from "express";
import nannyController from "../../controller/nannies/auth";

const { createNanny } = nannyController;

const router = express.Router();

router.post("/signup", createNanny);
// router.post("/login", parentLogin);

export default router;
