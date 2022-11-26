import type { SessionDocument } from "../../types/collections";

import * as queries from "./../../utils/queries.util";
import { env } from "../../utils/constants.util";
import jwt, { JwtPayload } from "jsonwebtoken";

import AppError from "../../config/error";
import AppLog from "../../events/AppLog";
import { ExpiredSession, notFoundToken } from "./errors.middleware";

export async function requireToken(token: string) {
	let id: string | undefined = undefined;

	try {
		const payload: JwtPayload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
		const { sub } = payload;

		id = payload[sub ?? env.JWT_SUBJECT];
	} catch (error) {
		throw new AppError({
			statusCode: 403,
			message: `Forbidden`,
			detail: "The token provided is invalid",
		});
	}

	const result = (await queries.findByField({
		model: "Session",
		field: "token",
		value: token,
	})) as SessionDocument;

	if (!result) notFoundToken();
	else if (result.active === false) {
		ExpiredSession();
	}

	AppLog({ type: "Middleware", text: "Valid token" });
	return id;
}
