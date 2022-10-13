import { Router } from "express";
import { isPlainObject } from "jquery";
import { methods as productsController } from "./../controllers/products.controller";
import { authController } from "../controllers/auth.controller";
const router = Router();

router.get("/", authController.validarAlumno, productsController.home);
router.get(
  "/list",
  authController.validarAlumno,
  productsController.getProducts
);
router.post("/", authController.validarAlumno, productsController.addProduct);

router.get(
  "/select/:idproducto",
  authController.validarAlumno,
  productsController.getProduct
);
router.delete(
  "/select/:idproducto",
  authController.validarAlumno,
  productsController.deleteProduct
);
router.put(
  "/select/:idproducto",
  authController.validarAlumno,
  productsController.updateProduct
);
router.post("/send", authController.validarAlumno, productsController.sendInfo);
router.post(
  "/qr/sendString",
  authController.validarAlumno,
  productsController.enviarStringQr
);

export default router;
