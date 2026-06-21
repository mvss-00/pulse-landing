import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export default function Problem() {
  const [ref, inView] = useInView({ threshold: 0.25 })

  return (
    <section
      ref={ref}
      className="px-5 py-20 lg:py-28"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <motion.h2
          id="problem-heading"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1A18] leading-tight"
        >
          Обычные трекеры{' '}
          <span className="text-[#6B6A66]">считают.</span>{' '}
          Pulse&nbsp;
          <span className="text-[#1D9E75]">понимает.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.18 }}
          className="space-y-4"
        >
          {/* Mocked "old" report */}
          <div className="inline-flex flex-col sm:flex-row gap-3 px-5 py-3 rounded-xl bg-[#F0EFEA] border border-[#E5E4DF] text-sm text-[#6B6A66] font-mono mx-auto">
            <span>Еда — 18 000 ₸</span>
            <span className="hidden sm:block text-[#E5E4DF]">|</span>
            <span>Транспорт — 6 500 ₸</span>
            <span className="hidden sm:block text-[#E5E4DF]">|</span>
            <span>Развлечения — 9 200 ₸</span>
          </div>

          <p className="text-lg text-[#6B6A66] leading-relaxed max-w-2xl mx-auto">
            Такие отчёты ты&nbsp;видел сто раз и&nbsp;забывал на&nbsp;следующий день. Они показывают
            цифры, но&nbsp;не&nbsp;объясняют, почему рука сама тянется к&nbsp;карте именно
            в&nbsp;пятницу вечером.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.32 }}
          className="flex flex-wrap justify-center gap-3 pt-2"
          aria-label="Эмоции-мотивы"
        >
          {[
            { label: 'Импульс', color: '#D85A30', bg: '#FFF0EB' },
            { label: 'Необходимость', color: '#1D9E75', bg: '#E8F7F2' },
            { label: 'Удовольствие', color: '#BA7517', bg: '#FBF3E3' },
            { label: 'Подарок', color: '#7F77DD', bg: '#F0EFFC' },
            { label: 'Скука', color: '#888780', bg: '#F0EFEA' },
          ].map((em, i) => (
            <motion.span
              key={em.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.4 + i * 0.08 }}
              style={{ backgroundColor: em.bg, color: em.color, borderColor: em.color }}
              className="px-4 py-1.5 rounded-full text-sm font-medium border"
            >
              {em.label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
