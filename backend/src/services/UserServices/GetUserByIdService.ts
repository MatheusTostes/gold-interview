import { Users } from "../../models/UserModel";

interface Request {
  id: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const GetUserByIdService = async ({ id }: Request): Promise<User | null> => {
  const user = await Users.findByPk(id);

  if (!user) {
    return null;
  }

  return user;
};

export default GetUserByIdService;
