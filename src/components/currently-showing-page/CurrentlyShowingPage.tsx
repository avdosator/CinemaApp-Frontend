import "./CurrentlyShowingPage.css"
import MovieCardBigList from "./movie-card-big-list/MovieCardBigList";
import CurrentlyShowingForm from "./currently-showing-form/CurrentlyShowingForm";

export default function CurrentlyShowingPage() {
    return(
        <>  
            <h4 className="font-heading-h4 currently-showing-caption">Currently showing(9)</h4>
            <CurrentlyShowingForm />
            <div className="font-md-italic-regular date-reminder">
                Quick reminder that our cinema schedule is on a ten-day update cycle.
            </div>
            <MovieCardBigList />
        </>
    )
}