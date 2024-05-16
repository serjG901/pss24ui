import "./App.css";
import ErrorBoundary from "./components/substance/errorboundary";
import { createHashRouter, RouterProvider } from "react-router-dom";
import MainPage from "./routes/main-page";
import Error404Page from "./routes/error-404-page";
import MoviesPage from "./routes/movies-page";
import RatedMoviesPage from "./routes/rated-movies-page";
import MoviePage from "./routes/moviebyid-page";

const router = createHashRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <Error404Page />,
    children: [
      {
        path: "movies",
        element: <MoviesPage />,
      },
      {
        path: "movies/:id",
        element: <MoviePage />,
      },
      {
        path: "rated-movies",
        element: <RatedMoviesPage />,
      },
    ],
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
