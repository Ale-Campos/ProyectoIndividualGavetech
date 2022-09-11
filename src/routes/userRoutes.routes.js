import { Router } from "express";
import { methods as productsController } from "./../controllers/products.controller";

const router = Router();

router.get("/", productsController.home);
router.get("/list", productsController.getProducts);
router.post("/", productsController.addProduct);

////FLACO ARREGLA LOS REQUESTS DE ESTA MIERDA
router.get("/select/:idproducto", productsController.getProduct);
router.delete("/select/:idproducto", productsController.deleteProduct);
router.put("/select/:idproducto", productsController.updateProduct);
router.post("/send", productsController.sendInfo);
router.post("/qr/sendString", productsController.enviarStringQr);

export default router;
