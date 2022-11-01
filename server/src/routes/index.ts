import express from "express";

import sessionRouter from "./session.route";
import usersRouter from "./user.route";

const router = express.Router();

router.use("/auth", sessionRouter);
router.use("/users", usersRouter);

export default router;
