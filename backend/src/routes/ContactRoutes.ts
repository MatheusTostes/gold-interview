import { Router } from "express";
import auth from "../middewares/auth";

import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from "../controller/ContactsController";

const router = Router();

router.post("/", auth, createContact);
router.put("/:id", auth, updateContact);
router.delete("/:id", auth, deleteContact);
router.get("/:id", auth, getContactById);
router.get("/", auth, getContacts);

export default router;
