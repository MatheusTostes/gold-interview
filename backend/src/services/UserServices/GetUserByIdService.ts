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

const GetUserByIdService = async ({
  id,
  user,
}: Request): Promise<User | null> => {
  const userObj = await Users.findOne({
    where: { id: id, userId: user.id },
  });

  if (!userObj) {
    return null;
  }

  return userObj;
};

export default GetUserByIdService;
