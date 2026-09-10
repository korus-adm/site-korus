import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type LightboxProps = {
  titulo: string
  imagens: string[]
  startIndex: number
  onClose: () => void
}

export function Lightbox({ titulo, imagens, startIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex)

  const prev = () => setIndex((i) => (i - 1 + imagens.length) % imagens.length)
  const next = () => setIndex((i) => (i + 1) % imagens.length)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-10 backdrop-blur-sm"
        onClick={onClose}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 text-paper/80 transition-colors hover:border-orange hover:text-orange"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        {imagens.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-paper/20 text-paper/80 transition-colors hover:border-orange hover:text-orange sm:left-6"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Próxima foto"
              className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-paper/20 text-paper/80 transition-colors hover:border-orange hover:text-orange sm:right-6"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}

        <div
          className="flex max-h-full max-w-5xl flex-col items-center gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.img
            key={index}
            src={imagens[index]}
            alt={`${titulo} — foto ${index + 1} de ${imagens.length}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[75vh] w-auto rounded-lg object-contain shadow-2xl"
          />

          <div className="flex items-center gap-3 font-sans text-sm text-paper/60">
            <span className="font-display text-paper">{titulo}</span>
            {imagens.length > 1 && (
              <span>
                {index + 1} / {imagens.length}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
