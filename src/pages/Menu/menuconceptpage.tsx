import Navbar from '../../components/Navbar'
import ActualInteractiveMenu from '../../components/menu/ActualInteractiveMenu'
import Footer from '../../components/home/Footer'

/**
 * Experimental alternate take on the Menu page — a text-forward, "real
 * printed menu" style layout instead of the photo-grid MenuGrid used on
 * the live /menu route. Not linked from the nav; visit /menu-concept
 * directly to compare. Delete this page + route once a direction is
 * chosen, or swap it in for MenuPage if it wins.
 */
export default function MenuConceptPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Dark band so the transparent navbar's white text stays legible
            before the user scrolls — this page has no dark photo hero. */}
        <div className="h-20 bg-ink sm:h-24" />
        <ActualInteractiveMenu />
      </main>
      <Footer />
    </div>
  )
}
