import { Router } from "express";
import { pedidosProfesorMethods as pedidosPendientesController } from "../controllers/pedidosProfesor.controller.js";
import { authController } from "../controllers/auth.controller.js";
const router = Router();

router.get(
  "/",
  authController.validarProfesor,
  pedidosPendientesController.obtenerPedidosPendientes
);
router.get(
  "/getPedido/:id",
  authController.validarProfesor,
  pedidosPendientesController.getPedido
);
router.delete(
  "/deletePedido/:id",
  authController.validarProfesor,
  pedidosPendientesController.deletePedido
);
router.patch(
  "/agregarComentario",
  authController.validarProfesor,
  pedidosPendientesController.agregarComentario
);
router.get(
  "/obtenerItemPedido/:idpedido",
  authController.validarLogueo,
  pedidosPendientesController.obtenerItemsPedidos
);
export default router;
