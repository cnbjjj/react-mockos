import { motion as m } from 'framer-motion'

function AnimPage({ children, page: Page, variants = {
    init: {
        opacity: 0,
        scale: 0.5
    },
    final: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0,
            ease: "easeInOut",
            duration: 0.25
        }
    },
    exit: {
        scale: 0,
        transition: {
            delay: 0,
            ease: "easeInOut",
            duration: 0.25
        }
    }
} }) {
    return (
        <m.div
            variants={variants}
            initial="init"
            animate="final"
            exit="exit"
            className=''
        >
            <Page />
        </m.div >
    )
}

export default AnimPage;