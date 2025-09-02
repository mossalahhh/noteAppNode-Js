import { Router } from "express";
import {
  signUp,
  logIn,
  deleteUser,
  allUsers,
  updatePassword,
  profile,
} from "./user_controller.js";
import { isAuthentication } from "../../middleware/authentication.js";
import { catchError } from "../../utils/catchError.js";
const router = Router();

router.post("/signUp", catchError(signUp));
router.post("/logIn", catchError(logIn));
router.delete("/", isAuthentication, catchError(deleteUser));
router.get("/", catchError(allUsers));
router.patch("/:email", catchError(updatePassword));
router.get("/:profile", isAuthentication, catchError(profile));
export default router;
