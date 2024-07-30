import { Request, Response } from "express";
import { prisma } from "../libs/client";

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await prisma.note.findMany();
    return res.status(200).json(notes);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await prisma.note.findUnique({
      where: { id },
    });
    if (!note) {
      res.status(404).json({ error: "note not found" });
    }

    return res.status(200).json(note);
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
    const { intro, field, slug } = req.body;
    const updatednote = await prisma.note.update({
      where: { id },
      data: { intro, field, slug },
    });
    res.json(updatednote);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.note.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json(error);
  }
};
