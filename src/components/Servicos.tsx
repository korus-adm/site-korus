import { motion } from 'framer-motion'
import { useState } from 'react'
import automacaoBitrix from '../assets/img/card-automacoes.png'
import automacaoMake from '../assets/img/automacao-make.png'
import dash1 from '../assets/img/dash-1.jpg'
import dash3 from '../assets/img/dash-3.jpg'
import dash4 from '../assets/img/dash-4.jpg'
import dash5 from '../assets/img/dash-5.jpg'
import dashAnuncios from '../assets/img/dash-anuncios.png'
import site1 from '../assets/img/site-1.jpg'
import siteIpac from '../assets/img/site-ipac.png'
import { Lightbox } from './Lightbox'

type Servico = {
  numero: string
  titulo: string
  descricao: string
  galeria: string[]
}

const servicos: Servico[] = [
  {
    numero: '01',
    titulo: 'Dashboards',
    descricao:
      'Números que fazem sentido, atualizados em tempo real e conectados direto na sua operação.',
    galeria: [dash1, dashAnuncios, dash3, dash4, dash5],
  },
  {
    numero: '02',
    titulo: 'Automações',
    descricao:
      'Fluxos que trabalham por você, ligando WhatsApp, CRM e agendamentos sem esforço manual.',
    galeria: [automacaoBitrix, automacaoMake],
  },
  {
    numero: '03',
    titulo: 'Sites',
    descricao:
      'Presença digital com identidade própria: rápida, responsiva e pensada para converter.',
    galeria: [site1, siteIpac],
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function Servicos() {
  const [aberto, setAberto] = useState<number | null>(null)

  return (
    <section
      id="o-que-fazemos"
      className="relative overflow-hidden bg-ink px-6 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-orange/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-56 right-0 h-[36rem] w-[36rem] rounded-full bg-brown/30 blur-[160px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <span className="font-display text-sm tracking-[0.2em] text-orange">
            o que fazemos
          </span>
          <h2 className="mt-3 font-display text-4xl leading-tight text-paper sm:text-5xl">
            Três frentes, um só padrão.
          </h2>
          <p className="mt-4 font-sans text-paper/60">
            Cada projeto Korus nasce da rotina real do negócio — não de um template genérico.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {servicos.map((s, i) => (
            <motion.button
              type="button"
              key={s.titulo}
              variants={cardVariant}
              onClick={() => setAberto(i)}
              className="group relative overflow-hidden rounded-2xl border border-paper/10 bg-ink-light text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-orange/40 hover:shadow-[0_0_40px_-10px_rgba(184,108,61,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                <img
                  src={s.galeria[0]}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-light via-ink-light/10 to-transparent" />

                <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 font-sans text-xs text-paper opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 15l4.5-4.5a2 2 0 0 1 2.8 0L15 15" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="15.5" cy="9.5" r="1.5" />
                  </svg>
                  ver {s.galeria.length} fotos
                </span>
              </div>

              <div className="relative p-6">
                <span className="font-display text-sm text-orange">{s.numero}</span>
                <h3 className="mt-2 font-display text-2xl text-paper">{s.titulo}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-paper/60">
                  {s.descricao}
                </p>
              </div>

              <div className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-orange/60 transition-transform duration-500 group-hover:scale-x-100" />
            </motion.button>
          ))}
        </motion.div>
      </div>

      {aberto !== null && (
        <Lightbox
          titulo={servicos[aberto].titulo}
          imagens={servicos[aberto].galeria}
          startIndex={0}
          onClose={() => setAberto(null)}
        />
      )}
    </section>
  )
}
