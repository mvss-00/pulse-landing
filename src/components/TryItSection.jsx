import { motion } from 'framer-motion'
import ExpenseDemo from './ExpenseDemo'

export default function TryItSection() {
  return (
    <section
      id="try-it"
      className="px-5 py-20 lg:py-28"
      aria-labelledby="tryit-heading"
    >
      <div className="max-w-5xl mx-auto space-y-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
        >
          <h2
            id="tryit-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1A18] mb-3"
          >
            Попробуй сам
          </h2>
          <p className="text-xl text-[#6B6A66]">
            Добавь несколько трат и посмотри, что получится.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          className="max-w-lg mx-auto"
        >
          <ExpenseDemo />
        </motion.div>

      </div>
    </section>
  )
}
