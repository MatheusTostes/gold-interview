import { Router } from "express";
import auth from "../middewares/auth";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controller/UserController";

const router = Router();

router.post("/", createUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);
router.get("/:id", auth, getUserById);
router.get("/", auth, getUsers);

export default router;
