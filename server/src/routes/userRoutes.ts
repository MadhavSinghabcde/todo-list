import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userControllers";
import { registerValidationRules, loginValidationRules } from "../lib/validation";

const router = Router();

router.post('/login', loginValidationRules, loginUser);
router.post('/register', registerValidationRules, registerUser);

export { router as userRoutes };
