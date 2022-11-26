import { Router } from "express";

import * as controller from "./../controllers/supplier.controller";
import useMiddleware from "../utils/middleware.util";

const suppliersRouter = Router();
const endpoint = "/suppliers";

const searchAllEndpoint = "/search";
suppliersRouter.get(
	searchAllEndpoint,
	useMiddleware({
		middlewares: { token: true, query: "Supplier" },
		endpoint: endpoint + searchAllEndpoint,
	}),
	controller.searchAll,
);

const searchByIdEndpoint = "/search/:id";
suppliersRouter.get(
	searchByIdEndpoint,
	useMiddleware({
		middlewares: { token: true, param: "Supplier" },
		endpoint: endpoint + searchByIdEndpoint,
	}),
	controller.searchById,
);

const deleteOneEndpoint = "/delete/:id";
suppliersRouter.delete(
	deleteOneEndpoint,
	useMiddleware({
		middlewares: {
			token: true,
			param: "Supplier",
		},
		endpoint: endpoint + deleteOneEndpoint,
	}),
	controller.deleteOne,
);

export default suppliersRouter;
