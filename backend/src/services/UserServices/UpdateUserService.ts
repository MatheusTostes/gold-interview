import { Users } from "../../models/UserModel";

interface Request {
  id: number;
  name: string;
  email: string;
  password: string;
  user: User;
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
  user,
}: Request): Promise<User | null> => {
  const userObj = await Users.findOne({
    where: { id: id, userId: user.id },
  });

  if (!userObj) {
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

    await userObj.update({
      name,
      email,
      password,
    });

    return userObj;
  }
};

export default UpdateUserService;
