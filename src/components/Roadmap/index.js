import { motion } from 'framer-motion'
import { Layout, MessageCircle, Rocket, Zap } from 'lucide-react'

const ROADMAP = [
    { icon: MessageCircle, title: 'WhatsApp integrado', desc: 'Envie orçamentos direto pelo WhatsApp.', status: 'Em breve' },
    { icon: Zap, title: 'Automacoes', desc: 'Follow-ups automaticos e notificacoes inteligentes.', status: 'Planejado' },
    { icon: Layout, title: 'CRM integrado', desc: 'Gestao completa de relacionamento com clientes.', status: 'Futuro' },
    { icon: Rocket, title: 'ERP completo', desc: 'Estoque, notas fiscais e gestao financeira avancada.', status: 'Futuro' },
]

export function RoadmapSection() {
    return (
        <section className='w-full relative border-b border-[rgba(35,47,53,1)] py-20 md:py-32'>
            <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='mb-12 text-center'
                >
                    <span className='text-sm font-bold uppercase tracking-widest text-[rgba(38,178,242,1)]'>Roadmap</span>
                    <h2 className='mb-4 mt-4 text-3xl font-extrabold text-white md:text-4xl'>
                        Estamos só começando
                    </h2>
                    <p className='mx-auto max-w-xl text-lg leading-7 text-[rgba(230,230,255,0.6)]'>
                        O ORCA evolui junto com seu negócio. Novas funcionalidades sendo desenvolvidas para impulsionar ainda mais o seu negocio.
                    </p>
                </motion.div>

                <div className='space-y-4'>
                    {ROADMAP.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ x: 6 }}
                            className='flex flex-col gap-4 rounded-2xl border border-[rgba(35,47,53,1)] bg-white/[0.02] p-5 transition-all hover:border-[rgba(38,178,242,0.5)] hover:bg-white/[0.04] sm:flex-row sm:items-center'
                        >
                            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(38,178,242,0.12)]'>
                                <item.icon className='h-5 w-5 text-[rgba(38,178,242,1)]' />
                            </div>
                            <div className='min-w-0 flex-1'>
                                <h3 className='text-base font-semibold text-white'>{item.title}</h3>
                                <p className='text-sm text-[rgba(230,230,255,0.6)]'>{item.desc}</p>
                            </div>
                            <span className='w-fit shrink-0 rounded-full bg-[rgba(38,178,242,0.12)] px-3 py-1 text-xs font-semibold text-[rgba(38,178,242,1)]'>
                                {item.status}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
