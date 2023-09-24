import { router as grp3Router } from "./grp3/router.js";
import { router as grp2Router } from "./grp2/router.js";
import { router as grpRouter } from "./grp/router.js";
import { Router } from "express";

export const router = Router();

router.use("/grp", grpRouter);
router.use("/grp2", grp2Router);
router.use("/grp3", grp3Router);
