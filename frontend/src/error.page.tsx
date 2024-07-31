import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-gray-100 text-gray-800 text-center p-4">
      <h1 className="text-6xl font-bold mb-4">Oops!</h1>
      <p className="text-2xl mb-4">Sorry, an unexpected error has occurred.</p>
      <p className="text-lg text-gray-600 mb-8">
        <i>{error.statusText || error.message}</i>
      </p>

      <button
        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        onClick={() => navigate("/")}
      >
        Go back to Home
      </button>
    </div>
  );
}
