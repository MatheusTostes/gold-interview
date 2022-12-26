import { Request, Response, NextFunction } from "express";

const userValid = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, password } = req.body;

  console.log({ name, email, password });

  const emailFormat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!name || name === "") {
    res.status(400).json({ message: "Invalid name" });
    return;
  }

  if (!email || email === "" || !emailFormat.test(email)) {
    res.status(400).json({ message: "Invalid email" });
    return;
  }

  if (!password || password === "" || password.length < 6) {
    res.status(400).json({ message: "Password length must be 6 or higher" });
    return;
  }

  return next();
};

export default userValid;
