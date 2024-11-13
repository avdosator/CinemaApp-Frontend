import { Route, Routes } from 'react-router-dom';
import './App.css'
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import HomePage from './components/home-page/HomePage';
import AboutUsPage from './components/about-us-page/AboutUsPage';
import PricingPage from './components/pricing-page/PricingPage';
import CurrentlyShowingPage from './components/currently-showing-page/CurrentlyShowingPage';
import UpcomingMoviesPage from './components/upcoming-movies-page/UpcomingMoviesPage';

function App() {

  return (
    <>
      <div className='app-container'>
        <Header />
        <div className='main-content'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/currently-showing' element={<CurrentlyShowingPage />} />
            <Route path='/upcoming-movies' element={<UpcomingMoviesPage />} />
            <Route path='/about' element={<AboutUsPage />} />
            <Route path='/pricing' element={<PricingPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
