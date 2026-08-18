import Navbar from '../../components/Navbar'
import Hero from '../../components/about/Hero'
import OurStory from '../../components/about/OurStory'
import BookTable from '../../components/about/BookTable'
import Footer from '../../components/home/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="about-content">
        <Hero />
        <OurStory />
        <BookTable />
      </main>
      <Footer />
    </div>
  )
}
