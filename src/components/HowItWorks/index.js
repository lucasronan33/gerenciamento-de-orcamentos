import React from "react";
import { motion } from "framer-motion";
import { Users, FileText, Send, TrendingUp } from "lucide-react";

const STEPS = [
    {
        icon: Users,
        step: "01",
        title: "Cadastre seus clientes",
        description: "Adicione seus clientes uma vez e reutilize em todos os orçamentos futuros.",
    },
    {
        icon: FileText,
        step: "02",
        title: "Crie seu orçamento",
        description: "Monte orçamentos completos com produtos, serviços e valores em poucos minutos.",
    },
    {
        icon: Send,
        step: "03",
        title: "Envie o PDF",
        description: "Gere um PDF profissional e padronizado para enviar ao seu cliente.",
    },
    {
        icon: TrendingUp,
        step: "04",
        title: "Acompanhe resultados",
        description: "Controle status, aprovações e indicadores financeiros no dashboard.",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-20 md:py-32 relative border-b border-[rgba(35,47,53,1)] w-full" id="como-funciona">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-medium text-cyan-400 uppercase tracking-widest">Como funciona</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-arctic mt-4 mb-4">
                        4 passos para orçamentos sob controle
                    </h2>
                    <p className="text-steel text-lg max-w-2xl mx-auto">
                        Do cadastro ao acompanhamento. Tudo simples, rápido e sem complicação.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-4 gap-6 md:gap-4">
                    {STEPS.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="relative"
                        >
                            {/* Connector line */}
                            {i < 3 && (
                                <div className="hidden md:block absolute top-10 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px bg-linear-to-r from-cyan-500/30 to-cyan-500/5" />
                            )}

                            <div className="text-center">
                                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 mb-6">
                                    <step.icon className="w-8 h-8 text-cyan-400" />
                                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-cyan-500 text-void text-xs font-bold flex items-center justify-center">
                                        {step.step}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-arctic mb-2">{step.title}</h3>
                                <p className="text-sm text-[rgba(230,230,255,0.6)] leading-relaxed max-w-60 mx-auto">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}