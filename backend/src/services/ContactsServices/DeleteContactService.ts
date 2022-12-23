import { Contacts } from "../../models/ContactModel";

interface Request {
  id: string;
}

interface Contact {
  id: number;
  name: string;
  number: string;
}

const DeleteContactService = async ({
  id,
}: Request): Promise<Contact | null> => {
  const contact = await Contacts.findByPk(id);

  if (!contact) {
    return null;
  } else {
    await contact.destroy();

    return contact;
  }
};

export default DeleteContactService;
