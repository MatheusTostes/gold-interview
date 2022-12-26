import { Router } from "express";
import { createUser } from "../controller/UserController";
import { generateToken } from "../controller/SessionController";
import userValid from "../middewares/userValid";

const router = Router();

router.post("/signup", userValid, createUser);
router.post("/signin", generateToken);

export default router;
