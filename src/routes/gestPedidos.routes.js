import { Router } from "express";
import {gestPedidosMethods as gestPedidosController} from "./../controllers/gestionarStock.controller";

const router = Router();

router.get("/",gestPedidosController.gestPedidos);
router.get("/obtenerPedidos", gestPedidosController.obtenerStock);

export default router;


