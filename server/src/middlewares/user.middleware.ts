import type { UserDocument } from "../types/collections";
import type { Request, Response, NextFunction } from "express";
import type { UpdateOne } from "../types/user";

import * as error from "./helpers/errors.middleware";


export async function updateOrDeleteOneValidations(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const fieldsToUpdate: UpdateOne = {
    full_name: req.body.full_name,
    username: req.body.username,
    company: req.body.company,
  };
  const user_id = res.locals.user_id;
  const user = res.locals.result;

  providedTokenMatchesUser(user_id, user);

  res.locals.body = fieldsToUpdate;

  return next();
}

function providedTokenMatchesUser(
  user_id: string,
  user: NonNullable<UserDocument>,
) {
  if (user_id !== user._id.toString()) error.ForbiddenToken();
}

