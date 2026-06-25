import { motion } from 'framer-motion'
import { BarChart3, Clock, FileSpreadsheet, MessageSquareText, NotebookPen, XCircle } from 'lucide-react'
import { SectionHeader } from '../../pages/Login'

const pains = [
    { icon: <MessageSquareText />, title: 'Orcamentos perdidos', desc: 'Conversas de WhatsApp engolem propostas e clientes somem sem retorno.' },
    { icon: <FileSpreadsheet />, title: 'Planilhas desorganizadas', desc: 'Excel fora de controle, formulas quebradas e arquivos duplicados.' },
    { icon: <NotebookPen />, title: 'Papel e agenda', desc: 'Anotacoes soltas, rasuras e zero historico do que foi enviado.' },
    { icon: <Clock />, title: 'Tempo desperdicado', desc: 'Voce gasta horas refazendo o mesmo orcamento toda semana.' },
    { icon: <XCircle />, title: 'Falta de acompanhamento', desc: 'Sem saber quem aprovou, recusou ou esta esperando resposta.' },
    { icon: <BarChart3 />, title: 'Sem visao financeira', desc: 'Quanto voce tem a receber? Quanto fechou esse mes? Dificil saber.' },
]

const PainsSection = () => {
    return (
        <section className='w-full border-b border-[rgba(35,47,53,1)] bg-black/5 py-20'>
            <div className='mx-auto flex w-[90%] flex-col items-center justify-center gap-8'>
                <SectionHeader
                    eyebrow='O problema'
                    title='Voce reconhece essa rotina?'
                    subtitle='A maioria dos prestadores de servico gerencia orcamentos com ferramentas que nao foram feitas para isso. O resultado e previsivel.'
                />
                <div className='grid w-full max-w-6xl grid-cols-1 justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {pains.map((p, index) => (
                        <motion.article
                            key={p.title}
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            whileHover={{ y: -2 }}
                            className='flex min-h-16 flex-col gap-2 self-stretch rounded-2xl border border-[rgba(35,47,53,1)] bg-gradient-to-b from-[rgba(15,25,35,0.8)] to-[rgba(5,15,25,0.5)] p-8 transition duration-300 hover:border-[rgba(255,70,70,0.5)]'
                        >
                            <div className='flex w-fit rounded-xl bg-[rgba(255,70,70,0.2)] p-2 text-[rgba(255,70,70,1)]'>
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

export default PainsSection
