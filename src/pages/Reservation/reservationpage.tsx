import Navbar from '../../components/Navbar'
import Hero from '../../components/reservation/Hero'
import BookingForm from '../../components/reservation/BookingForm'
import ReservationInfo from '../../components/reservation/ReservationInfo'
import Footer from '../../components/home/Footer'

export default function ReservationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <BookingForm />
        <ReservationInfo />
      </main>
      <Footer />
    </div>
  )
}
