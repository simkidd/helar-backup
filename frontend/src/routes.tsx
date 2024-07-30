import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import NoteTopic from "./pages/NoteTopic";
import NoteItems from "./pages/NoteItems";
import ErrorPage from "./error.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/note/:id",
    element: <NoteTopic />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/topic/:id",
    element: <NoteItems />,
    errorElement: <ErrorPage />,
  },
]);
