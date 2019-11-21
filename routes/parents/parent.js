import express from "express";
import parentController from "../../controller/parents/auth";
import requests from "../../controller/parents/parent";
import Auth from "../../middlewares/auth";
import Helper from "../../helper/users";

const { createParent, parentLogin } = parentController;
const { requestNanny } = requests;
const { verifyParentToken } = Auth;
const { trimmer } = Helper;

const router = express.Router();

router.post("/signup", trimmer, createParent);
router.post("/login", trimmer, parentLogin);
router.post("/request/:id", verifyParentToken, requestNanny);

export default router;
