import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetNoteDTO } from "../interfaces/note.interface";
import { axiosInstance } from "../lib/axios";

const Home = () => {
  const [notes, setNotes] = useState<GetNoteDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/subjects`);
        setNotes(data.notes);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="container mx-auto px-2 py-6">
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-4">Study Notes</h1>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="py-6">
          {notes.map((note) => (
            <li key={note?.id} className="w-fit">
              <Link to={`/note/${note?.id}`} className="hover:underline">
                <h2 className="capitalize">{note?.field}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
