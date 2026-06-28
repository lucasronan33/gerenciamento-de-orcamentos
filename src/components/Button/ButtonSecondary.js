import { motion } from 'framer-motion'

export const ButtonSecondary = ({ children, ...rest }) => {
    return (
        <motion.button
            {...rest}
            initial={{ scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeIn' }}
            whileHover={{ y: -2, scale: 1 }}
            whileTap={{ scale: 1 }}
            className='
            inline-flex 
            min-w-62.5 
            flex-1 
            items-center 
            justify-center 
            gap-2 
            rounded-full 
            bg-transparent 
            px-4 
            py-2 
            text-sm 
            font-semibold 
            text-white 
            transition-all 
            duration-300 
            hover:text-white 
            hover:shadow-none 
            hover:drop-shadow-[-0.5vh_.5vh_3vh_rgba(80,50,180,1)] 
            sm:min-w-fit 
            sm:flex-none 
            sm:px-5 
            sm:py-3 
            sm:text-base
            '
        >
            {children}
        </motion.button>
    )
}
