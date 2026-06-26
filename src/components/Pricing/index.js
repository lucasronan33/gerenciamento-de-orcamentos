import { useState } from 'react';
import { SectionHeader } from '../../pages/Login';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion'

export function PricingSection() {
    const [annual, setAnnual] = useState(true);
    const monthlyPrice = "34,90";
    const annualPrice = "348,90";
    const annualMonthly = "29,08";
    return (
        <section id="precos" className="py-20 sm:py-28  border-b border-[rgba(35,47,53,1)] w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeader
                    eyebrow="Planos"
                    title="Comece grátis. Pague quando valer a pena."
                    subtitle="14 dias de teste, sem cartão. Cancele quando quiser."
                />

                <div className="mt-8 flex items-center justify-center gap-3">
                    <span className={`text-sm ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Mensal</span>
                    <button
                        onClick={() => setAnnual(!annual)}
                        className="relative h-7 w-12 rounded-full bg-surface-2 border border-border px-9"
                        aria-label="Alternar plano"
                    >
                        <span className={`absolute h-5 w-5 rounded-full bg-brand transition-all ${annual ? "translate-x-full" : "-translate-x-full"}`} />
                    </button>
                    <span className={`text-sm ${annual ? "text-foreground" : "text-muted-foreground"}`}>
                        Anual <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-brand/20 text-brand font-semibold">economize 17%</span>
                    </span>
                </div>

                <div className="mt-10 grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    <div className="rounded-2xl border border-border bg-surface/60 p-8">
                        <p className="text-sm font-semibold text-muted-foreground">Mensal</p>
                        <div className="mt-3 flex items-baseline gap-1">
                            <span className="text-5xl font-extrabold">R$ {monthlyPrice}</span>
                            <span className="text-muted-foreground">/mês</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">Flexibilidade total, sem compromisso anual.</p>
                        <div className='mt-8 w-full inline-flex items-center '>
                            <motion.button
                                initial={{ scale: 0.96 }}
                                transition={{ duration: 0.15, ease: 'easeIn' }}
                                whileHover={{ y: -2, scale: 1 }}
                                whileTap={{ scale: 1 }}
                                className='w-full flex-1 rounded-full text-sm text-white border border-border bg-black/30 transition-colors duration-300'
                            >
                                Começar grátis
                            </motion.button>
                        </div>
                        <PlanFeatures />
                    </div>

                    <div className="relative rounded-2xl border-2 border-brand bg-linear-to-b from-cyan-950 to-transparent p-8 glow-brand">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand text-brand-foreground text-[11px] font-bold uppercase tracking-wider">
                            Mais popular
                        </span>
                        <p className="text-sm font-semibold text-brand">Anual</p>
                        <div className="mt-3 flex items-baseline gap-1">
                            <span className="text-5xl font-extrabold">R$ {annual ? annualMonthly : annualPrice}</span>
                            <span className="text-muted-foreground">{annual ? "/mês" : "/ano"}</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                            R$ {annualPrice}/ano · economize cerca de R$ 70 por ano
                        </p>
                        <div className='mt-8 w-full inline-flex items-center '>
                            <motion.button
                                initial={{ scale: 0.96 }}
                                transition={{ duration: 0.15, ease: 'easeIn' }}
                                whileHover={{ y: -2, scale: 1 }}
                                whileTap={{ scale: 1 }}
                                className='min-w-[250px] flex-1 rounded-full bg-cyan-400 text-sm shadow-[-0.5vh_1vh_2rem_rgba(100,180,255,0.2)] transition-colors duration-300 hover:bg-[rgba(117,71,209,1)] hover:text-white hover:shadow-[-0.5vh_.5vh_3vh_rgba(80,50,180,1)] sm:w-fit'
                            >
                                Criar meu primiero orcamento gratis
                                <ArrowRight />
                            </motion.button>
                        </div>
                        <PlanFeatures highlight />
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                    Sem cartão de crédito. Sem fidelidade. Cancele quando quiser.
                </p>
            </div>
        </section>
    );
}

function PlanFeatures({ highlight = false }) {
    const items = [
        "Orçamentos ilimitados",
        "Clientes ilimitados",
        "Geração de PDF profissional",
        "Dashboard financeiro completo",
        "Duplicação e busca de orçamentos",
        "Login com Google",
        "Acesso em qualquer dispositivo",
        "Suporte por e-mail",
    ];
    return (
        <ul className="mt-6 space-y-2.5">
            {items.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className={`h-4 w-4 shrink-0 mt-0.5 ${highlight ? "text-brand" : "text-foreground"}`} />
                    {i}
                </li>
            ))}
        </ul>
    );
}