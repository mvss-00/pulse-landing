/**
 * Smooth scroll with custom easing and duration.
 * Replaces the browser's default CSS scroll-behavior for more control.
 */
export function smoothScrollTo(targetId, duration = 1100) {
  const el = document.getElementById(targetId)
  if (!el) return

  const startY = window.scrollY
  const targetY = el.getBoundingClientRect().top + startY - 64 // 64px navbar offset
  const distance = targetY - startY
  const startTime = performance.now()

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function tick(now) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

export function smoothScrollToTop(duration = 900) {
  const startY = window.scrollY
  const startTime = performance.now()

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function tick(now) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY * (1 - easeInOutCubic(progress)))
    if (progress < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}
