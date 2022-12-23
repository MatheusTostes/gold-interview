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

const UpdateContactService = async ({
  id,
  name,
  number,
}: Request): Promise<Contact | null> => {
  const contact = await Contacts.findByPk(id);

  if (!contact) {
    return null;
  } else {
    const numberInUse = await Contacts.findOne({
      where: {
        number,
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
