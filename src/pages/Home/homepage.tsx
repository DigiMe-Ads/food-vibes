import Navbar from '../../components/Navbar'
import Hero from '../../components/home/Hero'
import Welcome from '../../components/home/Welcome'
import Features from '../../components/home/Features'
import PopularDishes from '../../components/home/PopularDishes'
import BookTable from '../../components/home/BookTable'
import Footer from '../../components/home/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Welcome />
        <Features />
        <PopularDishes />
        <BookTable />
      </main>
      <Footer />
    </div>
  )
}
