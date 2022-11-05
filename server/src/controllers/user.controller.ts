import type { QueryParameters, UserDocument } from "../types/collections";
import type { CreateUser } from "../types/user";
import type { Request, Response } from "express";

import * as repository from "../repositories/user.repository";
import * as service from "../services/user.service";
import * as util from "./../utils/queries.util";

import AppLog from "../events/AppLog";

export async function create(_req: Request, res: Response) {
  const body: CreateUser = res.locals.body;

  body.password = service.hashPassword(body.password);

  await repository.create(body);

  AppLog({
    type: "Controller",
    text: "User created",
  });
  return res.sendStatus(201);
}

export async function searchAll(_req: Request, res: Response) {
  const queries: QueryParameters = res.locals.query;
  const users = await util.searchAll({ queries, model: "User" });

  AppLog({ type: "Controller", text: "Users searched" });
  return res.status(200).send(users);
}

export async function searchById(_req: Request, res: Response) {
  const user: NonNullable<UserDocument> = res.locals.result;

  AppLog({ type: "Controller", text: "Sent User" });
  return res.status(200).send(user);
}

export async function deleteOne(_req: Request, res: Response) {
  const id = res.locals.param;

  await repository.deleteOne({ id });

  AppLog({ type: "Controller", text: "User deleted" });
  return res.sendStatus(200);
}
