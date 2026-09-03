import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import MenuManager from './MenuManager'
import TestimonialManager from './TestimonialManager'
import ReservationsPanel from './ReservationsPanel'
import MessagesPanel from './MessagesPanel'

const TABS = ['Menu', 'Testimonials', 'Reservations', 'Messages'] as const
type Tab = (typeof TABS)[number]

export default function AdminLayout({ email }: { email: string | null }) {
  const [tab, setTab] = useState<Tab>('Reservations')

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <img src="/images/food-vibes-logo-gold.png" alt="" className="h-8 w-auto" />
          <span className="font-serif text-xl text-ink">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-xs text-neutral-500 sm:inline">{email}</span>
          <button
            type="button"
            onClick={() => signOut(auth)}
            className="text-xs font-semibold uppercase tracking-label text-gold hover:text-gold-dark"
          >
            Sign Out
          </button>
        </div>
      </header>

      <nav className="flex gap-1 overflow-x-auto border-b border-neutral-200 bg-white px-6">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`shrink-0 border-b-2 px-4 py-3 text-xs font-semibold uppercase tracking-label transition-colors ${
              tab === t
                ? 'border-gold text-gold-dark'
                : 'border-transparent text-neutral-400 hover:text-ink'
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {tab === 'Menu' && <MenuManager />}
        {tab === 'Testimonials' && <TestimonialManager />}
        {tab === 'Reservations' && <ReservationsPanel />}
        {tab === 'Messages' && <MessagesPanel />}
      </main>
    </div>
  )
}
