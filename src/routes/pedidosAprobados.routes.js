import { Router } from "express";
import { pedidosAprobadosMethods as pedidosAprobadosController } from "./../controllers/pedidosAprobados.controller.js";
import { authController } from "../controllers/auth.controller.js";
const router = Router();

router.get(
  "/",
  authController.validarProfesor,
  pedidosAprobadosController.getPedidosAprobados
);
router.get(
  "/obtenerDevoluciones/:idpedido",
  pedidosAprobadosController.getDevoluciones
);

export default router;
