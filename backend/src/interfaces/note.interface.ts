import type { NoteItem, Subject } from "@prisma/client";

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
  note: Subject;
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
  noteTopics: GetAllNoteTopicDTO[];
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