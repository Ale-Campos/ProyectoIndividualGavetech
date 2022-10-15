import { Router } from "express";
import { methodsAlumnos as alumnosController } from "../controllers/register.controller";
const router = Router();

router.get("/", alumnosController.registerView);
router.post("/", alumnosController.register);
router.get("/obtenerCursos", alumnosController.obtenerCursos);

export default router;
