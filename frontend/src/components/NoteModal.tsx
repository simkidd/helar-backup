import React, { useState } from "react";
import { GetNoteDTO, UpdateNoteInput } from "../interfaces/note.interface";
import { axiosInstance } from "../lib/axios";

interface NoteModalProps {
  onClose: () => void;
  item: GetNoteDTO | undefined;
}

const NoteModal: React.FC<NoteModalProps> = ({ item, onClose }) => {
  const [input, setInput] = useState<UpdateNoteInput>({
    id: item?.id || "",
    field: item?.field,
    intro: item?.intro,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.put(`/subjects/update/${item?.id}`);
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg lg:w-2/4 w-full">
        <h2 className="text-xl font-bold mb-4">Edit Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              value={input.field}
              onChange={(e) => setInput({ ...input, field: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Introduction
            </label>
            <textarea
              value={input.intro}
              onChange={(e) => setInput({ ...input, intro: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none"
              required
              readOnly
              rows={10}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
