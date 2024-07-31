import { Router } from "express";
import {
  getNoteTopics,
  getNoteTopicById,
  createNoteTopic,
  updateNoteTopic,
  deleteNoteTopic,
  getNoteTopicsBySubjectSlug,
} from "../controllers/noteTopic.controller";

const router = Router();

router.get("/", getNoteTopics);
router.get("/:id", getNoteTopicById);
router.get("/subject-slug/:slug", getNoteTopicsBySubjectSlug);
router.post("/create", createNoteTopic);
router.put("/update/:id", updateNoteTopic);
router.delete("/delete/:id", deleteNoteTopic);

export default router;
