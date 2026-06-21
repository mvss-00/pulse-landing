export default function Footer() {
  return (
    <footer className="px-5 py-10 border-t border-[#E5E4DF]" role="contentinfo">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="text-lg font-semibold text-[#1A1A18] font-[family-name:var(--font-display)]">
            Pulse
          </span>
          <span className="text-sm text-[#6B6A66]">
            Траты, которые наконец имеют смысл.
          </span>
        </div>

        <p className="text-sm text-[#6B6A66] text-center">
          © 2026 Pulse. Концепт-проект для портфолио.
        </p>
      </div>
    </footer>
  )
}
