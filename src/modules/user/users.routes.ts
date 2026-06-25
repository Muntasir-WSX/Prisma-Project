import { Router } from "express";
import { createUser } from "./users.controllers";



const router = Router();

router.post("/register", createUser.registerUser);


export const userRoutes = router;
