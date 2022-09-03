import { Router } from "express";
import { methods as pruebasController } from "./../controllers/prubas.controller";
const router = Router();

router.get("/", pruebasController.prueba);
router.get("/index", pruebasController.prueba);
export default router;
