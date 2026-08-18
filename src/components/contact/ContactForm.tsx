import { useState } from 'react'

const fieldClass =
  'w-full border border-neutral-200 bg-neutral-50/60 px-5 py-4 text-sm text-ink placeholder:text-neutral-400 transition-colors focus:border-gold focus:bg-white focus:outline-none'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <span className="mx-auto block h-px w-8 bg-gold" />
        <p className="eyebrow mt-3">Contact Form</p>
        <h2 className="mt-4 font-serif text-5xl text-ink">
          Write Us a Message
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-neutral-500">
          Got a question, feedback, or a special request? Send us a message
          and we&rsquo;ll get back to you soon.
        </p>

        <div className="mt-12 grid grid-cols-1 items-end gap-8 text-left md:grid-cols-[auto_1fr] md:gap-10">
          {/* Chef illustration */}
          <img
            src="/images/contact/food-vibes-chef-mascot.png"
            alt="Food Vibes chef"
            className="mx-auto hidden h-auto w-40 shrink-0 select-none md:block lg:w-48"
          />

          {/* Form */}
          <form
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              aria-label="Name"
              required
              className={fieldClass}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              aria-label="Email"
              required
              className={fieldClass}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              aria-label="Phone Number"
              className={fieldClass}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              aria-label="Subject"
              className={fieldClass}
            />
            <textarea
              name="message"
              placeholder="Message"
              aria-label="Message"
              rows={5}
              required
              className={`${fieldClass} resize-none sm:col-span-2`}
            />

            <div className="sm:col-span-2 sm:text-center">
              <button type="submit" className="btn-solid">
                Send a Message
              </button>
              <p
                role="status"
                className={`mt-5 text-xs text-neutral-500 transition-opacity ${
                  submitted ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Thanks for reaching out! We&rsquo;ll reply as soon as we can.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
