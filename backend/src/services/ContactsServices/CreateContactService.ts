import { Contacts } from "../../models/ContactModel";

interface Request {
  id: number;
  name: string;
  number: string;
}

interface Contact {
  id: number;
  name: string;
  number: string;
}

const CreateContactService = async ({
  id,
  name,
  number,
}: Request): Promise<Contact | null> => {
  const whereCondition = {
    number,
  };
  const contact = await Contacts.findOne({
    where: whereCondition,
  });

  if (contact) {
    return null;
  } else {
    const contact = await Contacts.create({
      name,
      number,
    });

    return contact;
  }
};

export default CreateContactService;
