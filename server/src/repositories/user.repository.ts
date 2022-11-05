import type { CreateUser, DeleteOne } from "../types/user";

import { User } from "../mongo/models";
import AppLog from "../events/AppLog";

export async function create(data: CreateUser) {
  const { name, email, password } = data;

  const user = await new User({
    name,
    email,
    password,
  }).save({
    validateBeforeSave: false,
  });

  return AppLog({ type: "Repository", text: "User instance inserted" });
}

export async function deleteOne(data: DeleteOne) {
  const { id } = data;

  const result = await User.findByIdAndDelete(id).exec();

  AppLog({ type: "Repository", text: "Delete User instance" });
  return !!result;
}
