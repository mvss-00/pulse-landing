import { useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { AnimatedPreview, StepIndicators } from './StepperPreview'
import { useStepperAnimation, STEPS } from '../hooks/useStepperAnimation'
import { smoothScrollTo } from '../utils/smoothScroll'

function scrollToTryIt(e) {
  e.preventDefault()
  smoothScrollTo('try-it')
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -70])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -45])

  const { step, typedAmount, typedDesc, showEntry, distribution } = useStepperAnimation(true)

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#FAFAF8] px-5 pt-20 pb-12 lg:pt-24 lg:pb-16"
      aria-label="Главный экран"
    >
      {/* Parallax blobs */}
      <motion.div
        style={{ y: y1 }}
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 z-0"
        aria-hidden="true"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, #D85A30 0%, transparent 70%)' }} />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="pointer-events-none absolute top-1/2 -left-32 w-80 h-80 rounded-full opacity-15 z-0"
        aria-hidden="true"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, #7F77DD 0%, transparent 70%)' }} />
      </motion.div>

      {/* Two-column layout */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left — text + CTA */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0EFEA] text-xs font-medium text-[#6B6A66] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D85A30] animate-pulse" />
              Финансовое самопознание
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1A1A18] leading-[1.1] tracking-tight">
              Узнай не&nbsp;сколько ты&nbsp;тратишь.{' '}
              <span className="text-[#D85A30]">Узнай зачем.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="text-lg text-[#6B6A66] leading-relaxed max-w-md"
          >
            Pulse — это не&nbsp;ещё один трекер расходов. Это зеркало твоих привычек: каждая трата
            помечается эмоцией, а&nbsp;не&nbsp;категорией.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          >
            <button
              onClick={scrollToTryIt}
              aria-label="Попробовать Pulse — перейти к демо"
              className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base overflow-hidden group border border-[#1A1A18] text-[#1A1A18] transition-colors duration-300 cursor-pointer"
            >
              <span
                className="absolute inset-0 bg-[#1A1A18] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                aria-hidden="true"
              />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Попробовать →
              </span>
            </button>
          </motion.div>
        </div>

        {/* Right — animated stepper preview (no title) */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="w-full max-w-md mx-auto lg:mx-0 space-y-4"
        >
          {/* Step indicators */}
          <StepIndicators current={step} />

          {/* Hint */}
          <div className="text-center min-h-[20px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="text-xs text-[#6B6A66]"
              >
                {STEPS[step].hint}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Animated mock UI */}
          <AnimatedPreview
            step={step}
            typedAmount={typedAmount}
            typedDesc={typedDesc}
            showEntry={showEntry}
            distribution={distribution}
          />
        </motion.div>
      </div>
    </section>
  )
}
