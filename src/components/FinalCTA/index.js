import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
    return (
        <section className="py-20 sm:py-28">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <div className="relative overflow-hidden rounded-3xl border border-brand/30 bg-linear-to-br from-brand/15 via-surface to-background p-10 sm:p-16 text-center">
                    <div className="absolute inset-0 bg-grid opacity-20 mask-[radial-gradient(50%_50%_at_50%_50%,black,transparent)]" />
                    <div className="relative">
                        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                            Pare de perder tempo <br className="hidden sm:block" />
                            <span className="text-gradient-brand">organizando orçamentos.</span>
                        </h2>
                        <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">
                            Assuma o controle dos seus orçamentos e mergulhe nos resultados. Comece grátis hoje, leva menos de 1 minuto.
                        </p>
                        <motion.a
                            href="#precos"
                            whileHover={{ y: -2, scale: 1 }}
                            whileTap={{ scale: 1 }}
                            className='mt-8 inline-flex min-w-[250px] flex-1 items-center justify-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-all duration-300 glow-brand hover:bg-[rgba(117,71,209,1)] hover:text-white hover:shadow-[-0.5vh_.5vh_3vh_rgba(80,50,180,1)] sm:w-fit sm:min-w-fit sm:px-5 sm:py-3 sm:text-base'
                        >
                            Criar meu primeiro orçamento grátis <ArrowRight className="h-5 w-5" />
                        </motion.a>
                        <p className="mt-4 text-xs text-muted-foreground">14 dias grátis · Sem cartão · Cancele quando quiser</p>
                    </div>
                </div>
            </div>
        </section>
    );
}