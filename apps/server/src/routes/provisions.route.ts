import { Router } from "express";

import * as controller from "../controllers/provisions.controller";
import useMiddleware from "../utils/middleware.util";

const provisionsRouter = Router();
const endpoint = "/provisions";

const searchAllEndpoint = "/search";
provisionsRouter.get(
  searchAllEndpoint,
  useMiddleware({
    middlewares: { token: true, query: "Provisions" },
    endpoint: endpoint + searchAllEndpoint,
  }),
  controller.searchAll
);

const searchByIdEndpoint = "/search/:id";
provisionsRouter.get(
  searchByIdEndpoint,
  useMiddleware({
    middlewares: { token: true, param: "Provisions" },
    endpoint: endpoint + searchByIdEndpoint,
  }),
  controller.searchById
);

const deleteOneEndpoint = "/delete/:id";
provisionsRouter.delete(
  deleteOneEndpoint,
  useMiddleware({
    middlewares: {
      token: true,
      param: "Provisions",
    },
    endpoint: endpoint + deleteOneEndpoint,
  }),
  controller.deleteOne
);

export default provisionsRouter;
