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
}

const UpdateContactService = async ({
  id,
  name,
  number,
  user,
}: Request): Promise<Contact | null> => {
  const contact = await Contacts.findOne({
    where: { id: id, userId: user.id },
  });

  if (!contact) {
    return null;
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
      return null;
    }

    await contact.update({
      name,
      number,
    });

    return contact;
  }
};

export default UpdateContactService;
