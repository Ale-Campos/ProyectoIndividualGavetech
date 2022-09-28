import { Router } from "express";
import {pedidosAprobadosMethods as pedidosAprobadosController} from "./../controllers/pedidosAprobados.controller";

const router = Router();

router.get("/", pedidosAprobadosController.getPedidosAprobados);

export default router;
