import { Router } from "express";
import { loginMethods as loginController } from "../controllers/login.controller.js";
const router = Router();

router.get("/", loginController.loginView);
router.post("/", loginController.login);
router.get("/prueba", loginController.prueba);
router.get("/prueba/deslog", loginController.pruebaDeslog);

export default router;
