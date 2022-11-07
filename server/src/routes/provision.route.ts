import { Router } from "express";

import * as controller from "./../controllers/provision.controller";
import useMiddleware from "../utils/middleware.util";

const provisionsRouter = Router();
const endpoint = "/provisions";

const searchAllEndpoint = "/search";
provisionsRouter.get(
  searchAllEndpoint,
  useMiddleware({
    middlewares: { token: true, query: "Provision" },
    endpoint: endpoint + searchAllEndpoint,
  }),
  controller.searchAll,
);

const searchByIdEndpoint = "/search/:id";
provisionsRouter.get(
  searchByIdEndpoint,
  useMiddleware({
    middlewares: { token: true, param: "Provision" },
    endpoint: endpoint + searchByIdEndpoint,
  }),
  controller.searchById,
);

const deleteOneEndpoint = "/delete/:id";
provisionsRouter.delete(
  deleteOneEndpoint,
  useMiddleware({
    middlewares: {
      token: true,
      param: "Provision",
    },
    endpoint: endpoint + deleteOneEndpoint,
  }),
  controller.deleteOne,
);

export default provisionsRouter;
