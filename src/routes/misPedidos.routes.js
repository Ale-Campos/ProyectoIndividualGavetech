import { Router } from "express";
import { misPedidosMethdos as misPedidosController } from "../controllers/misPedidos.controller";
import { authController } from "../controllers/auth.controller";
const router = Router();

router.get("/", authController.validarAlumno, misPedidosController.getPedidos);

export default router;
