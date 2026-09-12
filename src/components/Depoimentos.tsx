import { motion } from 'framer-motion'
import bgPapel from '../assets/img/bg-papel.png'
import depoimentoDash from '../assets/img/depoimento-dash.png'
import depoimentoSite1 from '../assets/img/depoimento-site-1.png'
import depoimentoSite2 from '../assets/img/depoimento-site-2.png'
import { AudioPlayer } from './AudioPlayer'

type Print = {
  tipo: 'print'
  nome: string
  categoria: string
  imagem: string
}

type Audio = {
  tipo: 'audio'
  nome: string
  categoria: string
  resumo: string
  src: string
}

const depoimentos: (Print | Audio)[] = [
  {
    tipo: 'print',
    nome: 'Cliente',
    categoria: 'Dashboard',
    imagem: depoimentoDash,
  },
  {
    tipo: 'audio',
    nome: 'Marcus',
    categoria: 'Dashboard',
    resumo: 'Rapaz, não sabia que tinha ficado tão bom, ainda mais depois que...',
    src: '/audio/marcus.ogg',
  },
  {
    tipo: 'print',
    nome: 'Cliente',
    categoria: 'Site',
    imagem: depoimentoSite1,
  },
  {
    tipo: 'audio',
    nome: 'Bruna',
    categoria: 'Site',
    resumo: 'Parei para ver aqui agora, ficou um arraso, e vocês tinham razão, ficou melhor com...',
    src: '/audio/bruna.ogg',
  },
  {
    tipo: 'print',
    nome: 'Cliente',
    categoria: 'Site',
    imagem: depoimentoSite2,
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

function CategoriaTag({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-orange/10 px-2.5 py-1 font-sans text-[11px] font-medium uppercase tracking-wide text-orange-deep">
      {children}
    </span>
  )
}

export function Depoimentos() {
  return (
    <section
      id="depoimentos"
      className="px-6 py-24 sm:py-32"
      style={{
        backgroundImage: `url(${bgPapel})`,
        backgroundRepeat: 'repeat',
        backgroundPosition: 'top center',
        backgroundColor: '#f0ede8',
      }}
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <span className="font-display text-sm tracking-[0.2em] text-orange">
            depoimentos
          </span>
          <h2 className="mt-3 font-display text-4xl leading-tight text-brown sm:text-5xl">
            Prova real do nosso trabalho.
          </h2>
          <p className="mt-4 font-sans text-brown/60">
            Print de conversa, áudio sem edição. Não é case bonito, é o que os clientes mandaram
            assim que viram o resultado.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid"
        >
          {depoimentos.map((d, i) => (
            <motion.div
              key={i}
              variants={item}
              className="overflow-hidden rounded-2xl border border-brown/10 bg-white/60 shadow-sm shadow-brown/5 transition-shadow duration-300 hover:shadow-md hover:shadow-brown/10"
            >
              <div className="flex items-center justify-between p-5 pb-3">
                <span className="font-display text-sm text-brown">{d.nome}</span>
                <CategoriaTag>{d.categoria}</CategoriaTag>
              </div>

              {d.tipo === 'print' ? (
                <img src={d.imagem} alt={`Print de conversa — ${d.categoria}`} className="block w-full" />
              ) : (
                <div className="p-5 pt-0">
                  <AudioPlayer src={d.src} />
                  <p className="mt-3 font-sans text-sm italic text-brown/50">"{d.resumo}"</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
