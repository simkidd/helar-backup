import { Router } from "express";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/subject.controller";

const router = Router();

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
