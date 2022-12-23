import { RequestHandler } from "express";
import CreateContactService from "./../services/ContactsServices/CreateContactService";

export const createContact: RequestHandler = async (req, res, next) => {
  const contacts = await CreateContactService({ ...req.body });

  return res
    .status(200)
    .json({ message: "Contact created successfully", data: contacts });
};
