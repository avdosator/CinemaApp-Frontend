import { Route, Routes } from 'react-router-dom';
import './App.css'
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import HomePage from './components/home-page/HomePage';
import AboutUsPage from './components/about-us-page/AboutUsPage';
import PricingPage from './components/pricing-page/PricingPage';
import MovieProvider from './context/movie-context/MovieContext';
import MovieRoutes from './routes/MovieRoutes';
import { useCallback, useState } from 'react';
import AuthContainer from './components/auth/auth-container/AuthContainer';
import UserProvider from './context/UserContext';
import ProtectedRoute from './routes/ProtectedRoute';
import ReservationTicketPage from './components/reservation-ticket-page/ReservationTicketPage';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [redirectInfo, setRedirectInfo] = useState<{ path: string; state?: any } | null>(null);

  const openAuthModal = useCallback((path: string = "/", state: any = null): void => {
    setRedirectInfo({ path, state }); // Store the route and state
    setIsAuthOpen(true); // Open the login modal
  }, []);

  const closeAuthModal = (): void => {
    setIsAuthOpen(false);
    setRedirectInfo(null); // Clear redirect info when closing modal
  };

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
                <Route
                  path="/projection/:id/reservations"
                  element={
                    <ProtectedRoute openLoginForm={openAuthModal}>
                      <ReservationTicketPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
            <Footer />
          </div>
          {isAuthOpen && <AuthContainer closeAuthContainer={closeAuthModal} redirectInfo={redirectInfo} />}
        </MovieProvider>
      </UserProvider>
    </>
  )
}

export default App
