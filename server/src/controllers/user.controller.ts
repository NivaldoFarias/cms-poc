import type {
  CookType,
  ProvisionType,
  QueryParameters,
  SupplierType,
  UserDocument,
} from "../types/collections";
import type { CreateUser } from "../types/user";
import type { Request, Response } from "express";

import * as repository from "../repositories/user.repository";
import * as service from "../services/user.service";
import * as util from "./../utils/queries.util";

import * as provisions from "./../repositories/provision.repository";
import * as supplier from "./../repositories/supplier.repository";
import * as cook from "./../repositories/cook.repository";

import AppLog from "../events/AppLog";

type CreateSupplier = Pick<SupplierType, "name" | "cnpj">;
type CreateProvisions = Pick<ProvisionType, "type">;
type CreateCook = Pick<CookType, "cir">;

type RequestBody = CreateUser & {
  groups: {
    supplier: CreateSupplier;
    provisions: CreateProvisions;
    cook: CreateCook;
  };
};

export async function create(_req: Request, res: Response) {
  const body: RequestBody = res.locals.body;

  body.password = service.hashPassword(body.password);

  const { _id: user } = await repository.create({
    email: body.email,
    password: body.password,
    name: body.name,
  });

  const [provisionsData, supplierData, cookData] = [
    body.groups?.provisions,
    body.groups?.supplier,
    body.groups?.cook,
  ];

  await Promise.all([
    provisionsData
      ? provisions.create({ user, ...provisionsData })
      : __resolve(),
    supplierData ? supplier.create({ user, ...supplierData }) : __resolve(),
    cookData ? cook.create({ user, ...cookData }) : __resolve(),
  ]);

  AppLog({
    type: "Controller",
    text: "User created",
  });
  return res.sendStatus(201);

  function __resolve(): Promise<unknown> {
    return new Promise((resolve) => resolve(null));
  }
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
