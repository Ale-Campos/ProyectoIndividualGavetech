import { Router } from "express";
import { menuAlumnoMethods as menuAlumnoController } from "../controllers/menuPrincipalAlumno.controller";

const router = Router();

router.get("/", menuAlumnoController.menuPrincipal);

export default router;
