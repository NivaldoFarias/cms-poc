import type {
  CookDocument,
  FindByField,
  FindById,
  ProvisionDocument,
  SearchAll,
  SessionDocument,
  SupplierDocument,
  UserDocument,
} from "../types/collections";
import type { SortOrder } from "mongoose";

import { User, Cook, Session, Supplier, Provision } from "./../mongo/models";
import AppError from "../config/error";
import AppLog from "../events/AppLog";

export async function findByField({ field, value, model }: FindByField) {
  const searchKey = field === "name" ? new RegExp(value, "i") : value;

  AppLog({ type: "Repository", text: `Search ${model} by ${field}` });
  switch (model) {
    case "User":
      return (await User.findOne({
        [field]: searchKey,
      }).exec()) as UserDocument;
    case "Cook":
      return (await Cook.findOne({
        [field]: searchKey,
      }).exec()) as CookDocument;
    case "Session":
      return (await Session.findOne({
        [field]: searchKey,
      }).exec()) as SessionDocument;
    case "Supplier":
      return (await Supplier.findOne({
        [field]: searchKey,
      }).exec()) as SupplierDocument;
    case "Provisions":
      return (await Provision.findOne({
        [field]: searchKey,
      }).exec()) as ProvisionDocument;
    default:
      throw new AppError({
        statusCode: 500,
        message: "Internal Server Error",
        detail: "An unexpected error occurred while searching for the model",
      });
  }
}

export async function findById({ id, model }: FindById) {
  AppLog({ type: "Repository", text: `Search ${model} by ObjectId` });

  switch (model) {
    case "User":
      return (await User.findById(id).exec()) as UserDocument;
    case "Cook":
      return (await Cook.findById(id).exec()) as CookDocument;
    case "Session":
      return (await Session.findById(id).exec()) as SessionDocument;
    case "Supplier":
      return (await Supplier.findById(id).exec()) as SupplierDocument;
    case "Provisions":
      return (await Provision.findById(id).exec()) as ProvisionDocument;
    default:
      throw new AppError({
        statusCode: 500,
        message: "Internal Server Error",
        detail: "An unexpected error occurred while searching for the model",
      });
  }
}

export async function searchAll({ queries, model }: SearchAll) {
  const { limit, sort_by, sort } = queries;

  const parsed = {
    limit: Number(limit) || 10,
    sort_by: sort_by ?? "created_at",
    sort: (sort?.toString() ?? "desc") as SortOrder,
  };

  AppLog({
    type: "Repository",
    text: `Search all ${model}${model.includes("s") ? "" : "s"}`,
  });
  switch (model) {
    case "User":
      return (await User.find()
        .limit(parsed.limit)
        .sort({ [parsed.sort_by]: parsed.sort })
        .exec()) as UserDocument[];
    case "Cook":
      return (await Cook.find()
        .limit(parsed.limit)
        .sort({ [parsed.sort_by]: parsed.sort })
        .exec()) as CookDocument[];
    case "Session":
      return (await Session.find()
        .limit(parsed.limit)
        .sort({ [parsed.sort_by]: parsed.sort })
        .exec()) as SessionDocument[];
    case "Supplier":
      return (await Supplier.find()
        .limit(parsed.limit)
        .sort({ [parsed.sort_by]: parsed.sort })
        .exec()) as SupplierDocument[];
    case "Provisions":
      return (await Provision.find()
        .limit(parsed.limit)
        .sort({ [parsed.sort_by]: parsed.sort })
        .exec()) as unknown as ProvisionDocument[];
    default:
      throw new AppError({
        statusCode: 500,
        message: "Internal Server Error",
        detail: "An unexpected error occurred while searching for the model",
      });
  }
}

export async function deleteOne({ id, model }: FindById) {
  AppLog({ type: "Repository", text: `Delete ${model} by ObjectId` });

  switch (model) {
    case "User":
      return await User.findByIdAndDelete(id).exec();
    case "Cook":
      return await Cook.findByIdAndDelete(id).exec();
    case "Session":
      return await Session.findByIdAndDelete(id).exec();
    case "Supplier":
      return await Supplier.findByIdAndDelete(id).exec();
    case "Provisions":
      return await Provision.findByIdAndDelete(id).exec();
    default:
      throw new AppError({
        statusCode: 500,
        message: "Internal Server Error",
        detail: "An unexpected error occurred while searching for the model",
      });
  }
}
