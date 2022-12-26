import { Router } from "express";
import auth from "../middewares/auth";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controller/UserController";
import userValid from "../middewares/userValid";

const router = Router();

router.post("/", userValid, createUser);
router.put("/:id", auth, userValid, updateUser);
router.delete("/:id", auth, deleteUser);
router.get("/:id", auth, getUserById);
router.get("/", auth, getUsers);

export default router;
