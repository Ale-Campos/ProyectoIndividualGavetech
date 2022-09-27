import { Router } from "express";
import { pedidosProfesorMethods as pedidosPendientesController } from "../controllers/pedidosProfesor.controller";
const router = Router();

router.get("/", pedidosPendientesController.obtenerPedidosPendientes);

export default router;
