import { motion } from 'framer-motion'
import { Check, CheckCircle2, X, XCircle } from 'lucide-react'
import { SectionHeader } from '../../pages/Landing'

const before = [
    'Conversas de orçamento perdidas no WhatsApp',
    'Planilhas Excel quebradas e duplicadas',
    'Anotacoes em papel e agenda',
    'Sem historico de quem aprovou ou recusou',
    'Horas refazendo o mesmo orçamento',
    'PDFs improvisados, sem identidade',
]

const after = [
    'Todos os orçamentos num unico lugar, pesquisaveis',
    'Cadastro de clientes e itens reutilizaveis',
    'Geracao de PDF profissional em 1 clique',
    'Status claro: rascunho, enviado, aprovado, recusado',
    'Duplique orçamentos antigos em segundos',
    'Dashboard financeiro sempre atualizado',
]

export const ComparisonSection = () => {
    return (
        <section className='w-full border-b border-[rgba(35,47,53,1)]'>
            <div className='mx-auto flex flex-col items-center justify-center gap-10 px-4 py-20 pb-24'>
                <SectionHeader
                    eyebrow='Antes vs. depois'
                    title='Metodo tradicional vs. ORCA'
                    subtitle='A diferenca que faz para sua semana, seu caixa e sua tranquilidade.'
                />
                <div className='flex w-full max-w-5xl flex-col justify-center gap-6 lg:flex-row'>
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className='min-w-0 flex-1 rounded-3xl border border-[rgba(255,70,70,0.5)] bg-[rgba(255,70,70,0.05)] p-8 text-[rgba(255,70,70,1)] sm:min-w-[320px]'
                    >
                        <div className='flex items-center gap-2 pb-6 font-bold'>
                            <XCircle /> Sem ORCA
                        </div>
                        <ul className='flex flex-col justify-center gap-4'>
                            {before.map((b) => (
                                <li key={b} className='flex w-full items-start gap-2'>
                                    <X className='mt-0.5 shrink-0 scale-75' />
                                    <p className='text-[rgba(230,230,255,0.6)]'>{b}</p>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                        className='min-w-0 flex-1 rounded-3xl border border-[rgba(0,210,255,0.5)] bg-[rgba(0,210,255,0.1)] p-8 text-[rgba(0,210,255,1)] shadow-[0_0_2vw_rgba(0,210,255,0.5)] sm:min-w-[320px]'
                    >
                        <div className='flex items-center gap-2 pb-6 font-bold'>
                            <CheckCircle2 /> Com ORCA
                        </div>
                        <ul className='flex flex-col justify-center gap-4'>
                            {after.map((a) => (
                                <li key={a} className='flex w-full items-start gap-2'>
                                    <Check className='mt-0.5 shrink-0 scale-75' />
                                    <p className='text-white'>{a}</p>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
