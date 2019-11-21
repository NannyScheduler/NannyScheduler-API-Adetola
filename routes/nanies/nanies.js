import express from "express";
import nannyController from "../../controller/nannies/auth";
import nannies from "../../controller/nannies/nannies";
import Auth from "../../middlewares/auth";

const { createNanny, nannyLogin } = nannyController;
const { getAllNannies, searchNannies, acceptOrRejectRequest } = nannies;
const { verifyNannyToken, verifyParentToken } = Auth;

const router = express.Router();

router.post("/signup", createNanny);
router.post("/login", nannyLogin);
router.get("/", verifyParentToken, getAllNannies);
router.get("/nanny", verifyParentToken, searchNannies);
router.post("/approve/:id", verifyNannyToken, acceptOrRejectRequest);

export default router;
