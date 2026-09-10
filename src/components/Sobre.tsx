import { motion } from 'framer-motion'
import bgPapel from '../assets/img/bg-papel.png'
import korusRelevo from '../assets/img/korus-relevo.png'

const WHATSAPP_NUMBER = '5561984525692'
const WHATSAPP_MESSAGE = 'Olá! Quero solicitar um orçamento com a Korus.'
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

export function Sobre() {
  return (
    <section
      id="sobre"
      className="px-6 py-24 sm:py-32"
      style={{
        backgroundImage: `url(${bgPapel})`,
        backgroundRepeat: 'repeat',
        backgroundPosition: 'top center',
        backgroundColor: '#f0ede8',
      }}
    >
      <div className="mx-auto grid max-w-5xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          variants={fadeUp}
        >
          <h2 className="font-display text-4xl leading-tight text-brown sm:text-5xl">
            Tecnologia sob medida.
          </h2>
          <p className="mt-4 font-sans text-lg italic text-brown/80">
            para negócios que não cabem em sistema pronto
          </p>
          <p className="mt-6 max-w-md font-sans text-brown/90">
            A Korus constrói dashboards, sites e automações a partir da rotina real do seu
            negócio. Clínicas, escritórios e pequenas empresas.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-orange-deep px-6 py-3 font-display text-sm text-paper shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange hover:shadow-lg hover:shadow-orange/30 active:translate-y-0"
            >
              Solicitar orçamento
            </a>
            <a
              href="#o-que-fazemos"
              className="rounded-full border border-brown/40 px-6 py-3 font-display text-sm text-brown transition-all duration-300 hover:-translate-y-0.5 hover:border-brown hover:bg-brown/5 active:translate-y-0"
            >
              Ver o que fazemos
            </a>
          </div>

          <p className="mt-8 max-w-sm font-sans text-sm text-brown/60">
            Aquele papel amassando ali em cima levou o mesmo cuidado que o seu projeto vai
            levar.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          variants={fadeUp}
          className="group [perspective:1200px]"
        >
          <div className="overflow-hidden rounded-2xl shadow-xl shadow-brown/15 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:[transform:rotateX(2deg)_rotateY(-2deg)]">
            <img src={korusRelevo} alt="Logo Korus em relevo sobre papel" className="block w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
