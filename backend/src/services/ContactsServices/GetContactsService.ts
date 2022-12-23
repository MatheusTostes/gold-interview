import { Contacts } from "../../models/ContactModel";

interface Contact {
  id: number;
  name: string;
  number: string;
}

const GetContactsService = async (): Promise<Contact[]> => {
  const contact = await Contacts.findAll();

  return contact;
};

export default GetContactsService;
