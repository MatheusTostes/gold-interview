import { Users } from "../../models/UserModel";

interface Request {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const UpdateUserService = async ({
  id,
  name,
  email,
  password,
}: Request): Promise<User | null> => {
  const user = await Users.findByPk(id);

  if (!user) {
    return null;
  } else {
    const emailInUse = await Users.findOne({
      where: {
        email,
      },
    });

    if (emailInUse) {
      return null;
    }

    await user.update({
      name,
      email,
      password,
    });

    return user;
  }
};

export default UpdateUserService;
