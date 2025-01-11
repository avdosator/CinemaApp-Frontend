import { Route, Routes } from "react-router-dom";
import CurrentlyShowingPage from "../components/currently-showing-page/CurrentlyShowingPage";
import UpcomingMoviesPage from "../components/upcoming-movies-page/UpcomingMoviesPage";
import MovieDetailsPage from "../components/movie-details-page/MovieDetailsPage";

export default function MovieRoutes({ openLoginForm }: { openLoginForm: (path?: string, state?: any) => void }) {
    return (
        <Routes>
            <Route path="currently-showing" element={<CurrentlyShowingPage />} />
            <Route path="upcoming" element={<UpcomingMoviesPage />} />
            <Route path=":id" element={<MovieDetailsPage openLoginForm={openLoginForm} />} />
        </Routes>
    )
}