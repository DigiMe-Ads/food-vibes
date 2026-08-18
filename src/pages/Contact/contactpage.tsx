import Navbar from '../../components/Navbar'
import Hero from '../../components/contact/Hero'
import GetInTouch from '../../components/contact/GetInTouch'
import ContactForm from '../../components/contact/ContactForm'
import Footer from '../../components/home/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="contact-details">
        <Hero />
        <GetInTouch />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
