import AppError from "../../config/error";
import { APIModelsKeys } from "../../types/collections";

export function Forbidden() {
  throw new AppError({
    statusCode: 403,
    message: "Forbidden",
    detail: "The provided API key does not match the company",
  });
}

export function ForbiddenToken() {
  throw new AppError({
    statusCode: 403,
    message: "Forbidden",
    detail: "User does not have permission to modify this resource",
  });
}

export function invalidIdSyntax() {
  throw new AppError({
    statusCode: 400,
    message: "Invalid Syntax",
    detail: "Ensure to provide the a valid ObjectId",
  });
}

export function notFound(model: APIModelsKeys) {
  throw new AppError({
    statusCode: 404,
    message: `${model} Not Found`,
    detail: `The provided ObjectId does not match any existing ${model}`,
  });
}

export function cookNotFound() {
  return notFound("Cook");
}

export function userNotFound() {
  return notFound("User");
}

export function supplierNotFound() {
  return notFound("Supplier");
}

export function provisionNotFound() {
  return notFound("Provision");
}
