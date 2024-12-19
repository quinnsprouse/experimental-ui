import { Card } from '@/components/ui/card'

const PROJECTS = {
  '01': [
    {
      title: 'Dynamic Navigation',
      description: 'Experimental navigation patterns with smooth transitions',
      specs: 'React + Framer Motion'
    },
    {
      title: 'Modal Dialogs',
      description: 'Accessible and animated modal components',
      specs: 'React + React Aria'
    },
    {
      title: 'Form Controls',
      description: 'Custom form inputs with advanced validation',
      specs: 'React Hook Form + Zod'
    }
  ],
  '02': [
    {
      title: 'Data Flow',
      description: 'Interactive data visualization components',
      specs: 'D3.js + React'
    },
    {
      title: 'Chart Library',
      description: 'Reusable and customizable chart components',
      specs: 'Recharts + TypeScript'
    },
    {
      title: 'Real-time Dashboard',
      description: 'Live updating data visualization dashboard',
      specs: 'React + WebSocket'
    }
  ],
  '03': [
    {
      title: 'Micro-interactions',
      description: 'Small, delightful animation details',
      specs: 'CSS Animations + React Spring'
    },
    {
      title: 'Page Transitions',
      description: 'Smooth transitions between routes',
      specs: 'Framer Motion + Next.js'
    },
    {
      title: 'Gesture-based UI',
      description: 'Interface elements controlled by user gestures',
      specs: 'React UseGesture'
    }
  ],
  '04': [
    {
      title: 'Typography System',
      description: 'Modular scale and responsive type experiments',
      specs: 'CSS Variables + Tailwind'
    },
    {
      title: 'Dynamic Font Loading',
      description: 'Optimized font loading strategies',
      specs: 'Next.js Font Optimization'
    },
    {
      title: 'Text Animations',
      description: 'Creative text reveal and transition effects',
      specs: 'GSAP + React'
    }
  ],
  '05': [
    {
      title: 'Drag and Drop',
      description: 'Intuitive drag and drop interface components',
      specs: 'react-beautiful-dnd'
    },
    {
      title: 'Infinite Scroll',
      description: 'Efficient infinite scrolling implementation',
      specs: 'React Query + Intersection Observer'
    },
    {
      title: 'Multi-step Forms',
      description: 'User-friendly multi-step form process',
      specs: 'React Hook Form + Zod'
    }
  ]
}

export function ProjectGrid({ activeSection }: { activeSection: string }) {
  const projects = PROJECTS[activeSection as keyof typeof PROJECTS] || []

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <Card key={i} className="p-4 bg-white/5 hover:bg-white/10 transition-colors border-white/10">
          <div className="font-mono space-y-4">
            <div className="text-xs opacity-50">PROJECT_{(i + 1).toString().padStart(2, '0')}</div>
            <div className="space-y-2">
              <h3 className="font-bold">{project.title}</h3>
              <p className="text-sm opacity-70">{project.description}</p>
            </div>
            <div className="text-xs">{project.specs}</div>
          </div>
        </Card>
      ))}
    </div>
  )
}

