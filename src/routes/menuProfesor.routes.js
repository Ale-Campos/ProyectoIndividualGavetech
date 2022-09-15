import { Router } from "express";
import { menuProfesorMethods as menuProfesorController } from "../controllers/menuPrincipalProfesor";
const router = Router();

router.get("/",menuProfesorController.menuPrincipal)

export default router;