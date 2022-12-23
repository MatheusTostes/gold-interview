import { Router } from "express";

import { createContact } from "../controller/contacts";

const router = Router();

router.post("/", createContact);

export default router;
