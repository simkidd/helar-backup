import { Request, Response } from "express";
import { prisma } from "../libs/client";

export const getNoteTopics = async (req: Request, res: Response) => {
  try {
    const noteTopics = await prisma.noteTopic.findMany();
    res.json(noteTopics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch note topics" });
  }
};

export const getNoteTopicById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const noteTopic = await prisma.noteTopic.findUnique({
      where: { id },
    });
    if (noteTopic) {
      res.json(noteTopic);
    } else {
      res.status(404).json({ error: "Note topic not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch note topic" });
  }
};

export const createNoteTopic = async (req: Request, res: Response) => {
  try {
    const { slug, title, ref, subjectId } = req.body;
    const newNoteTopic = await prisma.noteTopic.create({
      data: { slug, title, ref, subjectId },
    });
    res.status(201).json(newNoteTopic);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note topic" });
  }
};

export const updateNoteTopic = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { slug, title, ref, subjectId } = req.body;
    const updatedNoteTopic = await prisma.noteTopic.update({
      where: { id },
      data: { slug, title, ref, subjectId },
    });
    res.json(updatedNoteTopic);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note topic" });
  }
};

export const deleteNoteTopic = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.noteTopic.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note topic" });
  }
};
