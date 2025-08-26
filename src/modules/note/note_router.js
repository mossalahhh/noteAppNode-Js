import { Router } from "express";
import {
  createNote,
  updateNote,
  allNotes,
  userNotes,
} from "./note_controller.js";

const router = Router();

router.post(`/`, createNote);
router.patch(`/:id`, updateNote);
router.get(`/`, allNotes);
router.get(`/user/:id`, userNotes);

export default router;
