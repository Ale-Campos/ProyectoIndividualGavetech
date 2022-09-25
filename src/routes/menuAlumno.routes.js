import { Router } from "express";
import { menuAlumnoMethods as menuAlumnoController } from "../controllers/menuPrincipalAlumno.controller";

const router = Router();

router.get("/", menuAlumnoController.menuPrincipal);
router.get("/misPedidos", menuAlumnoController.misPedidos);
export default router;
