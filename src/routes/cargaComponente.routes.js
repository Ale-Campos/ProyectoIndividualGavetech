import { Router } from "express";
import { cargaComponentesMethods as cargaComponentesController } from "../controllers/cargaComponentes.controller.js";
import { authController } from "../controllers/auth.controller.js";
const router = Router();

router.get(
  "/",
  authController.validarProfesor,
  cargaComponentesController.getCargaComponente
);

router.post(
  "/",
  authController.validarProfesor,
  cargaComponentesController.cargarComponente
);
router.get(
  "/obtenerCategorias",
  authController.validarProfesor,
  cargaComponentesController.obtenerCategorias
);
export default router;
