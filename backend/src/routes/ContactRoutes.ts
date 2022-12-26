import { Router } from "express";
import auth from "../middewares/auth";

import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from "../controller/ContactsController";
import contactValid from "../middewares/contactValid";

const router = Router();

router.post("/", auth, contactValid, createContact);
router.put("/:id", auth, contactValid, updateContact);
router.delete("/:id", auth, deleteContact);
router.get("/:id", auth, getContactById);
router.get("/", auth, getContacts);

export default router;
