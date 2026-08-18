import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Jumps to the top of the page on route change, unless the new URL carries
 * a hash (e.g. `/#reservation`), in which case the browser handles the
 * anchor scroll instead. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}
