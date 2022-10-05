import {Router} from "express"
import { cargaComponentesMethods as cargaComponentesController } from "../controllers/cargaComponentes.controller";

const router = Router();

router.get("/", cargaComponentesController.getCargaComponente);
router.post("/", cargaComponentesController.cargarComponente)

export default router;

