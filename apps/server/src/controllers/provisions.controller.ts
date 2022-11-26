import type { QueryParameters, ProvisionDocument } from "../types/collections";
import type { Request, Response } from "express";

import * as repository from "../repositories/provisions.repository";
import * as util from "./../utils/queries.util";

import AppLog from "../events/AppLog";

export async function searchAll(_req: Request, res: Response) {
	const queries: QueryParameters = res.locals.query;
	const provisions = await util.searchAll({ queries, model: "Provisions" });

	AppLog({ type: "Controller", text: "Provisions searched" });
	return res.status(200).send(provisions);
}

export async function searchById(_req: Request, res: Response) {
	const provisions: NonNullable<ProvisionDocument> = res.locals.result;

	AppLog({ type: "Controller", text: "Sent Provisions" });
	return res.status(200).send(provisions);
}

export async function deleteOne(_req: Request, res: Response) {
	const id = res.locals.param;

	await repository.deleteOne({ id });

	AppLog({ type: "Controller", text: "Provisions deleted" });
	return res.sendStatus(200);
}
