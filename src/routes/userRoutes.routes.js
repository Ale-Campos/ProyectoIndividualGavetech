import { Router } from "express";
import { methods as productsController } from "./../controllers/products.controller";
import {methodsAlumnos as alumnosController} from "./../controllers/alumnos.controller";
const router = Router();

 router.get("/", productsController.home);
 router.get("/list", productsController.getProducts);
 router.post("/", productsController.addProduct);

 ////FLACO ARREGLA LOS REQUESTS DE ESTA MIERDA
// router.get("/:idproducto", productsController.getProduct);
// router.delete("/:idproducto", productsController.deleteProduct);
// router.put("/:idproducto", productsController.updateProduct);
router.post("/send", productsController.sendInfo);
router.post("/qr/sendString", productsController.enviarStringQr);
router.post("/registrar/send",alumnosController.register);
router.get("/login", alumnosController.registerView);
export default router;
