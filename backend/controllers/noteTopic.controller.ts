import { Request, Response } from "express";
import { prisma } from "../libs/client";
import {
  CreateNoteTopicInput,
  GetAllNoteTopicDTO,
  UpdateNoteTopicInput,
} from "../interfaces/note.interface";
import { slugify } from "../utils/helpers";

export const getNoteTopics = async (req: Request, res: Response) => {
  try {
    const topics = await prisma.noteTopic.findMany();

    return res.status(200).json({
      total: topics.length,
      topics,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getNoteTopicById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const noteTopic = await prisma.noteTopic.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!noteTopic) {
      res.status(404).json({ error: "Note topic not found" });
    }

    return res.status(200).json(noteTopic);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createNoteTopic = async (req: Request, res: Response) => {
  try {
    const input: CreateNoteTopicInput = req.body;

    const title = input.title.trim().toLowerCase().replace(/\s+$/, "");
    const existingTopic = await prisma.noteTopic.findFirst({
      where: { title },
    });

    if (existingTopic) {
      return res.status(403).json("Note topic already exists");
    }

    const allTopics = await prisma.noteTopic.findMany({
      select: { ref: true },
      orderBy: {
        ref: "desc",
      },
    });

    const slug = slugify(title);

    const newNoteTopic = await prisma.noteTopic.create({
      data: {
        ...input,
        slug,
      },
    });
    res.status(201).json(newNoteTopic);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateNoteTopic = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existingTopic = await prisma.noteTopic.findUnique({
      where: { id },
    });
    if (!existingTopic) {
      res.status(404).json({ error: "Note topic not found" });
    }

    const input: UpdateNoteTopicInput = req.body;
    const title = input?.title?.trim().toLowerCase().replace(/\s+$/, "");

    const slug = slugify(title as string);

    const noteTopic = await prisma.noteTopic.update({
      where: { id },
      data: { ...input, slug },
    });

    return res.status(201).json(noteTopic);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteNoteTopic = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const topic = await prisma.noteTopic.findUnique({
      where: { id },
    });
    if (!topic) {
      return res.status(404).json({ error: "Note topic not found" });
    }

    await prisma.noteTopic.delete({ where: { id } });
    return res.status(200).json(topic);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getNoteTopicsBySubjectSlug = async (
  req: Request,
  res: Response
) => {
  try {
    const { slug } = req.params;
    const subject = await prisma.subject.findUnique({
      where: { slug },
    });
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    const allNoteTopics = await prisma.noteTopic.findMany({
      where: { note: subject.id },
      select: { id: true, slug: true, note: true, title: true, ref: true },
      orderBy: {
        createdAt: "asc",
      },
    });

    const noteTopics: GetAllNoteTopicDTO[] = [];

    for (const noteTopic of allNoteTopics) {
      const noteItems = await prisma.noteItem.findMany({
        where: { topic: noteTopic.id },
        orderBy: {
          createdAt: "asc",
        },
      });

      noteTopics.push({
        id: noteTopic.id,
        title: noteTopic.title,
        slug: noteTopic.slug,
        ref: noteTopic.ref || "",
        items: noteItems,
      });
    }

    return res.status(200).json({
      id: subject.id,
      name: subject.name,
      intro: subject.intro,
      slug: subject.slug,
      noteTopics,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
