import { Router } from "express";
import {
  getNoteItems,
  getNoteItemById,
  createNoteItem,
  updateNoteItem,
  deleteNoteItem,
} from "../controllers/noteItemController";

const router = Router();

router.get("/", getNoteItems);
router.get("/:id", getNoteItemById);
router.post("/", createNoteItem);
router.put("/:id", updateNoteItem);
router.delete("/:id", deleteNoteItem);

export default router;
