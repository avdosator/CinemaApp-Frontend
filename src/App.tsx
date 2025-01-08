import { Navigate, Route, Routes } from 'react-router-dom';
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
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AdminPanelPage from './components/admin-panel/AdminPanelPage';
import MoviesPanel from './components/admin-panel/movies-tab/MoviesPanel';

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
  const stripePromise = loadStripe("pk_test_51QWObK005aH1ki3zlE396ntDW9qto4YWeDvPSEIDyvQoUioh6sSJjtvzplukio4b1EHd2kBxSZlPcmSIqcVi3DC500Purif1vc");

  return (
    <>
      <UserProvider >
        <MovieProvider>
          <Elements stripe={stripePromise}>
            <div className='app-container'>
              <Header openAuthModal={openAuthModal} />
              <div className={`main-content ${isAuthOpen ? "blurred-background" : ""}`}>
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/home' element={<HomePage />} />
                  <Route path='/movies/*' element={<MovieRoutes />} />
                  <Route path='/about' element={<AboutUsPage />} />
                  <Route path='/pricing' element={<PricingPage />} />
                  <Route path='/admin/*' element={<AdminPanelPage />} >
                    {/* Default redirect for /admin */}
                    <Route index element={<Navigate to="/admin/movies/drafts" replace />} />

                    {/* Movie Tabs as Child Routes */}
                    <Route path="movies/drafts" element={<MoviesPanel />} />
                    <Route path="movies/currently-showing" element={<MoviesPanel />} />
                    <Route path="movies/upcoming" element={<MoviesPanel />} />
                    <Route path="movies/archived" element={<MoviesPanel />} />

                    {/* Venues Route */}
                    <Route path="venues" element={<div>Venues Section Coming Soon</div>} />
                  </Route>
                  {/* Protected Route */}
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
          </Elements>
        </MovieProvider>
      </UserProvider>
    </>
  )
}

export default App
