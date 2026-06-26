import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function DashboardSection() {
    return (
        <section className="py-20 sm:py-28 bg-surface/30  border-b border-[rgba(35,47,53,1)] w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <span className="text-xs uppercase tracking-widest text-brand font-semibold">Dashboard financeiro</span>
                    <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight">
                        Seus números, <span className="text-gradient-brand">finalmente claros.</span>
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Pare de adivinhar quanto entrou e quanto falta. O ORCA mostra suas métricas mais importantes assim que você abre o sistema.
                    </p>
                    <ul className="mt-6 space-y-3">
                        {[
                            "Taxa de aprovação dos seus orçamentos",
                            "Receita total fechada no período",
                            "Valores a receber dos aprovados",
                            "Quantidade de orçamentos emitidos e aprovados",
                        ].map((t) => (
                            <li key={t} className="flex items-start gap-3 text-sm">
                                <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                                <span>{t}</span>
                            </li>
                        ))}
                    </ul>
                    <div className='mt-8 inline-flex items-center '>
                        <motion.button
                            initial={{ scale: 0.96 }}
                            transition={{ duration: 0.15, ease: 'easeIn' }}
                            whileHover={{ y: -2, scale: 1 }}
                            whileTap={{ scale: 1 }}
                            className='mt-8 inline-flex min-w-[250px] flex-1 items-center justify-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-all duration-300 glow-brand hover:bg-[rgba(117,71,209,1)] hover:text-white hover:shadow-[-0.5vh_.5vh_3vh_rgba(80,50,180,1)] sm:w-fit sm:min-w-fit sm:px-5 sm:py-3 sm:text-base'
                        >
                            Criar meu primeiro orçamento grátis
                            <ArrowRight />
                        </motion.button>
                    </div>
                </div>

                <div className="card-glass rounded-2xl p-6">
                    <div className="grid grid-cols-2 gap-3">
                        <BigStat label="Taxa de aprovação" value="71,4%" trend="+12% vs. mês passado" tone="brand" />
                        <BigStat label="Receita do mês" value="R$ 8.420" trend="+R$ 1.240" tone="emerald" />
                        <BigStat label="A receber" value="R$ 3.180" trend="6 orçamentos" tone="amber" />
                        <BigStat label="Emitidos" value="42" trend="28 aprovados" tone="brand" />
                    </div>
                    <div className="mt-4 rounded-xl border border-border bg-surface/60 p-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Receita últimos 6 meses</span>
                            <span className="text-emerald-400">+38%</span>
                        </div>
                        <div className="mt-3 h-32 flex items-end gap-2">
                            {[35, 50, 42, 65, 58, 88].map((h, i) => (
                                <div key={i} className="flex-1 rounded-t-md bg-linear-to-t from-cyan-900 to-brand" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function BigStat({ label, value, trend, tone }) {
    const tones = { brand: "text-brand", emerald: "text-emerald-400", amber: "text-amber-400" };
    return (
        <div className="rounded-xl border border-border bg-surface/60 p-4">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className={`mt-1 text-2xl font-extrabold ${tones[tone]}`}>{value}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{trend}</p>
        </div>
    );
}