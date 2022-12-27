import { RequestHandler } from "express";
import AuthUserService from "../services/SessionServices/AuthUserService";

export const generateToken: RequestHandler = async (req, res, next) => {
  const response = await AuthUserService({
    ...req.body,
  });

  if (!response || !response?.user || !response?.token) {
    return res.status(409).json({ message: "Incorrect email or password" });
  }

  const { user, token } = response;

  return res
    .status(201)
    .json({ message: "Token generated successfully", data: { user, token } });
};
