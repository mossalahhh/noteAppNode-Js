import { Router } from "express";
import {
  createNote,
  updateNote,
  allNotes,
  userNotes,
  deleteNote,
} from "./note_controller.js";
import { isAuthentication } from "../../middleware/authentication.js";
import { catchError } from "../../utils/catchError.js";
const router = Router();

router.post(`/`, isAuthentication, catchError(createNote));
router.patch(`/:id`, isAuthentication, catchError(updateNote));
router.get(`/`, catchError(allNotes));
router.get(`/user/:id`, catchError(userNotes));
router.delete(`/:id`, isAuthentication, catchError(deleteNote));

export default router;
