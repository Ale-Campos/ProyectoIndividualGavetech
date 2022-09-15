import { Router } from "express";
import { pedidosMethods as pedidosController } from "../controllers/generarPedido.controller";

const router = Router();
router.get("/", pedidosController.generarPedido)
router.get("/list", pedidosController.getProducts);
router.get("/select/:idproducto",pedidosController.getProduct)
router.post("/qr/sendString", pedidosController.enviarStringQr);
export default router;