import { Contacts } from "../../models/ContactModel";

interface Request {
  id: string;
}

interface Contact {
  id: number;
  name: string;
  number: string;
}

const GetContactByIdService = async ({
  id,
}: Request): Promise<Contact | null> => {
  const contact = await Contacts.findByPk(id);

  if (!contact) {
    return null;
  }

  return contact;
};

export default GetContactByIdService;
