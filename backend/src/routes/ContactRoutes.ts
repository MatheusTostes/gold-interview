import { Router } from "express";

import {
  createContact,
  deleteContact,
  getContactById,
  getContactsService,
  updateContact,
} from "../controller/ContactsController";

const router = Router();

router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
router.get("/:id", getContactById);
router.get("/", getContactsService);

export default router;
