import { useEffect, useRef, useState } from 'react'
import { clearClickEvents, useClickEvents, type DeviceBucket } from '../../lib/firestore'

const PAGES = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/menu', label: 'Menu' },
  { path: '/reservation', label: 'Reservation' },
  { path: '/contact', label: 'Contact' },
]

// Fixed, realistic device viewports — NOT derived from the page's own
// rendered height. Several pages use `min-h-screen` (100vh), which resolves
// against the iframe's own viewport height; if that height were instead
// computed FROM the page's measured content (as an earlier version of this
// did), you get a feedback loop — taller iframe -> taller `min-h-screen`
// hero -> taller measured content -> taller iframe — that runs away
// (observed: a single page ballooning to 100,000+px). Pinning the viewport
// keeps it exactly like a real browser window: a fixed size the page
// scrolls within, not something the page's own height feeds back into.
const DEVICES: { value: DeviceBucket | 'all'; label: string; width: number; height: number }[] = [
  { value: 'desktop', label: 'Desktop', width: 1280, height: 800 },
  { value: 'mobile', label: 'Mobile', width: 390, height: 800 },
  { value: 'all', label: 'All', width: 1280, height: 800 },
]

export default function HeatmapPanel() {
  const [page, setPage] = useState(PAGES[0].path)
  const [device, setDevice] = useState<DeviceBucket | 'all'>('desktop')
  const { data: events, loading } = useClickEvents(page, device)

  const viewport = DEVICES.find((d) => d.value === device) ?? DEVICES[0]

  // Full scrollable height of the page inside the iframe, and how far it's
  // currently scrolled — used only to position heatmap dots, never fed
  // back into the iframe's own size.
  const [contentHeight, setContentHeight] = useState(viewport.height)
  const [scrollTop, setScrollTop] = useState(0)

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const scrollCleanupRef = useRef<(() => void) | null>(null)

  const teardownIframeListeners = () => {
    resizeObserverRef.current?.disconnect()
    resizeObserverRef.current = null
    scrollCleanupRef.current?.()
    scrollCleanupRef.current = null
  }

  // Reset immediately on page/device change so stale overlay data doesn't
  // flash before the newly-loaded iframe reports in.
  useEffect(() => {
    teardownIframeListeners()
    setContentHeight(viewport.height)
    setScrollTop(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, device])

  useEffect(() => teardownIframeListeners, [])

  const onIframeLoad = () => {
    teardownIframeListeners()
    const win = iframeRef.current?.contentWindow
    const contentDoc = iframeRef.current?.contentDocument
    if (!win || !contentDoc) return

    const measureHeight = () => setContentHeight(contentDoc.documentElement.scrollHeight)
    measureHeight()
    const ro = new ResizeObserver(measureHeight)
    ro.observe(contentDoc.body)
    resizeObserverRef.current = ro

    const onScroll = () => setScrollTop(win.scrollY)
    win.addEventListener('scroll', onScroll, { passive: true })
    scrollCleanupRef.current = () => win.removeEventListener('scroll', onScroll)
  }

  // Paint the heatmap overlay for whatever's currently in view, whenever
  // the click data, viewport, or scroll position changes.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = viewport.width
    canvas.height = viewport.height

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.globalCompositeOperation = 'lighter'

    const radius = Math.max(24, viewport.width * 0.03)
    const fullHeight = Math.max(contentHeight, viewport.height)

    for (const ev of events) {
      const y = ev.yPct * fullHeight - scrollTop
      if (y < -radius || y > viewport.height + radius) continue // off-screen at this scroll position
      const x = ev.xPct * viewport.width

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, 'rgba(255,70,0,0.35)')
      gradient.addColorStop(0.5, 'rgba(255,190,0,0.16)')
      gradient.addColorStop(1, 'rgba(255,190,0,0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [events, viewport, contentHeight, scrollTop])

  const previewSrc = `${page}${page.includes('?') ? '&' : '?'}heatmapPreview=1`

  const onClear = async () => {
    if (events.length === 0) return
    if (!confirm(`Delete all ${events.length} recorded click${events.length === 1 ? '' : 's'} for this page?`)) return
    await clearClickEvents(events.map((e) => e.id))
  }

  return (
    <div>
      <h2 className="font-serif text-2xl text-ink">Heatmap</h2>
      <p className="mt-2 max-w-2xl text-sm text-neutral-500">
        Every click on the public site is logged (page, position, device) and
        rendered here as a heatmap — no third-party tracker, just Firestore.
        The preview below is a real, correctly-proportioned browser
        viewport — scroll it like a normal page and the heatmap tracks with
        it. Positions are recorded as a percentage of the page, so mixing
        device sizes is only approximate; use the device filter for the
        clearest picture.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {PAGES.map((p) => (
            <button
              key={p.path}
              type="button"
              onClick={() => setPage(p.path)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-label transition-colors ${
                page === p.path
                  ? 'bg-ink text-white'
                  : 'border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5">
          {DEVICES.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => setDevice(d.value)}
              className={`px-3 py-2 text-[11px] font-semibold uppercase tracking-label transition-colors ${
                device === d.value
                  ? 'bg-gold text-white'
                  : 'border border-neutral-300 text-neutral-500 hover:border-gold hover:text-gold-dark'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <p className="text-xs text-neutral-500">
          {loading ? 'Loading…' : `${events.length} click${events.length === 1 ? '' : 's'} recorded`}
        </p>
        <button
          type="button"
          onClick={onClear}
          disabled={events.length === 0}
          className="text-[11px] font-semibold uppercase tracking-label text-neutral-400 hover:text-red-600 disabled:cursor-default disabled:opacity-40"
        >
          Clear data for this page
        </button>
      </div>

      <div className="mt-6 max-w-full overflow-auto border border-neutral-200 bg-neutral-100 p-4">
        <div className="relative mx-auto" style={{ width: viewport.width, height: viewport.height }}>
          <iframe
            ref={iframeRef}
            src={previewSrc}
            title="Page preview"
            onLoad={onIframeLoad}
            style={{ width: viewport.width, height: viewport.height, border: 'none', display: 'block' }}
          />
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute left-0 top-0"
            style={{ width: viewport.width, height: viewport.height }}
          />
        </div>
      </div>
    </div>
  )
}
