import { Router } from "express";
import {
  getNoteTopics,
  getNoteTopicById,
  createNoteTopic,
  updateNoteTopic,
  deleteNoteTopic,
} from "../controllers/noteTopicController";

const router = Router();

router.get("/", getNoteTopics);
router.get("/:id", getNoteTopicById);
router.post("/", createNoteTopic);
router.put("/:id", updateNoteTopic);
router.delete("/:id", deleteNoteTopic);

export default router;
