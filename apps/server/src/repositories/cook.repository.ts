import type { CreateCook, DeleteOne } from "../types/collections";

import { Cook } from "../mongo/models";
import AppLog from "../events/AppLog";

export async function create(data: CreateCook) {
  const { user, cir } = data;

  await new Cook({
    user,
    cir,
  }).save({
    validateBeforeSave: false,
  });

  return AppLog({ type: "Repository", text: "Cook instance inserted" });
}

export async function deleteOne(data: DeleteOne) {
  const { id } = data;

  const result = await Cook.findByIdAndDelete(id).exec();

  AppLog({ type: "Repository", text: "Delete Cook instance" });
  return !!result;
}
