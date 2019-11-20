import express from "express";
import nannyController from "../../controller/nannies/auth";
import nannies from "../../controller/nannies/nannies";

const { createNanny, nannyLogin } = nannyController;
const { getAllNannies, searchNannies } = nannies;

const router = express.Router();

router.post("/signup", createNanny);
router.post("/login", nannyLogin);
router.get("/", getAllNannies);
router.get("/nanny", searchNannies);

export default router;
