import { useEffect, useState } from 'react'
import { updateSiteSettings, useSiteSettings, type SiteSettings } from '../../lib/firestore'
import ImagePicker from './ImagePicker'

const fieldClass = 'w-full border border-neutral-200 px-4 py-3 text-sm focus:border-gold focus:outline-none'

export default function SiteSettingsPanel() {
  const { data: settings, loading } = useSiteSettings()
  const [draft, setDraft] = useState<SiteSettings>(settings)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(false)

  // Sync the draft whenever the live doc changes (e.g. first load resolving).
  // Only while not actively mid-edit-and-save, so we don't clobber typing.
  useEffect(() => {
    if (!saving) setDraft(settings)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings])

  const save = async () => {
    setSaving(true)
    setSaved(false)
    setError(false)
    try {
      await updateSiteSettings(draft)
      setSaved(true)
    } catch (err) {
      console.error('Site settings save failed:', err)
      setError(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h2 className="font-serif text-2xl text-ink">Site Settings</h2>
      <p className="mt-2 max-w-2xl text-sm text-neutral-500">
        Contact details shown in the footer, the Contact page, and the
        reservation info section all come from here — one place to update
        instead of hunting through every page.
      </p>

      {loading ? (
        <p className="mt-6 text-sm text-neutral-400">Loading…</p>
      ) : (
        <div className="mt-6 max-w-2xl space-y-6 border border-neutral-200 bg-white p-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-label text-neutral-500">
              Contact Info
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                placeholder="Phone"
                value={draft.phone}
                onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                className={fieldClass}
              />
              <input
                placeholder="Email"
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                className={fieldClass}
              />
              <input
                placeholder="Address"
                value={draft.address}
                onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                className={`${fieldClass} sm:col-span-2`}
              />
              <input
                placeholder="Hours (e.g. Open daily, 7:30 AM – 11:00 PM)"
                value={draft.hours}
                onChange={(e) => setDraft({ ...draft, hours: e.target.value })}
                className={`${fieldClass} sm:col-span-2`}
              />
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-label text-neutral-500">
              Social Links (leave blank to hide)
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(['facebook', 'instagram', 'x', 'youtube'] as const).map((key) => (
                <input
                  key={key}
                  placeholder={key[0].toUpperCase() + key.slice(1) + ' URL'}
                  value={draft.socials[key]}
                  onChange={(e) => setDraft({ ...draft, socials: { ...draft.socials, [key]: e.target.value } })}
                  className={fieldClass}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-label text-neutral-500">
              Footer Gallery
            </p>
            <div className="space-y-3">
              {draft.galleryImages.map((img, i) => (
                <div key={i} className="flex items-end gap-3">
                  <ImagePicker
                    value={img}
                    onChange={(src) => {
                      const next = [...draft.galleryImages]
                      next[i] = src
                      setDraft({ ...draft, galleryImages: next })
                    }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({ ...draft, galleryImages: draft.galleryImages.filter((_, j) => j !== i) })
                    }
                    className="mb-1 text-xs text-neutral-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setDraft({ ...draft, galleryImages: [...draft.galleryImages, ''] })}
                className="text-xs font-semibold uppercase tracking-label text-gold hover:text-gold-dark"
              >
                + Add Photo
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="btn-solid px-6 py-2.5 text-xs disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save Settings'}
            </button>
            {saved && !saving && <span className="text-xs text-neutral-500">Saved.</span>}
            {error && !saving && (
              <span className="text-xs text-red-600">
                Couldn&rsquo;t save — check your Firestore rules include the "settings" collection.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
