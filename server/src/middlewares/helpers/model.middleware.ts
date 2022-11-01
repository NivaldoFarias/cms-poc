import type { APIModelsKeys } from "../../types/collections";
import type { MongooseError } from "mongoose";

import { User, Cook, Session, Supplier, Provision } from "../../mongo/models";
import HandleValidationError from "../../mongo/errors";
import AppLog from "../../events/AppLog";

export async function validateModel(
  model: APIModelsKeys,
  body: Record<string, unknown>,
) {
  let document = undefined;

  switch (model) {
    case "User":
      document = new User(body);
      break;
    case "Cook":
      document = new Cook(body);
      break;
    case "Supplier":
      document = new Supplier(body);
      break;
    case "Provision":
      document = new Provision(body);
      break;
    case "Session":
      document = new Session(body);
      break;
    default:
      throw new Error("Invalid model");
  }

  try {
    await document.validate();
  } catch (error) {
    HandleValidationError(error as MongooseError);
  }

  return AppLog({ type: "Middleware", text: `Model validated` });
}
