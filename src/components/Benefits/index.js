import React from "react";
import { motion } from "framer-motion";
import { Clock, FolderOpen, BarChart3, History, Award, Smartphone } from "lucide-react";
import { SectionHeader } from '../../pages/Login';

const BENEFITS = [
    {
        icon: Clock,
        title: "Economia de tempo",
        description: "Crie orçamentos completos em poucos minutos. Duplique, edite e envie sem retrabalho.",
        stat: "80%",
        statLabel: "menos tempo",
    },
    {
        icon: FolderOpen,
        title: "Tudo organizado",
        description: "Todos os seus orçamentos, clientes e serviços em um único lugar acessível.",
        stat: "1",
        statLabel: "lugar central",
    },
    {
        icon: BarChart3,
        title: "Controle financeiro",
        description: "Saiba quanto faturou, quanto tem a receber e qual sua taxa de aprovação.",
        stat: "100%",
        statLabel: "visibilidade",
    },
    {
        icon: History,
        title: "Histórico completo",
        description: "Nunca mais perca um orçamento. Acesse qualquer informação do passado em segundos.",
        stat: "∞",
        statLabel: "registros",
    },
    {
        icon: Award,
        title: "Mais profissionalismo",
        description: "PDFs padronizados e profissionais que impressionam seus clientes.",
        stat: "PDF",
        statLabel: "profissional",
    },
    {
        icon: Smartphone,
        title: "Acesso de qualquer lugar",
        description: "Na obra, no escritório ou em casa. Funciona no celular, tablet e computador.",
        stat: "24/7",
        statLabel: "disponível",
    },
];

export default function BenefitsSection() {
    return (
        <section className="py-20 md:py-32 relative" id="recursos">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <SectionHeader
                        eyebrow='A transformacao'
                        title='Da bagunca ao controle, em poucos dias'
                        subtitle='Deixe de ser refém de planilhas e mensagens. Tenha o controle total do seu negócio.'
                    />
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BENEFITS.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="group relative p-6 rounded-xl border border-cyan-500/10 bg-gradient-to-b from-cyan-500/[0.03] to-transparent hover:border-cyan-500/20 hover:from-cyan-500/[0.06] transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                    <benefit.icon className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-cyan-400">{benefit.stat}</span>
                                    <p className="text-[10px] text-steel uppercase tracking-wider">{benefit.statLabel}</p>
                                </div>
                            </div>
                            <h3 className="text-base font-semibold text-arctic mb-2">{benefit.title}</h3>
                            <p className="text-sm text-steel leading-relaxed">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}