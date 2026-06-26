import { motion } from 'framer-motion';
import { BarChart3, Clock, FileSpreadsheet, MessageSquareText, NotebookPen, XCircle } from 'lucide-react';
import { SectionHeader } from '../../pages/Login';

const PAINS = [
    {
        icon: MessageSquareText,
        title: "Orçamentos espalhados",
        description: "No WhatsApp, no papel, na agenda... você nunca sabe onde está o último orçamento enviado.",
    },
    {
        icon: NotebookPen,
        title: "Falta de controle",
        description: "Anotacoes soltas, rasuras e zero historico do que foi enviado.",
    },
    {
        icon: FileSpreadsheet,
        title: "Planilhas desorganizadas",
        description: "Excel que ninguém entende, fórmulas quebradas e informações desatualizadas.",
    },
    {
        icon: XCircle,
        title: "Sem acompanhamento",
        description: "Enviou o orçamento e esqueceu. Sem saber quem aprovou, recusou ou esta esperando resposta.",
    },
    {
        icon: Clock,
        title: "Tempo desperdiçado",
        description: "Horas perdidas refazendo orçamentos, procurando dados ou digitando tudo de novo.",
    },
    {
        icon: BarChart3,
        title: 'Sem visao financeira',
        description: 'Quanto voce tem a receber? Quanto fechou esse mes? Dificil saber.'
    },
];
const PainsSection = () => {
    return (
        <section className='w-full border-b border-[rgba(35,47,53,1)] bg-black/5 py-20'>
            <div className='mx-auto flex w-[90%] flex-col items-center justify-center gap-8'>
                <SectionHeader
                    eyebrow='O problema'
                    title='Voce reconhece essa rotina?'
                    subtitle='A maioria dos prestadores de servico gerencia orçamentos com ferramentas que nao foram feitas para isso. O resultado e previsivel.'
                />
                <div className='grid w-full max-w-6xl grid-cols-1 justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {PAINS.map((pain, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="group relative p-6 rounded-xl border border-red-500/10 bg-linear-to-b from-red-500/[0.03] to-transparent hover:border-red-500/20 hover:from-red-500/[0.06] transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-lg bg-[rgba(255,70,70,0.2)] flex items-center justify-center">
                                    <pain.icon className="w-5 h-5 text-[rgba(255,70,70,1)]" />
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-[rgba(255,70,70,1)]">{pain.stat}</span>
                                    <p className="text-[10px] text-steel uppercase tracking-wider">{pain.statLabel}</p>
                                </div>
                            </div>
                            <h3 className="pt-3 text-lg font-bold">{pain.title}</h3>
                            <p className="text-sm text-[rgba(230,230,255,0.6)]">{pain.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PainsSection
