import { Router } from "express";
import { pedidosAprobadosMethods as pedidosAprobadosController } from "./../controllers/pedidosAprobados.controller";
import { authController } from "../controllers/auth.controller";
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
