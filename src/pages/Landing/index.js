import { motion } from 'framer-motion'
import { ArrowRight, Menu } from 'lucide-react'
import { useState } from 'react'
import logoUrl from '../../assets/images/logo.svg'
import BenefitsSection from '../../components/Benefits'
import { Button } from '../../components/Button'
import { ComparisonSection } from '../../components/Comparison'
import { DashboardSection } from '../../components/DashboardSection'
import { FAQSection } from '../../components/FAQ'
import FeaturesSection from '../../components/Features'
import { FinalCTA } from '../../components/FinalCTA'
import { Footer } from '../../components/Footer'
import HeroSection from '../../components/HeroSection'
import HowItWorks from '../../components/HowItWorks'
import PainsSection from '../../components/Pains'
import { PricingSection } from '../../components/Pricing'
import { RoadmapSection } from '../../components/Roadmap'
import { scrollToId } from '../../utils/random'

export function SectionHeader({ eyebrow, title, subtitle }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className='mx-auto flex max-w-3xl flex-col flex-wrap gap-4 text-center'
        >
            <span className='text-sm font-bold uppercase tracking-[0.075em] text-brand'>{eyebrow}</span>
            <h2 className='text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.9rem]'>{title}</h2>
            <p className='mx-auto max-w-188 leading-6 text-muted-foreground'>{subtitle}</p>
        </motion.div>
    )
}

function Header() {
    const [open, setOpen] = useState(false);
    const links = [
        { id: "recursos", label: "Recursos" },
        { id: "como-funciona", label: "Como funciona" },
        { id: "precos", label: "Preços" },
        { id: "faq", label: "FAQ" },
    ];
    return (
        <>
            <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background-70 text backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                    <button onClick={() => scrollToId('top')} className="flex items-center gap-2">
                        <img src={logoUrl} alt="ORCA logo" className="h-8 w-8" />
                        <span className="text-lg font-extrabold tracking-tight">ORCA</span>
                    </button>
                    <nav className="hidden md:flex items-center gap-8">
                        {links.map((l) => (
                            <button key={l.href} onClick={() => scrollToId(l.id)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</button>
                        ))}
                    </nav>
                    <div className="hidden md:flex items-center gap-3">
                        <button onClick={() => scrollToId('login')} className="text-sm text-muted-foreground hover:text-foreground">Entrar</button>
                        <motion.button
                            onClick={() => scrollToId('precos')}
                            initial={{ scale: 0.96 }}
                            transition={{ duration: 0.15, ease: 'easeIn' }}
                            whileHover={{ y: -2, scale: 1 }}
                            whileTap={{ scale: 1 }}
                            className=' inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-all duration-300 glow-brand hover:bg-[rgba(117,71,209,1)] hover:text-white hover:shadow-[-0.5vh_.5vh_3vh_rgba(80,50,180,1)] sm:w-fit sm:min-w-fit sm:text-base'
                        >
                            Começar grátis <ArrowRight className="h-4 w-4" />
                        </motion.button>
                    </div>
                    <button onClick={() => setOpen(!open)} className="md:hidden grid place-items-center h-10 w-10 rounded-lg bg-surface border border-border" aria-label="Menu">
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
                {open && (
                    <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
                        <div className="px-4 py-4 flex flex-col gap-3">
                            {links.map((l) => (
                                <button key={l.href}
                                    onClick={() => {
                                        scrollToId(l.id)
                                        setOpen(false)
                                    }}
                                    className="
                                text-sm
                                text-muted-foreground
                                hover:text-foreground
                                py-1.5
                                "
                                >
                                    {l.label}
                                </button>
                            ))}
                            <Button.Secondary>
                                Entrar
                            </Button.Secondary>
                            <motion.button
                                onClick={scrollToId("precos")}
                                whileHover={{ y: -2, scale: 1 }}
                                whileTap={{ scale: 1 }}
                                className="mt-2 inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground text-center transition-all duration-300 hover:opacity-90 glow-brand"
                            >
                                Começar grátis
                            </motion.button>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
export default function Landing() {
    return (
        <div className='absolute min-h-dvh w-full bg-[radial-gradient(circle,rgba(38,178,242,0.3)_0%,transparent_60%)] bg-size-[100%_150%] bg-position-[0_200%] bg-no-repeat bg-fixed text-white before:fixed before:inset-0 before:-z-10 before:bg-black/30'>
            <Header />
            <HeroSection />
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className='mx-auto flex w-full justify-center border-y border-border bg-surface/30 px-4 py-12 text-center text-xs uppercase leading-6 tracking-[0.08em] text-muted-foreground'
            >
                Usado por autonomos, MEIs, marcenarias, serralherias, comunicacao visual e assistencias tecnicas
            </motion.div>

            <PainsSection />
            <BenefitsSection />
            <HowItWorks />
            <DashboardSection />
            <ComparisonSection />
            <FeaturesSection />
            <RoadmapSection />
            <PricingSection />

            <FAQSection />
            <FinalCTA />
            <Footer />
        </div>
    )
}
