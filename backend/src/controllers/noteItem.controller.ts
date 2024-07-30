import { Request, Response } from "express";
import { prisma } from "../libs/client";
import {
  CreateNoteItemInput,
  UpdateNoteItemInput,
} from "../interfaces/note.interface";

export const getNoteItems = async (req: Request, res: Response) => {
  try {
    const noteItems = await prisma.noteItem.findMany();

    return res.status(200).json({
      total: noteItems.length,
      noteItems,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getNoteItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const noteItem = await prisma.noteItem.findUnique({
      where: { id },
    });
    if (!noteItem) {
      res.status(404).json({ error: "Note item not found" });
    }

    return res.status(200).json(noteItem);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createNoteItem = async (req: Request, res: Response) => {
  try {
    const allNoteItems = await prisma.noteItem.findMany({
      select: { ref: true },
      orderBy: {
        ref: "desc",
      },
    });

    const lastNumber = allNoteItems?.[0]?.ref || 0;

    const input: CreateNoteItemInput = req.body;

    const noteItem = await prisma.noteItem.create({
      data: {
        ...input,
        ref: lastNumber + 1,
      },
    });

    return res.status(201).json(noteItem);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateNoteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existingItem = await prisma.noteItem.findUnique({
      where: { id },
    });
    if (!existingItem) {
      return res.status(404).json({ error: "Note item not found" });
    }

    const input: UpdateNoteItemInput = req.body;
    const noteItem = await prisma.noteItem.update({
      where: { id },
      data: input,
    });

    return res.status(201).json(noteItem);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteNoteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await prisma.noteItem.findUnique({
      where: { id },
    });
    if (!item) {
      return res.status(404).json({ error: "Note item not found" });
    }

    await prisma.noteItem.delete({ where: { id } });
    return res.status(204).json(item);
  } catch (error) {
    res.status(500).json(error);
  }
};
