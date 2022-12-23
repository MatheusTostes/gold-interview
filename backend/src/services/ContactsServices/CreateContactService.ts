import { Contacts } from "../../models/contacts";

interface Request {
  name: string;
  number: string;
}

interface Contact {
  id: number;
  name: string;
  number: string;
}

const CreateContactService = async ({
  name,
  number,
}: Request): Promise<Contact> => {
  const contact = await Contacts.create({
    name,
    number,
  });

  return contact;
};

export default CreateContactService;
