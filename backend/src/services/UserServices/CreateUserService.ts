import { Users } from "../../models/UserModel";

interface Request {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  profile: string;
}

const CreateUserService = async ({
  name,
  email,
  password,
}: Request): Promise<User | null> => {
  const whereCondition = {
    email,
  };
  const contact = await Users.findOne({
    where: whereCondition,
  });

  if (contact) {
    return null;
  } else {
    const contact = await Users.create({
      name,
      email,
      password,
    });

    return contact;
  }
};

export default CreateUserService;
