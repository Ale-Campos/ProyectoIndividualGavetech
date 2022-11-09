import { Router } from "express";
import { misPedidosMethdos as misPedidosController } from "../controllers/misPedidos.controller.js";
import { authController } from "../controllers/auth.controller.js";
const router = Router();

router.get("/", authController.validarAlumno, misPedidosController.getPedidos);

export default router;
