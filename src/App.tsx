import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MovieCard from './components/shared-components/movie-card/MovieCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <h1>CinemaApp</h1>
      <MovieCard/>
      
    </>
  )
}

export default App
