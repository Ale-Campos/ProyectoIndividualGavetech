import {Router} from "express";
import { raspiMethod } from "../controllers/raspi.controller.js";
import cors from "cors";

const router = Router();

router.get("/obtenerProductos", cors() ,raspiMethod.getProductos);
router.post("/actualizarStock", raspiMethod.actualizarStock);
router.post("/cargarDevolucion", raspiMethod.actualizarDevolucion);

export default router;