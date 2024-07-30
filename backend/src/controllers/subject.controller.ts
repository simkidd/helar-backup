import { Request, Response } from "express";
import { prisma } from "../libs/client";

export const getSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await prisma.subject.findMany();
    return res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};

export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subject = await prisma.subject.findUnique({
      where: { id },
    });
    if (!subject) {
      res.status(404).json({ error: "Subject not found" });
    }

    return res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subject" });
  }
};

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { intro, name, slug } = req.body;
    const newSubject = await prisma.subject.create({
      data: { intro, name, slug },
    });
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ error: "Failed to create subject" });
  }
};

export const updateSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { intro, name, slug } = req.body;
    const updatedSubject = await prisma.subject.update({
      where: { id },
      data: { intro, name, slug },
    });
    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: "Failed to update subject" });
  }
};

export const deleteSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.subject.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subject" });
  }
};
