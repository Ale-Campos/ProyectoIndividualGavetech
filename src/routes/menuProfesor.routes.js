import { Router } from "express";
import { menuProfesorMethods as menuProfesorController } from "../controllers/menuPrincipalProfesor";
import { authController } from "../controllers/auth.controller";
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
