import express from "express";
import parentController from "../../controller/parents/auth";
import requests from "../../controller/parents/parent";
import Auth from "../../middlewares/auth";

const { createParent, parentLogin } = parentController;
const { requestNanny } = requests;
const { verifyParentToken } = Auth;

const router = express.Router();

router.post("/signup", createParent);
router.post("/login", parentLogin);
router.post("/request/:id", verifyParentToken, requestNanny);

export default router;
