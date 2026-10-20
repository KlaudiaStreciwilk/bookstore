'use client'

import { Fragment } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { gentleSpring } from '@/components/motion/springs'

const firstLine = ['Znajdź', 'historie,']
const secondLine = ['które', 'zostają.']

function Words({ words, variants }: { words: string[]; variants: Variants }) {
  return words.map((word, index) => (
    <Fragment key={word}>
      {index > 0 && ' '}
      <motion.span className="hero-word" variants={variants}>{word}</motion.span>
    </Fragment>
  ))
}

// The hero h1, revealed word by word on page load.
export function HeroHeadline() {
  const reduceMotion = useReducedMotion()
  const word: Variants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: '0.45em' },
    visible: { opacity: 1, y: 0, transition: gentleSpring },
  }

  return (
    <motion.h1
      id="hero-title"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.09, delayChildren: 0.1 } } }}
    >
      <Words words={firstLine} variants={word} /><br /><em><Words words={secondLine} variants={word} /></em>
    </motion.h1>
  )
}
