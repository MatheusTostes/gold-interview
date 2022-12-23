import { Router } from "express";

import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from "../controller/ContactsController";

const router = Router();

router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
router.get("/:id", getContactById);
router.get("/", getContacts);

export default router;
