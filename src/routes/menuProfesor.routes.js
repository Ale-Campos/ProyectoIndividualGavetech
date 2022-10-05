import { Router } from "express";
import { menuProfesorMethods as menuProfesorController } from "../controllers/menuPrincipalProfesor";
const router = Router();

router.get("/", menuProfesorController.menuPrincipal);
router.get("/solicitudesPendientes", menuProfesorController.pedidosPendientes);
router.get("/solicitudesAprobadas", menuProfesorController.pedidosAprobados);

export default router;
