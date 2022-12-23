import jwt from "jsonwebtoken";

interface IUser {
  id: number;
  name: string;
  profile?: string;
}

export const generateAuthToken = (user: IUser) => {
  const secret = process.env.JWT_SECRET as string;

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      profile: user.profile,
    },
    secret || "secret",
    {
      expiresIn: "1h",
    }
  );
  return token;
};
