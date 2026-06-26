import { motion } from 'framer-motion'
import { ArrowRight, Check, Play, Sparkles } from 'lucide-react'
import imageMockup from '../../assets/images/mockup.png'

const benefits = [
    'Sem cartao',
    'Cancele quando quiser',
    'Login com Google',
]

const HeroSection = () => {
    return (
        <section className='mx-auto flex min-h-dvh w-[90%] flex-wrap place-content-center place-items-center gap-8 py-20'>
            <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className='flex min-w-0 flex-1 basis-[350px] flex-col items-center justify-between text-base max-[420px]:basis-full'
            >
                <motion.span
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.12, duration: 0.45 }}
                    className='mb-4 flex place-content-center place-items-center gap-2 rounded-full border border-[rgba(35,47,53,1)] bg-black/10 px-4 py-1 text-center text-xs text-white/50'
                >
                    <Sparkles className='h-4 text-[rgba(38,178,242,1)]' />
                    14 dias gratis - sem cartao de credito
                </motion.span>

                <h1 className='m-0 max-w-4xl p-0 text-center text-4xl font-extrabold leading-none tracking-normal sm:text-5xl lg:text-[3.5rem]'>
                    Organize seus orcamentos
                    <span className='bg-linear-to-br from-white to-[rgba(38,178,242,1)] bg-clip-text text-transparent'>
                        , controle seus resultados.
                    </span>
                </h1>

                <p className='mx-auto flex max-w-3xl py-10 text-center text-sm leading-7 text-[rgb(170,170,190)] sm:text-base'>
                    Crie orcamentos profissionais em minutos, acompanhe aprovacoes e tenha mais controle sobre o seu faturamento. Tudo em um so lugar, sem planilhas, sem WhatsApp baguncado.
                </p>

                <div className='flex w-full flex-wrap place-content-center gap-x-4 gap-y-8'>
                    <motion.button
                        initial={{ scale: 0.96 }}
                        transition={{ duration: 0.15, ease: 'easeIn' }}
                        whileHover={{ y: -2, scale: 1 }}
                        whileTap={{ scale: 1 }}
                        className='min-w-[250px] flex-1 rounded-full bg-cyan-400 text-[1.1em] shadow-[-0.5vh_1vh_2rem_rgba(100,180,255,0.2)] transition-colors duration-300 hover:bg-[rgba(117,71,209,1)] hover:text-white hover:shadow-[-0.5vh_.5vh_3vh_rgba(80,50,180,1)] sm:w-fit'
                    >
                        Criar meu primiero orcamento gratis
                        <ArrowRight />
                    </motion.button>
                    <motion.button
                        initial={{ scale: 0.96 }}
                        transition={{ duration: 0.15, ease: 'easeIn' }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 1 }}
                        className='min-w-[250px] flex-1 rounded-full bg-transparent text-[1.1em] text-white transition-colors duration-300 hover:text-white hover:shadow-none hover:drop-shadow-[-0.5vh_.5vh_3vh_rgba(80,50,180,1)] sm:min-w-fit sm:flex-none'
                    >
                        <Play />
                        Ver demonstracao
                    </motion.button>
                </div>

                <div className='flex flex-wrap justify-center gap-4 py-8'>
                    {benefits.map((benefit, index) => (
                        <motion.span
                            key={benefit}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 + index * 0.08 }}
                            className='flex items-center justify-center gap-3 text-xs text-white/60'
                        >
                            <Check className='h-[1.5em] text-[rgba(38,178,242,1)]' />
                            {benefit}
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.92 }}
                animate={{
                    opacity: 1,
                    y: [0, -10, 0, 10, 0],
                    x: [0, -8, 0, 8, 0],
                    scale: 0.9,
                    boxShadow: [
                        '-0.5vh 0.5vh 8em rgba(33,61,80,1)',
                        '-0.5vh 0.5vh 3em rgba(33,61,80,1)',
                        '-0.5vh 0.5vh 8em rgba(33,61,80,1)',
                    ],
                }}
                transition={{
                    opacity: { duration: 0.7, delay: 0.15 },
                    y: { duration: 15, repeat: Infinity, ease: 'linear' },
                    x: { duration: 15, repeat: Infinity, ease: 'linear' },
                    boxShadow: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className='flex h-fit min-w-0 flex-1 basis-[300px] overflow-hidden rounded-3xl bg-black/30 max-[420px]:basis-full'
            >
                <img className='w-full' src={imageMockup} alt='' />
            </motion.div>
        </section>
    )
}

export default HeroSection
