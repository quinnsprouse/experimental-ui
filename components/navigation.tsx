'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronRight } from 'lucide-react'

export const SECTIONS = [
  { 
    id: '01', 
    label: 'INTERFACE COMPONENTS',
    subItems: [
      { id: '01', label: 'BUTTONS' },
      { id: '02', label: 'FORMS' },
      { id: '03', label: 'MODALS' },
    ]
  },
  { 
    id: '02', 
    label: 'DATA VISUALIZATION',
    subItems: [
      { id: '01', label: 'HABIT TRACKER' },
      { id: '02', label: 'GRAPHS' },
      { id: '03', label: 'MAPS' },
    ]
  },
  { 
    id: '03', 
    label: 'MOTION EXPERIMENTS',
    subItems: [
      { id: '01', label: 'TRANSITIONS' },
      { id: '02', label: 'ANIMATIONS' },
      { id: '03', label: 'GESTURES' },
    ]
  },
  { 
    id: '04', 
    label: 'TYPOGRAPHY STUDIES',
    subItems: [
      { id: '01', label: 'FONT SCALING' },
      { id: '02', label: 'RESPONSIVE TEXT' },
      { id: '03', label: 'FONT PAIRING' },
    ]
  },
  { 
    id: '05', 
    label: 'INTERACTION PATTERNS',
    subItems: [
      { id: '01', label: 'DRAG AND DROP' },
      { id: '02', label: 'INFINITE SCROLL' },
      { id: '03', label: 'PROGRESSIVE DISCLOSURE' },
    ]
  },
]

interface NavigationProps {
  onSectionChange: (id: string, path: string[]) => void
}

export function Navigation({ onSectionChange }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('01')
  const [expandedSections, setExpandedSections] = useState<string[]>(['01'])

  const handleSectionClick = (id: string) => {
    const section = SECTIONS.find(section => section.id === id)
    if (section && section.subItems.length > 0) {
      const firstSubItem = section.subItems[0]
      const fullId = `${id}-${firstSubItem.id}`
      setActiveSection(fullId)
      onSectionChange(fullId, [section.label, firstSubItem.label])
    }
    
    setExpandedSections(prev => 
      prev.includes(id) ? [] : [id]
    )
  }

  const handleSubItemClick = (mainId: string, subId: string) => {
    const fullId = `${mainId}-${subId}`
    setActiveSection(fullId)
    const mainSection = SECTIONS.find(section => section.id === mainId)
    const subItem = mainSection?.subItems.find(item => item.id === subId)
    onSectionChange(fullId, [mainSection?.label || '', subItem?.label || ''])
  }

  return (
    <nav className="space-y-1 font-mono">
      {SECTIONS.map(({ id, label, subItems }) => (
        <div key={id} className="space-y-1">
          <div
            className={cn(
              "group cursor-pointer p-2 transition-all duration-200 ease-in-out",
              activeSection.startsWith(id) ? "opacity-100" : "opacity-80 hover:opacity-100"
            )}
            onClick={() => handleSectionClick(id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm">{id}</span>
                <span className={cn(
                  "h-px transition-all duration-300",
                  activeSection.startsWith(id)
                    ? "w-8 bg-gradient-to-r from-blue-600 to-blue-400" 
                    : "w-4 group-hover:w-6 bg-gradient-to-r from-blue-600/50 to-blue-400/50"
                )} />
              </div>
              {subItems && (
                expandedSections.includes(id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )
              )}
            </div>
            <div className="mt-1 text-sm">
              {label}
            </div>
          </div>
          {subItems && expandedSections.includes(id) && (
            <div className="ml-6 space-y-1">
              {subItems.map((subItem) => (
                <div
                  key={subItem.id}
                  className={cn(
                    "cursor-pointer p-1 transition-all duration-200 ease-in-out text-xs",
                    activeSection === `${id}-${subItem.id}` ? "text-blue-500" : "text-gray-400 hover:text-gray-200"
                  )}
                  onClick={() => handleSubItemClick(id, subItem.id)}
                >
                  {subItem.id} - {subItem.label}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}

