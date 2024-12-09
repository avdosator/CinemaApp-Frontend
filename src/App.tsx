import { Route, Routes } from 'react-router-dom';
import './App.css'
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import HomePage from './components/home-page/HomePage';
import AboutUsPage from './components/about-us-page/AboutUsPage';
import PricingPage from './components/pricing-page/PricingPage';
import MovieProvider from './context/movie-context/MovieContext';
import MovieRoutes from './routes/MovieRoutes';
import { useState } from 'react';
import AuthContainer from './components/auth/auth-container/AuthContainer';
import UserProvider from './context/UserContext';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  const openAuthModal = (): void => setIsAuthOpen(true);
  const closeAuthModal = (): void => setIsAuthOpen(false);

  return (
    <>
      <UserProvider >
        <MovieProvider>
          <div className='app-container'>
            <Header openAuthModal={openAuthModal} />
            <div className={`main-content ${isAuthOpen ? "blurred-background" : ""}`}>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/movies/*' element={<MovieRoutes />} />
                <Route path='/about' element={<AboutUsPage />} />
                {/* <Route path='/pricing' element={<PricingPage />} /> */}
                {/* Protected Route */}
              <Route
                path="/pricing"
                element={
                  <ProtectedRoute openLoginForm={openAuthModal}>
                    <PricingPage />
                  </ProtectedRoute>
                }
              />
              </Routes>
            </div>
            <Footer />
          </div>
          {isAuthOpen && <AuthContainer closeAuthContainer={closeAuthModal} />}
        </MovieProvider>
      </UserProvider>
    </>
  )
}

export default App
