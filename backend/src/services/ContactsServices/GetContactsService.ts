import { Contacts } from "../../models/contacts";

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
