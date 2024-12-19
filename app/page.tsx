'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Specifications } from '@/components/specifications'
import { DotPattern } from '@/components/dot-pattern'
import {
  InterfaceComponent,
  DataVisualization,
  MotionExperiment,
  TypographyStudy,
  InteractionPattern
} from '@/components/experimental-components'
import { ChevronRight } from 'lucide-react'

const COMPONENTS = {
  '01': InterfaceComponent,
  '02': DataVisualization,
  '03': MotionExperiment,
  '04': TypographyStudy,
  '05': InteractionPattern,
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('01')
  const [breadcrumbs, setBreadcrumbs] = useState(['INTERFACE COMPONENTS'])

  const ActiveComponent = COMPONENTS[activeSection.split('-')[0] as keyof typeof COMPONENTS]

  const handleSectionChange = (id: string, path: string[]) => {
    setActiveSection(id)
    setBreadcrumbs(path)
  }

  return (
    <div className="p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_300px] gap-12">
          <Navigation onSectionChange={handleSectionChange} />
          <div className="flex flex-col gap-8">
            <div className="font-mono text-sm flex items-center">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-600" />}
                  <span className={index === breadcrumbs.length - 1 ? "text-blue-600" : "text-gray-600"}>
                    {crumb}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 min-h-[400px] flex items-center relative">
              <DotPattern />
              <div className="relative z-10 w-full">
                <ActiveComponent />
              </div>
            </div>
          </div>
          <Specifications activeSection={activeSection} />
        </div>
      </div>
    </div>
  )
}

