import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetNoteDTO, GetNoteTopicDTO } from "../interfaces/note.interface";
import { axiosInstance } from "../lib/axios";

const NoteTopic = () => {
  const { id } = useParams();
  const [noteTopics, setNoteTopics] = useState<GetNoteTopicDTO[]>([]);
  const [note, setNote] = useState<GetNoteDTO>();
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (id) {
          setLoading(true);
          const { data } = await axiosInstance.get(`/subjects/${id}`);
          setNote(data.note);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchNoteTopics = async () => {
      try {
        setIsFetching(true);
        const { data } = await axiosInstance.get(`/note-topics`);
        setNoteTopics(data.topics);
      } catch (err) {
        console.log(err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchNote();
    fetchNoteTopics();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredTopics = noteTopics.filter((topic) => topic?.note === id);

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
      <h1 className="text-2xl font-bold mb-4 capitalize">{note?.field}</h1>

      <h2 className="text-xl font-medium mb-2 underline-offset-2 underline">
        Topics
      </h2>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <ul className="py-6">
          {filteredTopics.map((topic) => (
            <li key={topic?.id} className="w-fit">
              <Link to={`/topic/${topic?.id}`} className="hover:underline">
                <h2 className="capitalize">{topic?.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteTopic;
