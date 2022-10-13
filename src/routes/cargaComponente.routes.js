import { Router } from "express";
import { cargaComponentesMethods as cargaComponentesController } from "../controllers/cargaComponentes.controller";
import { authController } from "../controllers/auth.controller";
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
