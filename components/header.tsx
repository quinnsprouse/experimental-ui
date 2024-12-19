import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <header className="border-b bg-background dark:bg-black">
      <div className="max-w-[1600px] mx-auto px-8 h-16 flex items-center justify-between bg-background dark:bg-black">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-mono text-sm hover:text-blue-600 transition-colors">
            EXP-01
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/experiments" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Experiments
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
} 