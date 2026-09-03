import { useState } from 'react'
import { IMAGE_LIBRARY } from '../../data/imageLibrary'

type Props = {
  value: string
  onChange: (src: string) => void
  /** Optional label shown above the control. */
  label?: string
}

/**
 * Image field for the admin dashboard. There's no Storage upload wired up
 * (no billing account on the Firebase project yet), so this picks from the
 * site's existing /public/images library, or accepts a pasted URL.
 */
export default function ImagePicker({ value, onChange, label }: Props) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'library' | 'url'>('library')
  const [urlDraft, setUrlDraft] = useState('')

  return (
    <div>
      {label && (
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-label text-neutral-500">
          {label}
        </p>
      )}

      <div className="flex items-center gap-3">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded border border-neutral-200 bg-neutral-100">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] text-neutral-400">
              No image
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-neutral-500">{value || 'No image selected'}</p>
          <button
            type="button"
            onClick={() => {
              setUrlDraft(value)
              setOpen(true)
            }}
            className="mt-1 text-xs font-semibold uppercase tracking-label text-gold hover:text-gold-dark"
          >
            {value ? 'Change' : 'Choose Image'}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[80vh] w-full max-w-2xl overflow-hidden rounded bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-3">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setTab('library')}
                  className={`text-xs font-semibold uppercase tracking-label ${
                    tab === 'library' ? 'text-gold-dark' : 'text-neutral-400'
                  }`}
                >
                  Choose Existing
                </button>
                <button
                  type="button"
                  onClick={() => setTab('url')}
                  className={`text-xs font-semibold uppercase tracking-label ${
                    tab === 'url' ? 'text-gold-dark' : 'text-neutral-400'
                  }`}
                >
                  Paste URL
                </button>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="text-neutral-400 hover:text-ink"
              >
                &#10005;
              </button>
            </div>

            {tab === 'library' ? (
              <div className="max-h-[65vh] overflow-y-auto p-5">
                {IMAGE_LIBRARY.map((group) => (
                  <div key={group.group} className="mb-6 last:mb-0">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-label text-neutral-500">
                      {group.group}
                    </p>
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                      {group.images.map((img) => (
                        <button
                          key={img.src}
                          type="button"
                          title={img.label}
                          onClick={() => {
                            onChange(img.src)
                            setOpen(false)
                          }}
                          className={`aspect-square overflow-hidden rounded border-2 transition-colors ${
                            value === img.src
                              ? 'border-gold'
                              : 'border-transparent hover:border-neutral-300'
                          }`}
                        >
                          <img src={img.src} alt={img.label} className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-5">
                <input
                  type="text"
                  value={urlDraft}
                  onChange={(e) => setUrlDraft(e.target.value)}
                  placeholder="https://... or /images/..."
                  className="w-full border border-neutral-200 px-4 py-3 text-sm focus:border-gold focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (urlDraft.trim()) {
                      onChange(urlDraft.trim())
                      setOpen(false)
                    }
                  }}
                  className="btn-solid mt-4"
                >
                  Use This Image
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
