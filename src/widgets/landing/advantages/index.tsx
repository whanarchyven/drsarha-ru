import React from 'react';
import { motion } from 'framer-motion';

const Advantages = () => {
  return (
    <div className="md:h-[150vh] h-[45rem] flex justify-center items-center relative">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        className="w-1/2 absolute left-5 mt-10 transition-transform duration-300">
        <img
          src={'/images/landing/advantage1.png'}
          alt="Advantage 1"
          className="w-full h-auto"
        />
      </motion.div>
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
        className="w-1/2 absolute right-5 transition-transform duration-300">
        <img
          src={'/images/landing/advantage2.png'}
          alt="Advantage 2"
          className="w-full h-auto"
        />
      </motion.div>
    </div>
  );
};

export default Advantages;
