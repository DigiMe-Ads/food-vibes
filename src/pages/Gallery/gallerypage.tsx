import Navbar from '../../components/Navbar'
import Hero from '../../components/gallery/Hero'
import GalleryGrid from '../../components/gallery/GalleryGrid'
import Footer from '../../components/home/Footer'

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <GalleryGrid />
      </main>
      <Footer />
    </div>
  )
}
