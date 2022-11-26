import { Router } from "express";

import * as controller from "./../controllers/cook.controller";
import useMiddleware from "../utils/middleware.util";

const cooksRouter = Router();
const endpoint = "/cooks";

const searchAllEndpoint = "/search";
cooksRouter.get(
	searchAllEndpoint,
	useMiddleware({
		middlewares: { token: true, query: "Cook" },
		endpoint: endpoint + searchAllEndpoint,
	}),
	controller.searchAll,
);

const searchByIdEndpoint = "/search/:id";
cooksRouter.get(
	searchByIdEndpoint,
	useMiddleware({
		middlewares: { token: true, param: "Cook" },
		endpoint: endpoint + searchByIdEndpoint,
	}),
	controller.searchById,
);

const deleteOneEndpoint = "/delete/:id";
cooksRouter.delete(
	deleteOneEndpoint,
	useMiddleware({
		middlewares: {
			token: true,
			param: "Cook",
		},
		endpoint: endpoint + deleteOneEndpoint,
	}),
	controller.deleteOne,
);

export default cooksRouter;
