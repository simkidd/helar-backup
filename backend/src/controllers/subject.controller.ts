import { Request, Response } from "express";
import { prisma } from "../libs/client";
import { UpdateNoteInput } from "../interfaces/note.interface";

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await prisma.note.findMany({
      include: { topics: true },
    });
    return res.status(200).json({
      message: "Notes fetched successfully",
      total: notes.length,
      notes: notes,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await prisma.note.findUnique({
      where: { id },
      include: { topics: true },
    });
    if (!note) {
      res.status(404).json({ error: "note not found" });
    }

    return res.status(200).json({
      message: "Single note fetched successfully",
      note: note,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { intro, field, slug } = req.body;
    const newnote = await prisma.note.create({
      data: { intro, field, slug },
    });
    res.status(201).json(newnote);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existingNote = await prisma.note.findUnique({
      where: { id },
    });
    if (!existingNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    const input: UpdateNoteInput = req.body;
    const updatednote = await prisma.note.update({
      where: { id },
      data: input,
    });

    return res.status(201).json(updatednote);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await prisma.note.findUnique({
      where: { id },
    });
    if (!item) {
      return res.status(404).json({ error: "Note not found" });
    }
    
    await prisma.note.delete({ where: { id } });
    return res.status(204).json(item);
  } catch (error) {
    res.status(500).json(error);
  }
};
