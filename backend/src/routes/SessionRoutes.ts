import { Router } from "express";
import { createUser } from "../controller/UserController";
import { generateToken } from "../controller/SessionController";

const router = Router();

router.post("/signup", createUser);
router.post("/signin", generateToken);

export default router;
