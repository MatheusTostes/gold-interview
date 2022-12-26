import { Op } from "sequelize";
import { Contacts } from "../../models/ContactModel";

interface Request {
  id: number;
  name: string;
  number: string;
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
  message?: string;
}

interface ErrorMessage {
  message: string;
}

const UpdateContactService = async ({
  id,
  name,
  number,
  user,
}: Request): Promise<Contact | ErrorMessage> => {
  const contact = await Contacts.findOne({
    where: { id: id, userId: user.id },
  });

  if (!contact) {
    return { message: "Contact not found" };
  } else {
    const numberInUse = await Contacts.findOne({
      where: {
        number,
        userId: user.id,
        id: {
          [Op.ne]: id,
        },
      },
    });

    if (numberInUse) {
      return { message: "Number already in use" };
    }

    await contact.update({
      name,
      number,
    });

    return contact;
  }
};

export default UpdateContactService;
