import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCurrency } from '../context/CurrencyContext'
import { smoothScrollToTop } from '../utils/smoothScroll'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { code, setCode, CURRENCIES } = useCurrency()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[#E5E4DF] shadow-sm'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={smoothScrollToTop}
          aria-label="Pulse — наверх"
          className="text-3xl font-semibold font-[family-name:var(--font-display)] text-[#D85A30] cursor-pointer flex-shrink-0 tracking-tight"
        >
          Pulse
        </button>

        {/* Currency switcher */}
        <div
          className="flex items-center rounded-lg border border-[#E5E4DF] bg-[#F0EFEA] p-0.5 gap-0.5"
          role="group"
          aria-label="Выбор валюты"
        >
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              onClick={() => setCode(c.code)}
              aria-pressed={code === c.code}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                code === c.code
                  ? 'bg-white text-[#1A1A18] shadow-sm'
                  : 'text-[#6B6A66] hover:text-[#1A1A18]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Badge */}
        <span className="hidden sm:inline text-xs font-medium px-3 py-1 rounded-full border border-[#E5E4DF] text-[#6B6A66] bg-[#F0EFEA] flex-shrink-0">
          Концепт-демо
        </span>
      </div>
    </motion.header>
  )
}
