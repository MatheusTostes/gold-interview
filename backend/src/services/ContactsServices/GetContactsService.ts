import { Contacts } from "../../models/ContactModel";

interface Contact {
  id: number;
  name: string;
  number: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface Request {
  user: IUser;
}

const GetContactsService = async ({ user }: Request): Promise<Contact[]> => {
  const contact = await Contacts.findAll({
    where: {
      userId: user.id,
    },
  });

  return contact;
};

export default GetContactsService;
