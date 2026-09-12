import { useEffect, useMemo, useRef } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import k1 from '../assets/img/k-papel-1.png'
import k2 from '../assets/img/k-papel-2.png'
import k3 from '../assets/img/k-papel-3.png'
import k4 from '../assets/img/k-papel-4.png'
import k5 from '../assets/img/k-papel-5.png'

/**
 * Predefinição aprovada pelo Igor (20/08/2026): amassar 550ms · desamassar 420ms ·
 * blend 0.10 · shrink 0.40 · squeeze ligado. Não recalibrar sem pedido explícito.
 */
const IN_DURATION = 550
const OUT_DURATION = 420
const BLEND = 0.1
const SHRINK = 0.4
const SQUEEZE = true
const FRAMES = [k1, k2, k3, k4, k5]
const SHRINK_CURVE = [0, 0.06, 0.22, 0.62, 1]

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
}
function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}
function clamp(v: number, a: number, b: number) {
  return v < a ? a : v > b ? b : v
}
function scalesFrom(shrink: number, count: number) {
  const out: number[] = []
  for (let i = 0; i < count; i++) {
    const idx = Math.round((i * (SHRINK_CURVE.length - 1)) / (count - 1))
    out.push(1 - shrink * SHRINK_CURVE[idx])
  }
  return out
}

export function HeroCrumpleK({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const layerRefs = useRef<(HTMLImageElement | null)[]>([])
  const scales = useMemo(() => scalesFrom(SHRINK, FRAMES.length), [])

  const pRef = useRef(0)
  const targetRef = useRef(0)
  const fromRef = useRef(0)
  const startRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const scrollPRef = useRef(0)
  const pointerActiveRef = useRef(false)
  const readyRef = useRef(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const render = (p: number) => {
    const n = FRAMES.length
    const fi = p * (n - 1)
    const blend = Math.max(0.001, BLEND)

    layerRefs.current.forEach((img, i) => {
      if (!img) return
      const d = Math.abs(i - fi)
      const a = d <= 0.5 - blend / 2 ? 1 : clamp(1 - (d - (0.5 - blend / 2)) / blend, 0, 1)
      img.style.opacity = a.toFixed(3)
    })

    const lo = Math.floor(fi)
    const hi = Math.min(lo + 1, n - 1)
    const f = fi - lo
    const s = scales[lo] + (scales[hi] - scales[lo]) * f

    const r = SQUEEZE ? -3.2 * p : 0
    const y = SQUEEZE ? 6 * Math.sin(p * Math.PI) : 0

    if (stageRef.current) {
      stageRef.current.style.transform = `translate3d(0,${y.toFixed(2)}px,0) rotate(${r.toFixed(2)}deg) scale(${s.toFixed(4)})`
    }
    if (wrapRef.current) {
      wrapRef.current.style.setProperty('--korus-p', p.toFixed(3))
    }
  }

  const tick = (now: number) => {
    const up = targetRef.current > fromRef.current
    let dur = up ? IN_DURATION : OUT_DURATION
    dur *= Math.abs(targetRef.current - fromRef.current) || 1
    const t = dur <= 0 ? 1 : clamp((now - startRef.current) / dur, 0, 1)
    const e = up ? easeInOutQuad(t) : easeOutCubic(t)

    pRef.current = fromRef.current + (targetRef.current - fromRef.current) * e
    render(pRef.current)

    if (t < 1) {
      rafRef.current = requestAnimationFrame(tick)
    } else {
      pRef.current = targetRef.current
      render(pRef.current)
      rafRef.current = null
    }
  }

  const goTo = (target: number) => {
    if (!readyRef.current || scrollPRef.current > 0.001) return
    if (targetRef.current === target) return
    targetRef.current = target
    startRef.current = performance.now()
    fromRef.current = pRef.current
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick)
  }

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollPRef.current = v
    if (v > 0.001) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      targetRef.current = v
      pRef.current = v
      render(v)
    } else if (!pointerActiveRef.current) {
      targetRef.current = 0
      pRef.current = 0
      render(0)
    }
  })

  useEffect(() => {
    Promise.all(
      layerRefs.current.map(
        (img) =>
          img &&
          (img.decode ? img.decode().catch(() => {}) : new Promise((r) => (img.onload = r))),
      ),
    ).then(() => {
      readyRef.current = true
    })
    render(0)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="animate-[k-float_6s_ease-in-out_infinite]">
      <div
        ref={wrapRef}
        role="img"
        aria-label="Logo Korus"
        tabIndex={0}
        className="relative block h-[clamp(240px,46vw,460px)] w-[clamp(240px,46vw,460px)] cursor-pointer touch-manipulation outline-none [-webkit-tap-highlight-color:transparent] focus-visible:rounded-xl focus-visible:shadow-[0_0_0_3px_rgba(184,108,61,0.55)]"
        onPointerEnter={() => goTo(1)}
        onPointerLeave={() => {
          pointerActiveRef.current = false
          goTo(0)
        }}
        onPointerCancel={() => {
          pointerActiveRef.current = false
          goTo(0)
        }}
        onPointerDown={() => {
          pointerActiveRef.current = true
          goTo(1)
        }}
        onPointerUp={() => {
          pointerActiveRef.current = false
          goTo(0)
        }}
        onFocus={() => goTo(1)}
        onBlur={() => goTo(0)}
      >
        <div ref={stageRef} className="absolute inset-0 origin-[50%_55%] will-change-transform">
          {FRAMES.map((src, i) => (
            <img
              key={src}
              ref={(el) => {
                layerRefs.current[i] = el
              }}
              src={src}
              alt=""
              draggable={false}
              decoding="async"
              fetchPriority={i === 0 ? 'high' : 'low'}
              className="k-frame absolute inset-0 h-full w-full object-contain select-none"
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
