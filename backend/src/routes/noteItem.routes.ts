import { Router } from "express";
import {
  getNoteItems,
  getNoteItemById,
  createNoteItem,
  updateNoteItem,
  deleteNoteItem,
} from "../controllers/noteItem.controller";

const router = Router();

router.get("/", getNoteItems);
router.get("/:id", getNoteItemById);
router.post("/create", createNoteItem);
router.put("/update/:id", updateNoteItem);
router.delete("/delete/:id", deleteNoteItem);

export default router;
