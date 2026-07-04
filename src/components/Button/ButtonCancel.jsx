import { motion } from 'framer-motion'

export const ButtonCancel = ({ children, ...rest }) => {
    return (
        <motion.button
            {...rest}
            initial={{ scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeIn' }}
            whileHover={{ y: -2, scale: 1 }}
            whileTap={{ scale: 1 }}
            className='
                        flex-1
                        border-2
                        border-destructive/60
                        rounded-full
                        text-destructive
                        font-semibold
                        px-4
                        py-2
                        hover:bg-destructive/60 
                        hover:text-white
                        hover:inset-shadow-[-0.2vh_0.2vh_1vh_black]
                        transition-all
                        '
        >
            {children}
        </motion.button>
    )
}
