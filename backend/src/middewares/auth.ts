import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface IDecode {
  id: string;
  name: string;
  profile: string;
}

interface RequestWithUserRole extends Request {
  user?: IDecode;
}

const auth = (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = <IDecode>verify(token, process.env.JWT_SECRET || "secret");

    req.body.user = decoded;
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  return next();
};

export default auth;
