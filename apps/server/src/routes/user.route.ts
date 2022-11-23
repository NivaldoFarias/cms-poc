import { Router } from "express";

import * as middleware from "./../middlewares/user.middleware";
import * as controller from "./../controllers/user.controller";
import useMiddleware from "../utils/middleware.util";

const usersRouter = Router();
const endpoint = "/users";

const createEndpoint = "/create";
usersRouter.post(
  createEndpoint,
  useMiddleware({
    middlewares: { model: "User" },
    endpoint: endpoint + createEndpoint,
  }),
  controller.create
);

const searchAllEndpoint = "/search";
usersRouter.get(
  searchAllEndpoint,
  useMiddleware({
    middlewares: { token: true, query: "User" },
    endpoint: endpoint + searchAllEndpoint,
  }),
  controller.searchAll
);

const searchByIdEndpoint = "/search/:id";
usersRouter.get(
  searchByIdEndpoint,
  useMiddleware({
    middlewares: { token: true, param: "User" },
    endpoint: endpoint + searchByIdEndpoint,
  }),
  controller.searchById
);

const deleteOneEndpoint = "/delete/:id";
usersRouter.delete(
  deleteOneEndpoint,
  useMiddleware({
    middlewares: {
      token: true,
      param: "User",
    },
    endpoint: endpoint + deleteOneEndpoint,
  }),
  middleware.updateOrDeleteOneValidations,
  controller.deleteOne
);

export default usersRouter;
