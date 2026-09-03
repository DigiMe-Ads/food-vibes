import { useState } from 'react'
import { submitContactMessage } from '../../lib/firestore'

const fieldClass =
  'w-full border border-neutral-200 bg-white px-5 py-4 text-sm text-ink placeholder:text-neutral-400 transition-colors focus:border-gold focus:outline-none'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('submitting')
    try {
      await submitContactMessage({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        phone: String(data.get('phone') ?? '') || undefined,
        subject: String(data.get('subject') ?? '') || undefined,
        message: String(data.get('message') ?? ''),
      })
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
      {/* Subtle paper-grain texture, matching the site's menu-card treatment */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: 'radial-gradient(rgba(28,27,25,0.08) 0.6px, transparent 0.6px)',
          backgroundSize: '3px 3px',
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="mx-auto block h-px w-8 bg-gold" />
        <p className="eyebrow mt-3">Contact Form</p>
        <h2 className="mt-4 font-serif text-5xl text-ink">Write Us a Message</h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-neutral-500">
          Got a question, feedback, or a special request? Send us a message
          and we&rsquo;ll get back to you soon.
        </p>

        <div className="relative mt-14 border border-gold/30 bg-white p-1 shadow-xl shadow-black/5">
          <div className="border border-gold/20 p-6 sm:p-10">
            <div className="grid grid-cols-1 items-end gap-8 text-left md:grid-cols-[auto_1fr] md:gap-10">
              <img
                src="/images/contact/food-vibes-chef-mascot.png"
                alt="Food Vibes chef"
                className="mx-auto hidden h-auto w-40 shrink-0 select-none drop-shadow-lg md:block lg:w-48"
              />

              <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <input type="text" name="name" placeholder="Name" aria-label="Name" required className={fieldClass} />
                <input type="email" name="email" placeholder="Email" aria-label="Email" required className={fieldClass} />
                <input type="tel" name="phone" placeholder="Phone Number" aria-label="Phone Number" className={fieldClass} />
                <input type="text" name="subject" placeholder="Subject" aria-label="Subject" className={fieldClass} />
                <textarea
                  name="message"
                  placeholder="Message"
                  aria-label="Message"
                  rows={5}
                  required
                  className={`${fieldClass} resize-none sm:col-span-2`}
                />

                <div className="sm:col-span-2 sm:text-center">
                  <button type="submit" disabled={status === 'submitting'} className="btn-solid disabled:opacity-60">
                    {status === 'submitting' ? 'Sending…' : 'Send a Message'}
                  </button>
                  {status === 'success' && (
                    <p role="status" className="mt-5 text-xs text-neutral-500">
                      Thanks for reaching out! We&rsquo;ll reply as soon as we can.
                    </p>
                  )}
                  {status === 'error' && (
                    <p role="status" className="mt-5 text-xs text-red-600">
                      Something went wrong sending your message — please try again.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
