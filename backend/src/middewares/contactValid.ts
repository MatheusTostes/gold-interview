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
    !Number(number) ||
    (number.includes("55") && (number?.length < 12 || number?.length > 13))
  ) {
    res.status(400).json({ message: "Invalid number" });
    return;
  }

  return next();
};

export default contactValid;
