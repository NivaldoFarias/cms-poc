import type { QueryParameters, CookDocument } from "../types/collections";
import type { CreateCook } from "../types/collections";
import type { Request, Response } from "express";

import * as repository from "../repositories/cook.repository";
import * as util from "./../utils/queries.util";
import { Types } from "mongoose";

import AppLog from "../events/AppLog";

export async function create(_req: Request, res: Response) {
  const user_id: string = res.locals.user_id;
  const body: { cir: string } = res.locals.body;

  const data: CreateCook = {
    user: new Types.ObjectId(user_id),
    cir: body.cir,
  };

  await repository.create(data);

  AppLog({
    type: "Controller",
    text: "Cook created",
  });
  return res.sendStatus(201);
}

export async function searchAll(_req: Request, res: Response) {
  const queries: QueryParameters = res.locals.query;
  const cooks = await util.searchAll({ queries, model: "Cook" });

  AppLog({ type: "Controller", text: "Cooks searched" });
  return res.status(200).send(cooks);
}

export async function searchById(_req: Request, res: Response) {
  const cook: NonNullable<CookDocument> = res.locals.result;

  AppLog({ type: "Controller", text: "Sent Cook" });
  return res.status(200).send(cook);
}

export async function deleteOne(_req: Request, res: Response) {
  const id = res.locals.param;

  await repository.deleteOne({ id });

  AppLog({ type: "Controller", text: "Cook deleted" });
  return res.sendStatus(200);
}
