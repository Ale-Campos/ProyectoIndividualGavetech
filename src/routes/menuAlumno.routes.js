import { Router } from "express";
import { menuAlumnoMethods as menuAlumnoController } from "../controllers/menuPrincipalAlumno.controller.js";
import { authController } from "../controllers/auth.controller.js";
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
