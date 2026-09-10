import { useRef } from 'react'
import bgPapel from '../assets/img/bg-papel.png'
import korusEscrito from '../assets/img/korus-escrito.png'
import seta from '../assets/img/seta.png'
import { HeroCrumpleK } from './HeroCrumpleK'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} className="relative h-[220dvh]">
      <div className="sticky top-0 h-dvh overflow-hidden bg-[#f0ede8]">
        <img
          src={bgPapel}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative flex h-full flex-col items-center justify-center px-6">
          <img
            src={korusEscrito}
            alt="Korus"
            className="absolute left-6 top-6 h-6 w-auto sm:left-10 sm:top-10 sm:h-8"
          />

          <HeroCrumpleK sectionRef={sectionRef} />

          <div className="absolute bottom-10 flex flex-col items-center gap-3 sm:bottom-14">
            <img
              src={seta}
              alt=""
              className="h-8 w-8 animate-[arrow-bounce_2.2s_ease-in-out_infinite] opacity-60 sm:h-10 sm:w-10"
            />
            <span className="font-display text-sm tracking-wide text-brown/70 sm:hidden">
              deslize para baixo
            </span>
            <span className="hidden font-display text-sm tracking-wide text-brown/70 sm:block">
              role a página
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
