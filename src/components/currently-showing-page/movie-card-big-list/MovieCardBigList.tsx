import "./MovieCardBigList.css"
import MovieCardBig from "../movie-card-big/MovieCardBig";

export default function MovieCardBigList() {
    const array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (  
            <div className="movie-card-big-list">
                {array.map((item, index) => (
                    <MovieCardBig key={index} />
                ))}
            </div>
    )
}