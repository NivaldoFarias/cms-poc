import { Router } from "express";

import provisionsRouter from './provision.route';
import supplierRouter from "./supplier.route";
import sessionRouter from "./session.route";
import usersRouter from "./user.route";
import cooksRouter from './cook.route';

const router = Router();

router.use('/provisions', provisionsRouter);
router.use("/suppliers", supplierRouter);
router.use("/auth", sessionRouter);
router.use("/users", usersRouter);
router.use("/cooks", cooksRouter);

export default router;
