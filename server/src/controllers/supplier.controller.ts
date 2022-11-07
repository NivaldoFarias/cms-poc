import type { QueryParameters, SupplierDocument } from "../types/collections";
import type { Request, Response } from "express";

import * as repository from "../repositories/supplier.repository";
import * as util from "./../utils/queries.util";

import AppLog from "../events/AppLog";

export async function searchAll(_req: Request, res: Response) {
  const queries: QueryParameters = res.locals.query;
  const suppliers = await util.searchAll({ queries, model: "Supplier" });

  AppLog({ type: "Controller", text: "Suppliers searched" });
  return res.status(200).send(suppliers);
}

export async function searchById(_req: Request, res: Response) {
  const supplier: NonNullable<SupplierDocument> = res.locals.result;

  AppLog({ type: "Controller", text: "Sent Supplier" });
  return res.status(200).send(supplier);
}

export async function deleteOne(_req: Request, res: Response) {
  const id = res.locals.param;

  await repository.deleteOne({ id });

  AppLog({ type: "Controller", text: "Supplier deleted" });
  return res.sendStatus(200);
}
