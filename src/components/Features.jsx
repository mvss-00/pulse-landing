import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Wand2, CalendarCheck, Bell, Heart } from 'lucide-react'

const FEATURES = [
  {
    icon: Wand2,
    title: 'Автотеггинг',
    description:
      'Pulse предлагает мотив на основе времени, места и суммы — тебе остаётся подтвердить или поправить.',
    color: '#D85A30',
    bg: '#FFF0EB',
  },
  {
    icon: CalendarCheck,
    title: 'Недельный пульс',
    description:
      'Каждое воскресенье — короткая сводка: что было импульсом, а что — осознанным решением.',
    color: '#1D9E75',
    bg: '#E8F7F2',
  },
  {
    icon: Bell,
    title: 'Триггеры',
    description:
      'Уведомление приходит не «ты превысил бюджет», а «сейчас похоже на то самое пятничное настроение».',
    color: '#7F77DD',
    bg: '#F0EFFC',
  },
  {
    icon: Heart,
    title: 'Без оценок',
    description:
      'Pulse не ругает за траты. Только показывает, оставляя выводы тебе.',
    color: '#BA7517',
    bg: '#FBF3E3',
  },
]

function FeatureCard({ feature, index, inView }) {
  const Icon = feature.icon
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -5, y: dx * 5 })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 + index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className="relative bg-white rounded-2xl p-6 border border-[#E5E4DF] flex flex-col gap-4 transition-shadow duration-300 hover:shadow-md cursor-default"
    >
      {/* Color left border */}
      <motion.span
        className="absolute left-0 top-6 bottom-6 rounded-r-full"
        style={{ backgroundColor: feature.color }}
        animate={{ width: hovered ? 4 : 3 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />

      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: feature.bg }}
        aria-hidden="true"
      >
        <Icon size={20} color={feature.color} strokeWidth={1.8} />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#1A1A18] mb-2">{feature.title}</h3>
        <p className="text-[#6B6A66] leading-relaxed text-sm">{feature.description}</p>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <section
      ref={ref}
      className="px-5 py-20 lg:py-28"
      aria-labelledby="features-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1A18] leading-tight"
          >
            Всё, что нужно. Ничего лишнего.
          </h2>
          <p className="mt-3 text-[#6B6A66] text-lg max-w-lg mx-auto">
            Pulse создан чтобы понимать, а не усложнять.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
