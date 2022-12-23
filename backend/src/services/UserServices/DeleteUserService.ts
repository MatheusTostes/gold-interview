import { Users } from "../../models/UserModel";

interface Request {
  id: string;
  user: User;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const DeleteUserService = async ({
  id,
  user,
}: Request): Promise<User | null> => {
  const userObj = await Users.findOne({
    where: { id: id, userId: user.id },
  });

  if (!userObj) {
    return null;
  } else {
    await userObj.destroy();

    return userObj;
  }
};

export default DeleteUserService;
