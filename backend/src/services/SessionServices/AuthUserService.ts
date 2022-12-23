import { generateAuthToken } from "../../helpers/GenerateToken";
import { Users } from "../../models/UserModel";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Users;
  token: string;
}

const AuthUserService = async ({
  email,
  password,
}: Request): Promise<Response | null> => {
  const user = await Users.findOne({
    where: {
      email,
      password,
    },
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    return null;
  }

  const token = generateAuthToken(user);
  return {
    user,
    token,
  };
};

export default AuthUserService;
