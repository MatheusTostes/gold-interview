import { RequestHandler } from "express";
import UpdateContactService from "../services/ContactsServices/UpdateContactService";
import CreateContactService from "../services/ContactsServices/CreateContactService";
import DeleteContactService from "../services/ContactsServices/DeleteContactService";
import GetContactByIdService from "../services/ContactsServices/GetContactByIdService";
import GetContactsService from "../services/ContactsServices/GetContactsService";

export const createContact: RequestHandler = async (req, res, next) => {
  const contact = await CreateContactService({ ...req.body });

  if (!contact) {
    return res.status(409).json({ message: "Contact already exists" });
  }

  return res
    .status(201)
    .json({ message: "Contact created successfully", data: contact });
};

export const updateContact: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const contact = await UpdateContactService({ id, ...req.body });

  if (!contact) {
    return res
      .status(404)
      .json({ message: "Contact not found or number already in use" });
  }

  return res
    .status(200)
    .json({ message: "Contact updated successfully", data: contact });
};

export const deleteContact: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const contact = await DeleteContactService({ id, ...req.body });

  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  return res
    .status(200)
    .json({ message: "Contact deleted successfully", data: contact });
};

export const getContactById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const contact = await GetContactByIdService({ id, ...req.body });

  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  return res
    .status(200)
    .json({ message: "Contact fetched successfully", data: contact });
};

export const getContacts: RequestHandler = async (req, res, next) => {
  const contacts = await GetContactsService({ ...req.body });

  return res
    .status(200)
    .json({ message: "Contacts fetched successfully", data: contacts });
};
