import express from "express";
import nannyController from "../../controller/nannies/auth";
import nannies from "../../controller/nannies/nannies";
import Auth from "../../middlewares/auth";
import Helper from "../../helper/users";

const { createNanny, nannyLogin } = nannyController;
const { getAllNannies, searchNannies, acceptOrRejectRequest } = nannies;
const { verifyNannyToken, verifyParentToken } = Auth;
const { trimmer } = Helper;

const router = express.Router();

router.post("/signup", trimmer, createNanny);
router.post("/login", trimmer, nannyLogin);
router.get("/", verifyParentToken, getAllNannies);
router.get("/nanny", verifyParentToken, searchNannies);
router.post("/approve/:id", verifyNannyToken, acceptOrRejectRequest);

export default router;
