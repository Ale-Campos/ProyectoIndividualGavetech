import { Router } from "express";
import { pedidosMethods as pedidosController } from "../controllers/generarPedido.controller.js";
import { authController } from "../controllers/auth.controller.js";
const router = Router();
router.get("/", authController.validarAlumno, pedidosController.generarPedido);
router.get(
  "/list",
  authController.validarAlumno,
  pedidosController.getProducts
);
router.get(
  "/select/:idproducto",
  authController.validarAlumno,
  pedidosController.getProduct
);
router.post(
  "/qr/sendString",
  authController.validarAlumno,
  pedidosController.enviarStringQr
);
export default router;
