'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import SectionHeader from '@/src/components/ui/SectionHeader'
import AnimateOnScroll from '@/src/components/ui/AnimateOnScroll'

// ─── Local field components ───────────────────────────────────────────────────

interface FieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Field({ label, name, type = 'text', placeholder, required, value, onChange }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-yellow-500 ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm
                   transition-all focus:outline-none focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
      />
    </div>
  )
}

interface TextAreaProps {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

function TextArea({ label, name, placeholder, required, value, onChange }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-yellow-500 ml-0.5">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm
                   resize-none transition-all focus:outline-none focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
      />
    </div>
  )
}

// ─── Success state ────────────────────────────────────────────────────────────

function SuccessCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
      <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-500 text-sm max-w-xs leading-relaxed">{text}</p>
    </div>
  )
}

// ─── Contact info items ───────────────────────────────────────────────────────

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 5.97 5.97l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

type Status = 'idle' | 'sending' | 'sent'

export default function ContactSection() {
  const t = useTranslations('Contact')

  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', phone: '', company: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    // TODO: replace with real API call
    await new Promise(res => setTimeout(res, 1200))
    setStatus('sent')
  }

  return (
    <section id="contact" className="scroll-mt-16 lg:scroll-mt-20 py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">

          {/* ── Left: heading + contact details ── */}
          <AnimateOnScroll animation="fade-right">
            <SectionHeader
              title={t('title')}
              subtitle={t('subtitle')}
            />

            <ul className="mt-6 sm:mt-10 space-y-3 sm:space-y-5">
              <li>
                <a
                  href="tel:+99631200000"
                  className="flex items-start gap-4 group"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                    <PhoneIcon />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Телефон</span>
                    <span className="text-gray-900 font-medium group-hover:text-yellow-600 transition-colors">+996 (312) 00-00-00</span>
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:info@spectechnogroup.kg"
                  className="flex items-start gap-4 group"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                    <EmailIcon />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Email</span>
                    <span className="text-gray-900 font-medium group-hover:text-yellow-600 transition-colors">info@spectechnogroup.kg</span>
                  </span>
                </a>
              </li>

              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
                  <LocationIcon />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Адрес</span>
                  <span className="text-gray-900 font-medium">г. Бишкек, ул. Манаса, 42</span>
                </span>
              </li>

              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
                  <ClockIcon />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">{t('workingHoursLabel')}</span>
                  <span className="text-gray-900 font-medium">{t('workingHours')}</span>
                </span>
              </li>
            </ul>
          </AnimateOnScroll>

          {/* ── Right: form ── */}
          <AnimateOnScroll animation="fade-left" delay={100}>
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 sm:p-6 lg:p-8">
              {status === 'sent' ? (
                <SuccessCard title={t('successTitle')} text={t('successText')} />
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <Field
                      label={t('nameLabel')}
                      name="name"
                      placeholder={t('namePlaceholder')}
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                    <Field
                      label={t('phoneLabel')}
                      name="phone"
                      type="tel"
                      placeholder={t('phonePlaceholder')}
                      required
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <Field
                    label={t('companyLabel')}
                    name="company"
                    required
                    placeholder={t('companyPlaceholder')}
                    value={form.company}
                    onChange={handleChange}
                  />

                  <TextArea
                    label={t('messageLabel')}
                    name="message"
                    placeholder={t('messagePlaceholder')}
                    required
                    value={form.message}
                    onChange={handleChange}
                  />

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3.5 rounded-xl bg-primary text-gray-900 text-sm font-semibold
                               hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        {t('sending')}
                      </span>
                    ) : t('submit')}
                  </button>
                </form>
              )}
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  )
}
