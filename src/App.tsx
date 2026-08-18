import { Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/Home/homepage'
import AboutPage from './pages/About/aboutpage'
import ReservationPage from './pages/Reservation/reservationpage'
import ContactPage from './pages/Contact/contactpage'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  )
}
