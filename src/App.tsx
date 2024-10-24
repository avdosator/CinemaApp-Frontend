import { Route, Routes } from 'react-router-dom';
import './App.css'
import Footer from './components/header-footer/Footer';
import Header from './components/header-footer/Header';
import HomePage from './components/home-page/HomePage';
import AboutUs from './components/about-us-page/AboutUs';

function App() {

  return (
    <>
    <div className='app-container'>
      <Header />
      <div className='main-content'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/about' element={<AboutUs />} />
        {/* <Route path='/pricing' element={<Pricing />} /> */}
      </Routes>
      </div>
      <Footer />
      </div>
    </>
  )
}

export default App
