'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { HabitChart } from './HabitChart'

export function InterfaceComponent() {
  return (
    <div className="space-y-4">
      <Button 
        className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
      >
        Hover Me
      </Button>
    </div>
  )
}

export function DataVisualization() {
  const deepFocusHabit = {
    name: 'Deep Focus',
    color: '#4ade80',
    type: 'time' as const,
    sessions: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000),
      value: Math.random() * 8
    }))
  }

  return (
    <div className="p-8">
      <HabitChart habit={deepFocusHabit} />
    </div>
  )
}

export function MotionExperiment() {
  return (
    <motion.div
      className="w-16 h-16 bg-purple-500"
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"]
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1
      }}
    />
  )
}

export function TypographyStudy() {
  return (
    <div className="space-y-4">
      <p className="text-xs">Extra Small</p>
      <p className="text-sm">Small</p>
      <p className="text-base">Base</p>
      <p className="text-lg">Large</p>
      <p className="text-xl">Extra Large</p>
      <p className="text-2xl">2X Large</p>
    </div>
  )
}

export function InteractionPattern() {
  const [count, setCount] = useState(0)
  return (
    <div className="flex items-center gap-4">
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
      <span className="text-2xl">{count}</span>
    </div>
  )
}

