import { Contacts } from "../../models/ContactModel";

interface Request {
  id: number;
  name: string;
  number: string;
  user: {
    id: number;
    name: string;
    profile: string;
  };
}

interface Contact {
  id: number;
  name: string;
  number: string;
  message?: string;
}

interface ErrorMessage {
  message: string;
}

const CreateContactService = async ({
  name,
  number,
  user,
}: Request): Promise<Contact | ErrorMessage> => {
  const whereCondition = {
    number,
    userId: user.id,
  };
  const contact = await Contacts.findOne({
    where: whereCondition,
  });

  if (contact) {
    return { message: "Number already in use" };
  } else {
    const contact = await Contacts.create({
      name,
      number,
      userId: user.id,
    });

    return contact;
  }
};

export default CreateContactService;
