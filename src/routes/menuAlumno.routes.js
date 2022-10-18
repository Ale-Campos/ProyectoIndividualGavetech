import { Router } from "express";
import { menuAlumnoMethods as menuAlumnoController } from "../controllers/menuPrincipalAlumno.controller";
import { authController } from "../controllers/auth.controller";
const router = Router();

router.get(
  "/",
  authController.validarAlumno,
  menuAlumnoController.menuPrincipal
);
router.get(
  "/misPedidos",
  authController.validarAlumno,
  menuAlumnoController.misPedidos
);

export default router;
