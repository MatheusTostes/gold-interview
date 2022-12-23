import { Users } from "../../models/UserModel";

interface User {
  id: number;
  name: string;
  email: string;
}

const GetUsersService = async (): Promise<User[]> => {
  const user = await Users.findAll({
    attributes: { exclude: ["password"] },
  });

  return user;
};

export default GetUsersService;
