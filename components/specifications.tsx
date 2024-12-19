'use client'

import { useState, useEffect } from 'react'
import { TextScramble } from './text-scramble'

interface SpecificationsProps {
  activeSection: string
}

const COMPONENT_INFO = {
  '01': {
    title: 'INTERFACE COMPONENTS',
    description: 'EXPLORE VARIOUS UI COMPONENTS THAT FORM THE BUILDING BLOCKS OF MODERN WEB INTERFACES.',
    subItems: {
      '01': {
        title: 'BUTTONS',
        description: 'A COMPREHENSIVE COLLECTION OF BUTTON COMPONENTS WITH VARIOUS STATES, ANIMATIONS, AND INTERACTION PATTERNS. INCLUDES HOVER EFFECTS, LOADING STATES, AND ICON INTEGRATIONS.',
        specs: {
          VARIANTS: 'PRIMARY, SECONDARY, GHOST',
          STATES: 'HOVER, FOCUS, DISABLED, LOADING',
          ANIMATIONS: 'SPRING-BASED FEEDBACK',
          ACCESSIBILITY: 'ARIA-COMPLIANT'
        }
      },
      '02': {
        title: 'FORMS',
        description: 'ADVANCED FORM COMPONENTS WITH BUILT-IN VALIDATION, ERROR HANDLING, AND REAL-TIME FEEDBACK. FEATURES CUSTOM INPUT FIELDS, DROPDOWNS, AND COMPLEX FORM LAYOUTS.',
        specs: {
          VALIDATION: 'REACT-HOOK-FORM',
          FEEDBACK: 'REAL-TIME ERROR STATES',
          ACCESSIBILITY: 'WAIR-ARIA 1.2',
          COMPONENTS: 'INPUT, SELECT, CHECKBOX, RADIO'
        }
      },
      '03': {
        title: 'MODALS',
        description: 'FLEXIBLE MODAL SYSTEM WITH CUSTOMIZABLE TRANSITIONS, NESTED DIALOG SUPPORT, AND KEYBOARD NAVIGATION. INCLUDES VARIOUS PRESETS FOR COMMON USE CASES.',
        specs: {
          ANIMATION: 'FRAMER MOTION',
          BACKDROP: 'BLUR EFFECT',
          ACCESSIBILITY: 'FOCUS TRAP',
          VARIANTS: 'ALERT, FORM, SIDE PANEL'
        }
      }
    }
  },
  '02': {
    title: 'DATA VISUALIZATION',
    description: 'DISCOVER DIFFERENT WAYS TO REPRESENT COMPLEX DATA VISUALLY.',
    subItems: {
      '01': {
        title: 'HABIT TRACKER',
        description: 'AN INTERACTIVE VISUALIZATION FOR TRACKING DAILY HABITS AND ROUTINES. FEATURES A HEATMAP-STYLE CALENDAR WITH CUSTOMIZABLE COLOR SCHEMES AND TOOLTIPS.',
        specs: {
          FRAMEWORK: 'REACT + FRAMER MOTION',
          VISUALIZATION: 'CUSTOM SVG GRID',
          INTERACTIONS: 'HOVER TOOLTIPS',
          DATA: 'TIME-SERIES FORMAT'
        }
      },
      '02': {
        title: 'GRAPHS',
        description: 'DYNAMIC GRAPH COMPONENTS FOR VISUALIZING RELATIONSHIPS AND TRENDS IN DATA. SUPPORTS VARIOUS CHART TYPES WITH INTERACTIVE ELEMENTS AND ANIMATIONS.',
        specs: {
          LIBRARY: 'D3.JS',
          TYPES: 'LINE, BAR, SCATTER',
          ANIMATIONS: 'ENTER/EXIT/UPDATE',
          RESPONSIVENESS: 'FLUID SCALING'
        }
      },
      '03': {
        title: 'MAPS',
        description: 'INTERACTIVE MAPPING COMPONENTS WITH SUPPORT FOR VARIOUS DATA OVERLAYS AND GEOGRAPHIC VISUALIZATIONS. INCLUDES ZOOMING, PANNING, AND CUSTOM MARKERS.',
        specs: {
          LIBRARY: 'MAPBOX GL',
          FEATURES: 'CLUSTERING, HEATMAPS',
          DATA: 'GEOJSON FORMAT',
          PERFORMANCE: 'WEBGL RENDERING'
        }
      }
    }
  },
  '03': {
    title: 'MOTION EXPERIMENTS',
    description: 'EXPLORE THE WORLD OF WEB ANIMATIONS AND TRANSITIONS.',
    subItems: {
      '01': {
        title: 'TRANSITIONS',
        description: 'SMOOTH PAGE AND COMPONENT TRANSITIONS USING VARIOUS ANIMATION TECHNIQUES. INCLUDES ROUTE CHANGES, COMPONENT MOUNTING, AND STATE UPDATES.',
        specs: {
          LIBRARY: 'FRAMER MOTION',
          TYPES: 'FADE, SLIDE, SCALE',
          TIMING: 'SPRING PHYSICS',
          PERFORMANCE: 'GPU ACCELERATED'
        }
      },
      '02': {
        title: 'ANIMATIONS',
        description: 'COMPLEX ANIMATION SEQUENCES AND INTERACTIVE MOTION GRAPHICS. FEATURES KEYFRAME ANIMATIONS, PATH FOLLOWING, AND PHYSICS-BASED MOVEMENTS.',
        specs: {
          ENGINE: 'FRAMER MOTION',
          PHYSICS: 'SPRING SIMULATION',
          CONTROL: 'GESTURE BASED',
          OPTIMIZATION: 'RAF THROTTLING'
        }
      },
      '03': {
        title: 'GESTURES',
        description: 'ADVANCED GESTURE RECOGNITION AND INTERACTION PATTERNS. SUPPORTS DRAG, SWIPE, PINCH, AND MULTI-TOUCH GESTURES WITH VISUAL FEEDBACK.',
        specs: {
          DETECTION: 'PAN-RESPONDER',
          GESTURES: 'DRAG, PINCH, ROTATE',
          FEEDBACK: 'HAPTIC + VISUAL',
          PLATFORM: 'CROSS-DEVICE'
        }
      }
    }
  },
  '04': {
    title: 'TYPOGRAPHY STUDIES',
    description: 'DELVE INTO THE ART AND SCIENCE OF DIGITAL TYPOGRAPHY.',
    subItems: {
      '01': {
        title: 'FONT SCALING',
        description: 'IMPLEMENTATION OF MODULAR SCALE TYPOGRAPHY WITH DYNAMIC SIZING AND RESPONSIVE ADJUSTMENTS. ENSURES CONSISTENT VISUAL HIERARCHY ACROSS VIEWPORTS.',
        specs: {
          SCALE: 'MODULAR RATIO 1.25',
          BASE: 'FLUID REM UNITS',
          BREAKPOINTS: 'CUSTOM SCALING',
          FALLBACKS: 'SYSTEM FONTS'
        }
      },
      '02': {
        title: 'RESPONSIVE TEXT',
        description: 'ADVANCED RESPONSIVE TYPOGRAPHY TECHNIQUES INCLUDING FLUID SIZING, CONTAINER QUERIES, AND VIEWPORT-BASED ADJUSTMENTS.',
        specs: {
          SCALING: 'FLUID TYPOGRAPHY',
          UNITS: 'CLAMP FUNCTION',
          QUERIES: 'CONTAINER BASED',
          PERFORMANCE: 'NO LAYOUT SHIFT'
        }
      },
      '03': {
        title: 'FONT PAIRING',
        description: 'CURATED FONT COMBINATIONS WITH EMPHASIS ON READABILITY, CONTRAST, AND VISUAL HARMONY. INCLUDES PERFORMANCE OPTIMIZATION TECHNIQUES.',
        specs: {
          COMBINATIONS: 'TESTED PAIRS',
          LOADING: 'FONT SUBSETTING',
          FALLBACK: 'METRIC MATCHING',
          OPTIMIZATION: 'PRELOAD HINTS'
        }
      }
    }
  },
  '05': {
    title: 'INTERACTION PATTERNS',
    description: 'EXAMINE ADVANCED INTERACTION PATTERNS THAT ENHANCE USER EXPERIENCE.',
    subItems: {
      '01': {
        title: 'DRAG AND DROP',
        description: 'FLEXIBLE DRAG AND DROP SYSTEM WITH SUPPORT FOR SORTING, REORDERING, AND CROSS-LIST OPERATIONS. INCLUDES TOUCH SUPPORT AND ANIMATION FEEDBACK.',
        specs: {
          LIBRARY: 'REACT DND',
          FEATURES: 'SORT, REORDER',
          FEEDBACK: 'GHOST PREVIEW',
          SUPPORT: 'TOUCH + MOUSE'
        }
      },
      '02': {
        title: 'INFINITE SCROLL',
        description: 'OPTIMIZED INFINITE SCROLLING IMPLEMENTATION WITH VIRTUAL LIST RENDERING AND DATA PREFETCHING. HANDLES LARGE DATASETS EFFICIENTLY.',
        specs: {
          VIRTUALIZATION: 'REACT WINDOW',
          LOADING: 'INTERSECTION OBSERVER',
          CACHING: 'QUERY PREFETCH',
          PERFORMANCE: 'WINDOWED RENDERING'
        }
      },
      '03': {
        title: 'PROGRESSIVE DISCLOSURE',
        description: 'SMART CONTENT REVELATION PATTERNS THAT REDUCE COGNITIVE LOAD AND IMPROVE USER FOCUS. INCLUDES VARIOUS DISCLOSURE MECHANISMS.',
        specs: {
          PATTERNS: 'ACCORDION, STEPPER',
          ANIMATION: 'HEIGHT TRANSITIONS',
          MEMORY: 'STATE PERSISTENCE',
          ACCESSIBILITY: 'ARIA EXPANDED'
        }
      }
    }
  }
}

export function Specifications({ activeSection }: SpecificationsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [triggerScramble, setTriggerScramble] = useState(false)
  const [mainId, subId] = activeSection.split('-')
  const mainInfo = COMPONENT_INFO[mainId as keyof typeof COMPONENT_INFO]
  const subInfo = subId ? mainInfo?.subItems[subId as keyof typeof mainInfo.subItems] : null
  const info = subInfo || mainInfo

  useEffect(() => {
    setTriggerScramble(true)
    const timer = setTimeout(() => setTriggerScramble(false), 100)
    return () => clearTimeout(timer)
  }, [activeSection])

  if (!info) return null

  return (
    <div className="font-mono space-y-8">
      <div className="space-y-4">
        <div>
          <div className="text-xs opacity-70">{mainInfo.title}</div>
          <TextScramble 
            className="text-lg font-bold mt-1" 
            trigger={triggerScramble}
          >
            {info.title}
          </TextScramble>
        </div>
        <div className="space-y-2">
          <p className="text-sm opacity-80 inline">
            {isExpanded ? info.description : `${info.description.slice(0, 100)}...`}
          </p>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-500 hover:underline ml-1 inline-block"
          >
            {isExpanded ? 'VIEW LESS' : 'VIEW MORE'}
          </button>
        </div>
      </div>

      {subInfo && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">SPECIFICATIONS</h3>
          {Object.entries(subInfo.specs).map(([key, value]) => (
            <div key={key} className="grid grid-cols-[120px_1fr] gap-4 text-sm">
              <span className="opacity-70">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

