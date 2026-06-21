import { useState, useRef, useCallback, useEffect } from 'react'
import { EMOTIONS, calcDistribution } from '../components/ExpenseDemo'

const DEMO_AMOUNT = '2 400'
const DEMO_DESCRIPTION = 'Кофе с другом'
export const DEMO_EMOTION = EMOTIONS[0] // Импульс
const DEMO_EXPENSE = { id: 'demo-1', amount: 2400, description: DEMO_DESCRIPTION, emotion: DEMO_EMOTION.id }

const STEP_DURATION = 2500
const PAUSE_AFTER = 1500
const TYPE_INTERVAL = 60

export const STEPS = [
  { label: 'Вводишь трату',   hint: 'Сумма и что именно ты купил' },
  { label: 'Выбираешь мотив', hint: 'Не категорию, а причину покупки' },
  { label: 'Видишь паттерн',  hint: 'Список и распределение обновляются мгновенно' },
]

/**
 * Self-contained animation loop for the stepper preview.
 * @param {boolean} active – run when true, pause when false
 */
export function useStepperAnimation(active = true) {
  const [step, setStep] = useState(0)
  const [typedAmount, setTypedAmount] = useState('')
  const [typedDesc, setTypedDesc] = useState('')
  const [showEntry, setShowEntry] = useState(false)
  const [demoExpenses, setDemoExpenses] = useState([])

  const timers = useRef([])

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  const schedule = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay)
    timers.current.push(id)
  }, [])

  const runCycle = useCallback(() => {
    setStep(0)
    setTypedAmount('')
    setTypedDesc('')
    setShowEntry(false)
    setDemoExpenses([])

    // Step 0 – type inputs
    DEMO_AMOUNT.split('').forEach((_, i) => {
      schedule(() => setTypedAmount(DEMO_AMOUNT.slice(0, i + 1)), i * TYPE_INTERVAL)
    })
    const descStart = DEMO_AMOUNT.length * TYPE_INTERVAL + 150
    DEMO_DESCRIPTION.split('').forEach((_, i) => {
      schedule(() => setTypedDesc(DEMO_DESCRIPTION.slice(0, i + 1)), descStart + i * TYPE_INTERVAL)
    })

    // Step 1 – highlight emotion
    const step1Start = descStart + DEMO_DESCRIPTION.length * TYPE_INTERVAL + 400
    schedule(() => setStep(1), step1Start)

    // Step 2 – show entry + bars
    const step2Start = step1Start + STEP_DURATION
    schedule(() => {
      setStep(2)
      setShowEntry(true)
      setDemoExpenses([DEMO_EXPENSE])
    }, step2Start)

    // Loop
    schedule(() => runCycle(), step2Start + STEP_DURATION + PAUSE_AFTER)
  }, [schedule])

  useEffect(() => {
    if (active) {
      runCycle()
    } else {
      clearTimers()
    }
    return clearTimers
  }, [active, runCycle, clearTimers])

  const distribution = calcDistribution(demoExpenses)

  return { step, typedAmount, typedDesc, showEntry, distribution }
}
