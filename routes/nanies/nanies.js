import express from "express";
import nannyController from "../../controller/nannies/auth";

const { createNanny, nannyLogin } = nannyController;

const router = express.Router();

router.post("/signup", createNanny);
router.post("/login", nannyLogin);

export default router;
