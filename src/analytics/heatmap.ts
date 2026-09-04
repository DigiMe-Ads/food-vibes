import { recordClickEvent, type DeviceBucket } from '../lib/firestore'

/**
 * Query param the admin dashboard's heatmap preview iframe loads pages
 * with, so an admin scrolling/clicking around a live preview never
 * pollutes the real heatmap data. Captured once below, at document-load
 * time — deliberately NOT re-read per click, because client-side route
 * changes inside the preview iframe (React Router) drop the query string
 * without reloading the document, and tracking must stay off for the
 * whole preview session regardless of which page gets navigated to.
 */
const PREVIEW_PARAM = 'heatmapPreview'

function deviceBucket(): DeviceBucket {
  return window.innerWidth < 768 ? 'mobile' : 'desktop'
}

/**
 * Records every click on the public site as a position normalized to a
 * fraction of the full page's width/height, so the admin dashboard can
 * reconstruct a click heatmap per page — a small, self-hosted alternative
 * to a third-party analytics tool. No-ops entirely on /admin routes and
 * inside the dashboard's own preview iframe.
 */
export function initHeatmapTracking() {
  if (window.location.pathname.startsWith('/admin')) return
  if (new URLSearchParams(window.location.search).has(PREVIEW_PARAM)) return

  document.addEventListener(
    'click',
    (e) => {
      const root = document.documentElement
      if (root.scrollWidth <= 0 || root.scrollHeight <= 0) return

      const xPct = e.pageX / root.scrollWidth
      const yPct = e.pageY / root.scrollHeight
      if (!Number.isFinite(xPct) || !Number.isFinite(yPct)) return

      recordClickEvent({
        path: window.location.pathname,
        xPct,
        yPct,
        device: deviceBucket(),
      }).catch(() => {
        // Best-effort — a dropped click event shouldn't disrupt the visitor.
      })
    },
    { capture: true },
  )
}
