import { motion, AnimatePresence } from 'framer-motion'
import { EMOTIONS } from './ExpenseDemo'
import { STEPS, DEMO_EMOTION } from '../hooks/useStepperAnimation'
import { useCurrency } from '../context/CurrencyContext'

const DEMO_DESCRIPTION = 'Кофе с другом'
const DEMO_BASE_AMOUNT = 2400

// ── Step indicator pills ─────────────────────────────────────────────────────
export function StepIndicators({ current }) {
  return (
    <div className="flex items-center justify-center gap-3" aria-label={`Шаг ${current + 1} из ${STEPS.length}`}>
      {STEPS.map((step, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <motion.div
            animate={{
              width: i === current ? 28 : 8,
              backgroundColor: i === current ? '#D85A30' : i < current ? '#1D9E75' : '#E5E4DF',
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="h-2 rounded-full"
          />
          <motion.span
            animate={{ opacity: i === current ? 1 : 0.4 }}
            transition={{ duration: 0.25 }}
            className="text-[11px] text-[#6B6A66] font-medium hidden sm:block"
          >
            {step.label}
          </motion.span>
        </div>
      ))}
    </div>
  )
}

// ── Animated mock UI ─────────────────────────────────────────────────────────
export function AnimatedPreview({ step, typedAmount, typedDesc, showEntry, distribution }) {
  const { currency } = useCurrency()
  const demoAmountStr = currency.suffix
    ? `${DEMO_BASE_AMOUNT.toLocaleString('ru-RU')} ${currency.symbol}`
    : `${currency.symbol}${DEMO_BASE_AMOUNT.toLocaleString('ru-RU')}`

  return (
    <div className="rounded-2xl border border-[#E5E4DF] bg-white shadow-sm overflow-hidden">
      {/* Window chrome */}
      <div className="px-5 py-3.5 border-b border-[#E5E4DF] flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#D85A30]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#BA7517]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#1D9E75]" />
        <span className="ml-2 text-sm font-medium text-[#6B6A66]">Pulse — Демо</span>
      </div>

      <div className="p-5 space-y-4">
        {/* Fake inputs */}
          <div className="flex gap-2">
          <div className={`w-24 rounded-lg border px-3 py-2 text-sm transition-all duration-300 ${
            step === 0 ? 'border-[#1A1A18] ring-1 ring-[#1A1A18] bg-white' : 'border-[#E5E4DF] bg-[#FAFAF8]'
          } text-[#1A1A18]`}>
            {typedAmount || <span className="text-[#6B6A66]">Сумма, {currency.symbol}</span>}
          </div>
          <div className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-all duration-300 ${
            step === 0 ? 'border-[#1A1A18] ring-1 ring-[#1A1A18] bg-white' : 'border-[#E5E4DF] bg-[#FAFAF8]'
          } text-[#1A1A18]`}>
            {typedDesc || <span className="text-[#6B6A66]">Что купил?</span>}
          </div>
        </div>

        {/* Emotion tags */}
        <div className="flex flex-wrap gap-2">
          {EMOTIONS.map((em) => {
            const isActive = step >= 1 && em.id === DEMO_EMOTION.id
            return (
              <motion.span
                key={em.id}
                animate={
                  step === 1 && em.id === DEMO_EMOTION.id
                    ? { scale: [1, 1.12, 1], transition: { duration: 0.4, repeat: Infinity, repeatDelay: 0.6 } }
                    : { scale: 1 }
                }
                style={{
                  backgroundColor: isActive ? em.color : em.bg,
                  color: isActive ? '#fff' : em.color,
                  borderColor: em.color,
                }}
                className="px-3 py-1 rounded-full text-xs font-medium border select-none"
              >
                {em.label}
              </motion.span>
            )
          })}
        </div>

        {/* Entry appearing */}
        <div className="min-h-[44px]">
          <AnimatePresence>
            {showEntry && (
              <motion.div
                key="demo-entry"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex items-center justify-between gap-3 rounded-lg border border-[#E5E4DF] px-3 py-2.5"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: DEMO_EMOTION.color }} />
                  <span className="text-sm text-[#1A1A18] truncate">{DEMO_DESCRIPTION}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: DEMO_EMOTION.bg, color: DEMO_EMOTION.color }}>
                    {DEMO_EMOTION.label}
                  </span>
                  <span className="text-sm font-medium text-[#1A1A18]">{demoAmountStr}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Distribution bars */}
        <div className="space-y-2 border-t border-[#E5E4DF] pt-2">
          <p className="text-[10px] text-[#6B6A66] font-medium uppercase tracking-wider">
            Распределение по мотивам
          </p>
          {distribution.map((em) => (
            <div key={em.id} className="flex items-center gap-3">
              <span className="text-[11px] text-[#6B6A66] w-24 flex-shrink-0">{em.label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-[#E5E4DF] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: em.color }}
                  animate={{ width: `${em.pct}%` }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                />
              </div>
              <span className="text-[11px] font-medium text-[#1A1A18] w-6 text-right flex-shrink-0">
                {em.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
