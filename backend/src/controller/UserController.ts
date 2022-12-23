import { RequestHandler } from "express";
import DeleteUserService from "./../services/UserServices/DeleteUserService";
import CreateUserService from "./../services/UserServices/CreateUserService";
import UpdateUserService from "./../services/UserServices/UpdateUserService";
import GetUserByIdService from "./../services/UserServices/GetUserByIdService";
import GetUsersService from "./../services/UserServices/GetUsersService";
import { generateAuthToken } from "../helpers/GenerateToken";

export const createUser: RequestHandler = async (req, res, next) => {
  const user = await CreateUserService({ ...req.body });

  if (!user) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const token = generateAuthToken({
    id: user.id,
    name: user.name,
    profile: user.profile,
  });
  return res
    .status(201)
    .json({ message: "User created successfully", data: { user, token } });
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const user = await UpdateUserService({ id, ...req.body });

  if (!user) {
    return res
      .status(404)
      .json({ message: "User not found or number already in use" });
  }

  return res
    .status(200)
    .json({ message: "User updated successfully", data: user });
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const user = await DeleteUserService({ id });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res
    .status(200)
    .json({ message: "User deleted successfully", data: user });
};

export const getUserById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const user = await GetUserByIdService({ id });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res
    .status(200)
    .json({ message: "User fetched successfully", data: user });
};

export const getUsers: RequestHandler = async (req, res, next) => {
  const users = await GetUsersService();

  return res
    .status(200)
    .json({ message: "Users fetched successfully", data: users });
};
