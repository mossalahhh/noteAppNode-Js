import { Router } from "express";
import {
  signUp,
  logIn,
  deleteUser,
  allUsers,
  updatePassword,
} from "./user_controller.js";
const router = Router();

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.delete("/:email", deleteUser);
router.get("/", allUsers);
router.patch("/:email", updatePassword);
export default router;
