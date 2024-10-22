import './App.css'
import MovieCard from './components/shared-components/movie-card/MovieCard'
import VenueCard from './components/shared-components/venue-card/VenueCard'

function App() {

  const venue = {
    id: "12345",
    name: "Cineplex",
    street: "Zmaja od Bosne",
    streetNumber: "20",
    city: {
      id: "1",
      name: "Sarajevo",
      postalCode: 71000,
      country: "BiH"
    },
    phone: "033-225-883"
  }

  return (
    <>
      <h1>CinemaApp</h1>
      <MovieCard/>
      <VenueCard venue={venue}/>
      
    </>
  )
}

export default App
