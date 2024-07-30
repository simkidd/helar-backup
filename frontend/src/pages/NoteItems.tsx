import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetNoteItemDTO,
  GetSingleNoteTopicDTO,
} from "../interfaces/note.interface";
import { axiosInstance } from "../lib/axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import NoteItemModal from "../components/NoteItemModal";

const NoteItems = () => {
  const { id } = useParams();
  const [noteTopic, setNoteTopic] = useState<GetSingleNoteTopicDTO>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GetNoteItemDTO | null>(null);

  useEffect(() => {
    const fetchNoteTopic = async () => {
      try {
        if (id) {
          setLoading(true);
          const { data } = await axiosInstance.get(`/note-topics/${id}`);
          setNoteTopic(data.topic);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoteTopic();
  }, [id]);

  const handleToggle = (itemId: string) => {
    setExpandedItemId((prevItemId) => (prevItemId === itemId ? null : itemId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-2 py-6">
      <div className="py-6">
        <button
          className="bg-purple-600 px-4 py-2 rounded-lg text-white"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4 capitalize">{noteTopic?.title}</h1>

      <ul>
        {noteTopic?.items.map((item) => (
          <li key={item.id} className="mb-4">
            <div className="flex justify-between items-center">
              <button
                className="w-full text-left py-2 px-4 bg-gray-200 rounded-lg focus:outline-none focus:bg-gray-300"
                onClick={() => handleToggle(item.id)}
              >
                <h2 className="capitalize font-medium">{item.question}</h2>
              </button>
              <button
                className="ml-4 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                onClick={() => {
                  setSelectedItem(item);
                  setIsModalOpen(true);
                }}
              >
                Edit
              </button>
            </div>
            {expandedItemId === item.id && (
              <div className="mt-2 px-4 py-2 bg-gray-100 rounded-lg">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  children={item?.answer}
                />
              </div>
            )}
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <NoteItemModal
          item={selectedItem}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default NoteItems;
