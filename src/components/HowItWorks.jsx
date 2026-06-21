import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { PenLine, BarChart2, Lightbulb } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    icon: PenLine,
    title: 'Отмечай трату',
    description:
      'Вписал сумму — выбрал не&nbsp;категорию, а&nbsp;мотив: импульс, необходимость, удовольствие, подарок или просто скука.',
    color: '#D85A30',
    bg: '#FFF0EB',
  },
  {
    number: '02',
    icon: BarChart2,
    title: 'Смотри паттерн',
    description:
      'Pulse сам строит карту твоих трат по&nbsp;эмоциям — без таблиц, без сложных отчётов, только честная картина.',
    color: '#1D9E75',
    bg: '#E8F7F2',
  },
  {
    number: '03',
    icon: Lightbulb,
    title: 'Меняй привычку',
    description:
      'Через неделю ты&nbsp;увидишь: импульсивные покупки случаются именно по&nbsp;вечерам после работы. Дальше решение твоё.',
    color: '#7F77DD',
    bg: '#F0EFFC',
  },
]

export default function HowItWorks() {
  const [ref, inView] = useInView({ threshold: 0.15 })

  return (
    <section
      ref={ref}
      className="px-5 py-20 lg:py-28 bg-[#F0EFEA]"
      aria-labelledby="how-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <h2
            id="how-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1A18] leading-tight"
          >
            Три шага к&nbsp;осознанности
          </h2>
          <p className="mt-3 text-[#6B6A66] text-lg max-w-xl mx-auto">
            Никакой магии — просто другой взгляд на то, что ты уже делаешь каждый день.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 + i * 0.15 }}
                className="relative bg-white rounded-2xl p-6 border border-[#E5E4DF] flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: step.bg }}
                    aria-hidden="true"
                  >
                    <Icon size={20} color={step.color} strokeWidth={1.8} />
                  </div>
                  <span
                    className="text-4xl font-semibold leading-none select-none"
                    style={{ color: step.color, opacity: 0.15 }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#1A1A18] mb-2">{step.title}</h3>
                  <p
                    className="text-[#6B6A66] leading-relaxed text-sm"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                </div>

                {/* Colored left accent */}
                <span
                  className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full"
                  style={{ backgroundColor: step.color }}
                  aria-hidden="true"
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
