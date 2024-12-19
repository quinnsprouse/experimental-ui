'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Mon', 'Wed', 'Fri']

interface FocusSession {
  date: Date
  value: number
}

interface Habit {
  name: string
  color: string
  type: 'time' | 'event'
  sessions: FocusSession[]
}

interface HabitChartProps {
  habit: Habit
}

export function HabitChart({ habit }: HabitChartProps) {
  const weeks = useMemo(() => {
    const result: FocusSession[][] = []
    for (let i = 0; i < habit.sessions.length; i += 7) {
      result.push(habit.sessions.slice(i, i + 7))
    }
    return result
  }, [habit.sessions])

  const stats = useMemo(() => {
    const nonZeroSessions = habit.sessions.filter(s => s.value > 0)
    const values = nonZeroSessions.map(s => s.value)
    const average = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0
    const variance = values.length ? values.reduce((a, b) => a + Math.pow(b - average, 2), 0) / values.length : 0
    const stdDev = Math.sqrt(variance)
    
    let streak = 0
    for (let i = habit.sessions.length - 1; i >= 0; i--) {
      if (habit.sessions[i].value > 0) streak++
      else break
    }

    return { streak, average, stdDev }
  }, [habit.sessions])

  const getColor = (value: number) => {
    if (habit.type === 'time') {
      // Create a gradient effect from light to dark
      const hslColor = hexToHSL(habit.color)
      const lightness = Math.max(hslColor.l - (value / 8) * 50, 20) // Ensure minimum lightness of 20%
      return `hsl(${hslColor.h}, ${hslColor.s}%, ${lightness}%)`
    } else {
      return value ? habit.color : `${habit.color}33` // 33 is 20% opacity in hex
    }
  }

  const formatValue = (value: number) => {
    if (habit.type === 'time') {
      return `${value.toFixed(1)} hours`
    } else {
      return value ? 'Completed' : 'Not completed'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold" style={{ color: habit.color }}>
          {habit.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex">
          <div className="w-16" />
          <div className="flex-1 flex justify-between px-1">
            {MONTHS.map(month => (
              <span key={month} className="text-xs text-slate-600">{month}</span>
            ))}
          </div>
        </div>

        <div className="flex">
          <div className="w-16 flex flex-col justify-between pr-4">
            {DAYS.map(day => (
              <span key={day} className="text-xs text-slate-600 h-3 flex items-center">
                {day}
              </span>
            ))}
          </div>

          <motion.div 
            className="flex-1 flex gap-[2px]"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.01,
                },
              },
            }}
          >
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex-1 flex flex-col gap-[2px] min-w-0">
                {week.map((session, dayIndex) => (
                  <TooltipProvider key={dayIndex}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          className="aspect-square rounded-sm cursor-pointer"
                          style={{
                            backgroundColor: getColor(session.value)
                          }}
                          whileHover={{ scale: 1.25, zIndex: 10 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                          variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1 },
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{session.date.toDateString()}</p>
                        <p>{formatValue(session.value)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-4 flex justify-between text-sm">
          <p className="text-slate-600">
            <span className="font-normal">Streak: </span>
            <span className="font-semibold text-slate-800">{stats.streak} days</span>
          </p>
          <p className="text-slate-600">
            <span className="font-normal">Average: </span>
            <span className="font-semibold text-slate-800">
              {habit.type === 'time' ? `${stats.average.toFixed(2)} hours` : `${(stats.average * 100).toFixed(2)}%`}
            </span>
          </p>
          <p className="text-slate-600">
            <span className="font-normal">Std Dev: </span>
            <span className="font-semibold text-slate-800">
              {habit.type === 'time' ? `${stats.stdDev.toFixed(2)} hours` : `${(stats.stdDev * 100).toFixed(2)}%`}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// Helper function to convert hex color to HSL
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '')

  // Parse the r, g, b values
  const r = parseInt(hex.substr(0, 2), 16) / 255
  const g = parseInt(hex.substr(2, 2), 16) / 255
  const b = parseInt(hex.substr(4, 2), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
} 