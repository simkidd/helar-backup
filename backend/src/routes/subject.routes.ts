import { Router } from "express";
import {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.controller";

const router = Router();

router.get("/", getSubjects);
router.get("/:id", getSubjectById);
router.post("/", createSubject);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

export default router;
