import { Router } from "express";
import { methods as productsController } from "./../controllers/products.controller";
const router = Router();

router.get("/", productsController.home);
router.get("/list", productsController.getProducts);
router.post("/", productsController.addProduct);
router.get("/:idproducto", productsController.getProduct);
router.delete("/:idproducto", productsController.deleteProduct);
router.put("/:idproducto", productsController.updateProduct);
router.post("/send", productsController.sendInfo);
router.post("/qr/sendString", productsController.enviarStringQr);
export default router;
