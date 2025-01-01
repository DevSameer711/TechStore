import { Router } from 'express';
import { AdminController } from "../controllers/admin.controller.js";


const userRouter = Router();

userRouter.route("/signup").post(AdminController.createAdmin);

userRouter.route("/login").post(AdminController.loginAdmin);

export default userRouter;
