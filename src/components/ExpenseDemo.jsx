import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Inbox } from 'lucide-react'
import { useCurrency, fmt } from '../context/CurrencyContext'

export const EMOTIONS = [
  { id: 'impulse',  label: 'Импульс',       color: '#D85A30', bg: '#FFF0EB' },
  { id: 'need',     label: 'Необходимость', color: '#1D9E75', bg: '#E8F7F2' },
  { id: 'pleasure', label: 'Удовольствие',  color: '#BA7517', bg: '#FBF3E3' },
  { id: 'gift',     label: 'Подарок',       color: '#7F77DD', bg: '#F0EFFC' },
  { id: 'boredom',  label: 'Скука',         color: '#888780', bg: '#F0EFEA' },
]

export function getEmotion(id) {
  return EMOTIONS.find((e) => e.id === id)
}

export function calcDistribution(expenses) {
  const total = expenses.reduce((s, e) => s + e.amount, 0)
  return EMOTIONS.map((em) => {
    const sum = expenses.filter((e) => e.emotion === em.id).reduce((s, e) => s + e.amount, 0)
    return { ...em, sum, pct: total === 0 ? 0 : Math.round((sum / total) * 100) }
  })
}

export default function ExpenseDemo() {
  const { currency } = useCurrency()
  const [expenses, setExpenses] = useState([])
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [selectedEmotion, setSelectedEmotion] = useState(null)
  const [nextId, setNextId] = useState(1)

  const distribution = calcDistribution(expenses)
  const total = expenses.reduce((s, e) => s + e.amount, 0)

  const dominantEmotion = EMOTIONS.find(
    (em) => expenses.filter((e) => e.emotion === em.id).length >= 3
  )

  function handleAdd(e) {
    e.preventDefault()
    if (!amount || !selectedEmotion) return
    const parsed = parseFloat(amount.replace(',', '.'))
    if (isNaN(parsed) || parsed <= 0) return
    setExpenses((prev) => [
      { id: nextId, amount: parsed, description: description || 'Без описания', emotion: selectedEmotion },
      ...prev,
    ])
    setNextId((n) => n + 1)
    setAmount('')
    setDescription('')
    setSelectedEmotion(null)
  }

  return (
    <div className="rounded-2xl border border-[#E5E4DF] bg-white shadow-sm overflow-hidden">
      {/* Window chrome */}
      <div className="px-5 py-4 border-b border-[#E5E4DF] flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#D85A30]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#BA7517]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#1D9E75]" />
        <span className="ml-2 text-sm font-medium text-[#6B6A66] font-[family-name:var(--font-display)]">
          Pulse — Демо
        </span>
        {expenses.length > 0 && (
          <span className="ml-auto text-sm font-semibold text-[#1A1A18]">
            Итого: {fmt(total, currency)}
          </span>
        )}
      </div>

      <div className="p-5 space-y-5">
        {/* Add form */}
        <form onSubmit={handleAdd} className="space-y-3" aria-label="Добавить трату">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={`Сумма, ${currency.symbol}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              aria-label="Сумма траты"
              className="w-28 rounded-lg border border-[#E5E4DF] bg-[#FAFAF8] px-3 py-2 text-sm text-[#1A1A18] placeholder-[#6B6A66] focus:outline-none focus:border-[#1A1A18] transition-colors"
            />
            <input
              type="text"
              placeholder="Что купил?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-label="Описание траты"
              className="flex-1 rounded-lg border border-[#E5E4DF] bg-[#FAFAF8] px-3 py-2 text-sm text-[#1A1A18] placeholder-[#6B6A66] focus:outline-none focus:border-[#1A1A18] transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Выбери эмоцию">
            {EMOTIONS.map((em) => {
              const active = selectedEmotion === em.id
              return (
                <motion.button
                  key={em.id}
                  type="button"
                  onClick={() => setSelectedEmotion(active ? null : em.id)}
                  aria-pressed={active}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    backgroundColor: active ? em.color : em.bg,
                    color: active ? '#fff' : em.color,
                    borderColor: em.color,
                  }}
                  className="px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 select-none cursor-pointer"
                >
                  {em.label}
                </motion.button>
              )
            })}
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={!amount || !selectedEmotion}
            aria-label="Добавить трату"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1A1A18] text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-opacity cursor-pointer"
          >
            <Plus size={14} />
            Добавить
          </motion.button>
        </form>

        {/* Insight tip */}
        <AnimatePresence>
          {dominantEmotion && (
            <motion.div
              key="insight"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{ borderColor: dominantEmotion.color, backgroundColor: dominantEmotion.bg }}
              className="rounded-lg border px-3 py-2.5 text-xs leading-relaxed overflow-hidden"
            >
              <span style={{ color: dominantEmotion.color }} className="font-semibold">
                Паттерн замечен:&nbsp;
              </span>
              <span className="text-[#6B6A66]">
                3 и более трат помечены «{dominantEmotion.label}». Может, стоит обратить внимание?
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expense list or empty state */}
        <div className="min-h-[80px]">
          <AnimatePresence initial={false} mode="wait">
            {expenses.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center justify-center gap-2 py-6 text-center"
              >
                <Inbox size={28} className="text-[#E5E4DF]" strokeWidth={1.5} />
                <p className="text-sm text-[#6B6A66]">
                  Добавь первую трату, чтобы увидеть свой паттерн
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-2 max-h-44 overflow-y-auto pr-1"
              >
                <AnimatePresence initial={false}>
                  {expenses.map((exp) => {
                    const em = getEmotion(exp.emotion)
                    return (
                      <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="flex items-center justify-between gap-3 rounded-lg border border-[#E5E4DF] px-3 py-2.5"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: em?.color }} />
                          <span className="text-sm text-[#1A1A18] truncate">{exp.description}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span
                            className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: em?.bg, color: em?.color }}
                          >
                            {em?.label}
                          </span>
                          <span className="text-sm font-medium text-[#1A1A18]">
                            {fmt(exp.amount, currency)}
                          </span>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Distribution bars */}
        <div className="space-y-2.5 pt-1 border-t border-[#E5E4DF]">
          <p className="text-xs text-[#6B6A66] font-medium uppercase tracking-wider">
            Распределение по мотивам
          </p>
          {distribution.map((em) => (
            <div key={em.id} className="space-y-1">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-[#6B6A66]">{em.label}</span>
                <div className="flex items-center gap-2 text-right flex-shrink-0">
                  {em.sum > 0 && (
                    <span className="text-[#6B6A66]">{fmt(em.sum, currency)}</span>
                  )}
                  <span className="font-medium text-[#1A1A18] w-7 text-right">{em.pct}%</span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-[#E5E4DF] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: em.color }}
                  animate={{ width: `${em.pct}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
