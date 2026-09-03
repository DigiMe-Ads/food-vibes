import { Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/Home/homepage'
import AboutPage from './pages/About/aboutpage'
import MenuPage from './pages/Menu/menupage'
import ReservationPage from './pages/Reservation/reservationpage'
import ContactPage from './pages/Contact/contactpage'
import AdminPage from './pages/Admin/adminpage'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Not linked from the public nav — restaurant staff only */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  )
}
