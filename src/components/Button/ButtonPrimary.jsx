import { motion } from 'framer-motion'

export default function ButtonPrimary({ children, ...rest }) {
    return (
        <motion.button
            {...rest}
            initial={{ scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeIn' }}
            whileHover={{ y: -2, scale: 1 }}
            whileTap={{ scale: 1 }}
            className=' 
                        inline-flex 
                        w-full
                        flex-1 
                        items-center 
                        justify-center 
                        gap-2 
                        rounded-full 
                        bg-brand 
                        px-4 
                        py-2 
                        text-sm 
                        font-semibold 
                        text-brand-foreground 
                        transition-all 
                        duration-300 
                        glow-brand 
                        hover:bg-[rgba(117,71,209,1)] 
                        hover:text-white 
                        hover:shadow-[-0.5vh_.5vh_3vh_rgba(80,50,180,1)] 
                        sm:w-fit 
                        sm:min-w-fit 
                        sm:text-base
                        '
        >
            {children}
        </motion.button>
    )
}
