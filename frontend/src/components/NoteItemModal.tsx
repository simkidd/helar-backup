import React, { useState } from "react";
import { GetNoteItemDTO } from "../interfaces/note.interface";
import { axiosInstance } from "../lib/axios";

interface NoteItemModalProps {
  onClose: () => void;
  item: GetNoteItemDTO | null;
}

const NoteItemModal: React.FC<NoteItemModalProps> = ({ onClose, item }) => {
  const [input, setInput] = useState({
    question: item?.question,
    answer: item?.answer,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.put(`/note-items/update/${item?.id}`);
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
        <h2 className="text-xl font-bold mb-4">Edit Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Question</label>
            <input
              type="text"
              value={input.question}
              onChange={(e) => setInput({ ...input, question: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Answer</label>
            <textarea
              value={input.answer}
              onChange={(e) => setInput({ ...input, answer: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
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

export default NoteItemModal;
