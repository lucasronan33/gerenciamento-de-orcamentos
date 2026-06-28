

export const Landing = () => {
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
    );
};
