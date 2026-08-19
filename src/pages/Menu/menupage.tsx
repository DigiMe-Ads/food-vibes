import Navbar from '../../components/Navbar'
import Hero from '../../components/menu/Hero'
import MenuGrid from '../../components/menu/MenuGrid'
import CallToAction from '../../components/menu/CallToAction'
import Footer from '../../components/home/Footer'

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <MenuGrid />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
