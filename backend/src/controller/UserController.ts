import { RequestHandler } from "express";
import DeleteUserService from "./../services/UserServices/DeleteUserService";
import CreateUserService from "./../services/UserServices/CreateUserService";
import UpdateUserService from "./../services/UserServices/UpdateUserService";
import GetUserByIdService from "./../services/UserServices/GetUserByIdService";
import GetUsersService from "./../services/UserServices/GetUsersService";

export const createUser: RequestHandler = async (req, res, next) => {
  const contact = await CreateUserService({ ...req.body });

  if (!contact) {
    return res.status(409).json({ message: "Email already in use" });
  }

  return res
    .status(201)
    .json({ message: "User created successfully", data: contact });
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const contact = await UpdateUserService({ id, ...req.body });

  if (!contact) {
    return res
      .status(404)
      .json({ message: "User not found or number already in use" });
  }

  return res
    .status(200)
    .json({ message: "User updated successfully", data: contact });
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const contact = await DeleteUserService({ id });

  if (!contact) {
    return res.status(404).json({ message: "User not found" });
  }

  return res
    .status(200)
    .json({ message: "User deleted successfully", data: contact });
};

export const getUserById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const contact = await GetUserByIdService({ id });

  if (!contact) {
    return res.status(404).json({ message: "User not found" });
  }

  return res
    .status(200)
    .json({ message: "User fetched successfully", data: contact });
};

export const getUsers: RequestHandler = async (req, res, next) => {
  const users = await GetUsersService();

  return res
    .status(200)
    .json({ message: "Users fetched successfully", data: users });
};
