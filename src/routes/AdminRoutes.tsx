import { Routes, Route, Navigate } from "react-router-dom";
import MoviesPanel from "../components/admin-panel/movies-tab/MoviesPanel";
import NewMovie from "../components/admin-panel/new-movie/NewMovie";

export default function AdminRoutes() {
    return (
        <Routes>
            {/* Redirect to drafts when /admin/movies is accessed */}
            <Route path="movies" element={<Navigate to="/admin/movies/drafts" replace />} />
            <Route path="movies/drafts" element={<MoviesPanel />} />
            <Route path="movies/currently-showing" element={<MoviesPanel />} />
            <Route path="movies/upcoming" element={<MoviesPanel />} />
            <Route path="movies/archived" element={<MoviesPanel />} />
            <Route path="movies/new-movie" element={<NewMovie />} />
            <Route path="venues" element={<div>Venues Section Coming Soon</div>} />
        </Routes>
    )
}