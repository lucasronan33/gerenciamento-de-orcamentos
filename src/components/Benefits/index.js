import { motion } from 'framer-motion'
import { FileText, Shield, Smartphone, Sparkles, TrendingUp, Zap } from 'lucide-react'
import { SectionHeader } from '../../pages/Login'

const benefits = [
    { icon: <Zap />, title: 'Economize horas toda semana', desc: 'Modelos prontos, duplicacao em 1 clique e geracao de PDF instantanea.' },
    { icon: <Shield />, title: 'Tudo organizado em um so lugar', desc: 'Clientes, itens, orcamentos e historico - pesquisaveis a qualquer momento.' },
    { icon: <TrendingUp />, title: 'Controle financeiro de verdade', desc: 'Veja receita, valores a receber e taxa de aprovacao em tempo real.' },
    { icon: <FileText />, title: 'Historico completo', desc: 'Nunca mais perca um orcamento. Tudo registrado com data e status.' },
    { icon: <Sparkles />, title: 'Mais profissionalismo', desc: 'PDFs com sua identidade que transmitem confianca e fecham mais.' },
    { icon: <Smartphone />, title: 'Acesse de qualquer lugar', desc: 'Plataforma 100% responsiva: notebook, tablet ou celular.' },
]

const BenefitsSection = () => {
    return (
        <section className='w-full border-b border-[rgba(35,47,53,1)] bg-black/5 py-20'>
            <div className='mx-auto flex w-[90%] flex-col items-center justify-center gap-8'>
                <SectionHeader
                    eyebrow='A transformacao'
                    title='Da bagunca ao controle, em poucos dias'
                    subtitle='O ORCA foi feito para pequenos negocios e prestadores que precisam de organizacao sem burocracia.'
                />
                <div className='grid w-full max-w-6xl grid-cols-1 justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {benefits.map((p, index) => (
                        <motion.article
                            key={p.title}
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            whileHover={{ y: -2 }}
                            className='flex min-h-16 flex-col gap-2 self-stretch rounded-2xl border border-[rgba(35,47,53,1)] bg-gradient-to-b from-[rgba(15,25,35,0.8)] to-[rgba(5,15,25,0.5)] p-8 transition duration-300 hover:border-[rgba(0,210,255,0.5)]'
                        >
                            <div className='flex w-fit rounded-xl bg-[rgba(0,210,255,0.2)] p-2 text-[rgba(0,210,255,1)]'>
                                {p.icon}
                            </div>
                            <h3 className='pt-3 text-lg font-bold'>{p.title}</h3>
                            <p className='text-sm text-[rgba(230,230,255,0.6)]'>{p.desc}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BenefitsSection
