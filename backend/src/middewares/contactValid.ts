import { Request, Response, NextFunction } from "express";

const contactValid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, number } = req.body;
  if (!name || name === "") {
    res.status(400).json({ message: "Invalid name" });
    return;
  }

  if (
    !number ||
    number === "" ||
    number.length < 12 ||
    number.length > 13 ||
    !Number(number)
  ) {
    res.status(400).json({ message: "Invalid number" });
    return;
  }

  return next();
};

export default contactValid;
