import { Router } from "express";
import { methodsAlumnos as alumnosController } from "../controllers/register.controller";
const router = Router();

router.get("/", alumnosController.registerView);
router.post("/", alumnosController.register);

export default router;
