import { Router } from "express";
import { gestPedidosMethods as gestPedidosController } from "./../controllers/gestionarStock.controller.js";
import { authController } from "../controllers/auth.controller.js";
const router = Router();

router.get(
  "/",
  authController.validarProfesor,
  gestPedidosController.gestPedidos
);
router.get(
  "/obtenerPedidos",
  authController.validarProfesor,
  gestPedidosController.obtenerStock
);

export default router;
