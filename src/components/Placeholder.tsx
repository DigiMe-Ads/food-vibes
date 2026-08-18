import { useState } from 'react'

type Props = {
  /** Optional real image path (drop files in /public/images later). */
  src?: string
  alt?: string
  /** Short label shown while there is no image. */
  label?: string
  className?: string
  /** Extra classes applied to the <img> once a src is provided. */
  imgClassName?: string
}

/**
 * Image placeholder.
 * Renders a neutral labeled block until a real `src` is supplied (or if that
 * src fails to load). Swap in real images later by passing `src` — no other
 * markup changes needed.
 */
export default function Placeholder({
  src,
  alt = '',
  label = 'Image',
  className = '',
  imgClassName = '',
}: Props) {
  const [failed, setFailed] = useState(false)
  const showImg = src && !failed

  return (
    <div
      className={`relative overflow-hidden bg-neutral-200/80 ${className}`}
      role={showImg ? undefined : 'img'}
      aria-label={showImg ? undefined : label}
    >
      {showImg ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300">
          <span className="select-none px-3 text-center text-[11px] font-medium uppercase tracking-label text-neutral-500">
            {label}
          </span>
        </div>
      )}
    </div>
  )
}
