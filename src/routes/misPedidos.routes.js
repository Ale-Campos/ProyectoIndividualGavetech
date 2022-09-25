import { Router } from "express";
import { misPedidosMethdos as misPedidosController } from "../controllers/misPedidos.controller";

const router = Router();

router.get("/", misPedidosController.getPedidos);

export default router;
