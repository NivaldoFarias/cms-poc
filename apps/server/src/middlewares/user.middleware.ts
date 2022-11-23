import type { UserDocument } from "../types/collections";
import type { Request, Response, NextFunction } from "express";

import * as error from "./helpers/errors.middleware";

export async function updateOrDeleteOneValidations(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const user_id = res.locals.user_id;
  const user = res.locals.result;

  providedTokenMatchesUser(user_id, user);

  return next();
}

function providedTokenMatchesUser(
  user_id: string,
  user: NonNullable<UserDocument>
) {
  if (user_id !== user._id.toString()) error.ForbiddenToken();
}
