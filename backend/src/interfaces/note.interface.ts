import type { Note } from "@prisma/client";

export interface CreateNoteInput {
  field: string;
  intro: string;
}

export interface UpdateNoteInput extends Partial<CreateNoteInput> {
  id: string;
}

export interface GetNoteTopicDTO {
  id: string;
  title: string;
  slug: string;
  ref: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetSingleNoteTopicDTO {
  id: string;
  title: string;
  slug: string;
  ref: number;
  items: GetNoteItemDTO[];
  subjectId: string;
}
export interface GetSingleNoteTopicSlugDTO {
  id: string;
  title: string;
  slug: string;
  ref: number;
  items: GetNoteItemDTO[];
  note: Note;
}
export interface GetAllNoteTopicDTO {
  id: string;
  title: string;
  slug: string;
  ref: string;
  items: GetNoteItemDTO[];
}

export interface GetNoteTopicsBySubjectSlug {
  id: string;
  name: string;
  slug: string;
  intro: string;
  topics: GetAllNoteTopicDTO[];
}

export interface CreateNoteTopicInput {
  title: string;
  subjectId: string;
}

export interface UpdateNoteTopicInput extends Partial<CreateNoteTopicInput> {
  id: string;
}

export interface GetNoteItemDTO {
  id: string;
  question: string;
  answer: string;
  ref: number;
}

export interface CreateNoteItemInput {
  question: string;
  answer: string;
  noteTopicId: string;
}

export interface UpdateNoteItemInput extends Partial<CreateNoteItemInput> {
  id: string;
}
