import { Router } from "express";
import { menuProfesorMethods as menuProfesorController } from "../controllers/menuPrincipalProfesor.js";
import { authController } from "../controllers/auth.controller.js";
const router = Router();

router.get(
  "/",
  authController.validarProfesor,
  menuProfesorController.menuPrincipal
);
router.get(
  "/solicitudesPendientes",
  authController.validarProfesor,
  menuProfesorController.pedidosPendientes
);
router.get(
  "/solicitudesAprobadas",
  authController.validarProfesor,
  menuProfesorController.pedidosAprobados
);

export default router;
