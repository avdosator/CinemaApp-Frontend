import { Route, Routes } from 'react-router-dom';
import './App.css'
import Footer from './components/header-footer/Footer';
import Header from './components/header-footer/Header';
import HomePage from './components/home-page/HomePage';
import AboutUsPage from './components/about-us-page/AboutUsPage';
import PricingPage from './components/pricing-page/PricingPage';

function App() {

  return (
    <>
      <div className='app-container'>
        <Header />
        <div className='main-content'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />
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
