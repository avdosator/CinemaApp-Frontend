import { Route, Routes } from 'react-router-dom';
import './App.css'
import Footer from './components/header-footer/Footer';
import Header from './components/header-footer/Header';
import HomePage from './components/home-page/HomePage';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
