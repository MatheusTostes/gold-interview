import { Contacts } from "../../models/ContactModel";

interface Request {
  id: string;
  user: IUser;
}

interface IUser {
  id: number;
  name: string;
  email: string;
}
interface Contact {
  id: number;
  name: string;
  number: string;
}

const GetContactByIdService = async ({
  id,
  user,
}: Request): Promise<Contact | null> => {
  const contact = await Contacts.findOne({
    where: { id: id, userId: user.id },
  });

  if (!contact) {
    return null;
  }

  return contact;
};

export default GetContactByIdService;
