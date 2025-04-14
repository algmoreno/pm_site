import { motion } from 'framer-motion';
import { staggerContainer, slideIn, fadeIn } from '@/lib/motion'

const SectionWrapper = (Component, idName) => 
  function hoc(){
    return (
      <motion.section variants={fadeIn()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: .25 }}
        className={`max-w-7xl z-0 m-[none]`}>
        <Component/>
      </motion.section>
    )
}

export default SectionWrapper
