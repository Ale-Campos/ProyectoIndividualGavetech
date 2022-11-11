import {Router} from "express";
import { raspiMethod } from "../controllers/raspi.controller.js";


const router = Router();

router.get("/obtenerProductos" ,raspiMethod.getProductos);
router.post("/actualizarStock", raspiMethod.actualizarStock);
router.post("/cargarDevolucion", raspiMethod.actualizarDevolucion);

export default router;