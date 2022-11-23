import type { SessionDocument, UserDocument } from "../types/collections";
import type { Request, Response, NextFunction } from "express";
import type { SignInBody } from "../types/user";

import * as service from "../services/session.service";
import * as queries from "../utils/queries.util";

import AppError from "../config/error";
import AppLog from "../events/AppLog";
import { ExpiredSession, notFoundToken } from "./helpers/errors.middleware";

export async function signInValidations(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password }: SignInBody = res.locals.body;

  const result = (await queries.findByField({
    field: "email",
    value: email,
    model: "User",
  })) as UserDocument;

  validateUser(result);
  validPassword(password, result?.password);

  res.locals.data = result;
  return next();
}

export async function signOutValidations(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const token: string = res.locals.token;

  const result = (await queries.findByField({
    model: "Session",
    field: "token",
    value: token,
  })) as SessionDocument;

  validateSession(result);

  res.locals.data = result;
  return next();
}

// Validations

function validateUser(user: UserDocument) {
  if (!user) {
    throw new AppError({
      statusCode: 404,
      message: "User not found",
      detail: "Ensure to provide an email that corresponds to an existing user",
    });
  }

  return AppLog({ type: "Middleware", text: "User exists" });
}

function validPassword(providedPassword: string, password = "") {
  const isValid = service.decryptPassword(providedPassword, password);

  if (!isValid) {
    throw new AppError({
      statusCode: 403,
      message: "Invalid password",
      detail: "Ensure to provide a valid password",
    });
  }
  return AppLog({ type: "Middleware", text: "Valid password" });
}

function validateSession(session: SessionDocument) {
  if (!session) notFoundToken();
  else if (session.active === false) {
    ExpiredSession();
  }

  return AppLog({ type: "Middleware", text: "Session exists" });
}
