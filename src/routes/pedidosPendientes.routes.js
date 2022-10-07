import { Router } from "express";
import { pedidosProfesorMethods as pedidosPendientesController } from "../controllers/pedidosProfesor.controller";
const router = Router();

router.get("/", pedidosPendientesController.obtenerPedidosPendientes);
router.get("/getPedido/:id", pedidosPendientesController.getPedido);
router.delete("/deletePedido/:id", pedidosPendientesController.deletePedido);
router.patch(
  "/agregarComentario",
  pedidosPendientesController.agregarComentario
);
export default router;
