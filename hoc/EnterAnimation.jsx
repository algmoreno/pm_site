import { staggerContainer, slideIn, fadeIn } from '@/lib/motion'
import * as motion from "motion/react-client";

const EnterAnimation = (Component, idName) => 
  function hoc(){
    return (
      <motion.div
      className="mx-auto mt-auto mb-20 max-sm:mt-20"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0 },
      }}>
        <Component/>
      </motion.div>
    )
}

export default EnterAnimation
