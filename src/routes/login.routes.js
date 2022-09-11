import { Router } from "express";
import { loginMethods as loginController } from "../controllers/login.controller";
const router = Router();

router.get("/", loginController.loginView);
router.post("/verify", loginController.login);
router.get("/pruebaRedirect", loginController.prueba);

export default router;
