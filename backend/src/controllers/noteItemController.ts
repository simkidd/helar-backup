import { Request, Response } from "express";
import { prisma } from "../libs/client";

export const getNoteItems = async (req: Request, res: Response) => {
  try {
    const noteItems = await prisma.noteItem.findMany();
    res.json(noteItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch note items" });
  }
};

export const getNoteItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const noteItem = await prisma.noteItem.findUnique({
      where: { id },
    });
    if (noteItem) {
      res.json(noteItem);
    } else {
      res.status(404).json({ error: "Note item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch note item" });
  }
};

export const createNoteItem = async (req: Request, res: Response) => {
  try {
    const { slug, ref, noteTopicId } = req.body;
    const newNoteItem = await prisma.noteItem.create({
      data: { slug, ref, noteTopicId },
    });
    res.status(201).json(newNoteItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note item" });
  }
};

export const updateNoteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { slug, ref, noteTopicId } = req.body;
    const updatedNoteItem = await prisma.noteItem.update({
      where: { id },
      data: { slug, ref, noteTopicId },
    });
    res.json(updatedNoteItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note item" });
  }
};

export const deleteNoteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.noteItem.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note item" });
  }
};
