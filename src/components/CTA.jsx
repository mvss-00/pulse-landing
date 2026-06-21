import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { smoothScrollToTop } from '../utils/smoothScroll'

export default function CTA() {
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <section
      ref={ref}
      className="px-5 py-20 lg:py-28 bg-[#F0EFEA]"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="space-y-4"
        >
          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1A18] leading-tight"
          >
            Это всего лишь концепт.{' '}
            <span className="text-[#D85A30]">Но идея рабочая.</span>
          </h2>
          <p className="text-[#6B6A66] text-lg leading-relaxed max-w-lg mx-auto">
            Pulse — портфолио-проект, демонстрирующий другой подход к трекингу расходов:
            через мотивы, а не категории.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.2 }}
        >
          <button
            onClick={smoothScrollToTop}
            aria-label="Вернуться наверх"
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm overflow-hidden group border border-[#1A1A18] text-[#1A1A18] transition-colors duration-300 cursor-pointer"
          >
            <span
              className="absolute inset-0 bg-[#1A1A18] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
              aria-hidden="true"
            />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Наверх ↑
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
