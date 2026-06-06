import Image from "next/image"
import Link from "next/link"
import { BattleButton } from "@/components/ui/battle-button"
import { ArenaCard } from "@/components/arena/ArenaCard"
import { Trophy, Target, Users, Zap, Coins } from "lucide-react"

export default function Home() {
  const stats = [
    { label: "Total Prize Pools", value: "$124,500", icon: Trophy, color: "text-gold" },
    { label: "Active Challenges", value: "42", icon: Target, color: "text-primary" },
    { label: "Roasts Submitted", value: "8,921", icon: Zap, color: "text-battle-orange" },
    { label: "USDC Paid Out", value: "$98,200", icon: Coins, color: "text-secondary" },
  ]

  const arenas = [
    {
      id: "1",
      bossName: "Nischal Shetty",
      bossAvatar: "https://picsum.photos/seed/boss1/400/400",
      projectName: "WazirX / Shardeum",
      projectLogo: "https://picsum.photos/seed/proj1/200/200",
      prompt: "Roast founders who think 'we are still early' is a valid excuse for a broken UI.",
      prizePool: "1,500",
      timeLeft: "14:22:05",
      participants: 124,
      difficulty: "Savage" as const
    },
    {
      id: "2",
      bossName: "Sandeep Nailwal",
      bossAvatar: "https://picsum.photos/seed/boss2/400/400",
      projectName: "Polygon",
      projectLogo: "https://picsum.photos/seed/proj2/200/200",
      prompt: "Roast developers who copy-paste entire smart contracts from StackOverflow without reading.",
      prizePool: "2,000",
      timeLeft: "08:45:12",
      participants: 256,
      difficulty: "Elite" as const
    },
    {
      id: "3",
      bossName: "The AI Overlord",
      bossAvatar: "https://picsum.photos/seed/boss3/400/400",
      projectName: "RoastArena Core",
      projectLogo: "https://picsum.photos/seed/proj3/200/200",
      prompt: "Roast users who think an AI judge can't detect a low-effort ChatGPT roast.",
      prizePool: "500",
      timeLeft: "48:00:00",
      participants: 12,
      difficulty: "Beginner" as const
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center font-black italic text-xl -rotate-12 shadow-[0_0_15px_rgba(188,19,254,0.5)]">R</div>
          <span className="font-headline font-black text-2xl tracking-tighter uppercase italic">Roast<span className="text-primary">Arena</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-muted-foreground">
          <Link href="#arenas" className="hover:text-primary transition-colors">Arenas</Link>
          <Link href="#" className="hover:text-primary transition-colors">Leaderboard</Link>
          <Link href="#" className="hover:text-primary transition-colors">Hall of Fame</Link>
        </div>
        <div className="flex items-center gap-4">
          <BattleButton variant="outline" size="sm" className="hidden sm:flex">CONNECT WALLET</BattleButton>
          <Link href="#arenas">
            <BattleButton variant="primary" size="sm">ENTER ARENA</BattleButton>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://picsum.photos/seed/arena-bg/1920/1080')] bg-cover bg-center grayscale pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/0 via-background/80 to-background pointer-events-none" />
        
        <div className="relative z-20 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-primary/30 text-primary text-xs font-black tracking-widest uppercase animate-float">
            <Zap className="w-4 h-4 fill-primary" /> Season 1: Genesis Battle
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.9]">
            Roast. <span className="text-primary neon-text">Compete.</span> <br /> 
            <span className="text-secondary neon-text">Earn.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-medium">
            Founders fund challenges. Creators submit roasts. <br className="hidden md:block" />
            AI judges the winners. Earn USDC for making the internet laugh.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link href="#arenas" className="w-full sm:w-auto">
              <BattleButton variant="primary" size="lg" className="w-full text-xl italic" glowing>
                ENTER ARENA
              </BattleButton>
            </Link>
            <BattleButton variant="outline" size="lg" className="w-full sm:w-auto text-xl italic border-secondary text-secondary hover:bg-secondary/10 hover:border-secondary">
              CREATE CHALLENGE
            </BattleButton>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-16">
            {stats.map((stat, i) => (
              <div key={i} className="glass p-6 rounded-xl border-white/5 space-y-2 group hover:border-primary/30 transition-all">
                <div className="flex items-center justify-center gap-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</span>
                </div>
                <div className="text-3xl font-black tracking-tighter">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Arenas */}
      <section id="arenas" className="py-20 px-6 max-w-7xl mx-auto w-full space-y-12 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-primary pl-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic">Active <span className="text-primary">Arenas</span></h2>
            <p className="text-muted-foreground font-medium">Current boss battles with open prize pools.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
            <span className="text-primary">Live Now</span>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {arenas.map((arena) => (
            <ArenaCard key={arena.id} {...arena} />
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Link href="#arenas" className="w-full max-w-md">
            <BattleButton variant="outline" className="w-full uppercase tracking-[0.3em] text-xs py-8">
              View All Current Battles
            </BattleButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center font-black italic text-lg -rotate-12">R</div>
            <span className="font-headline font-black text-xl tracking-tighter uppercase italic">Roast<span className="text-primary">Arena</span></span>
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            © 2024 RoastArena. Built for the savages of the internet.
          </div>
          <div className="flex gap-6">
            {['Twitter', 'Discord', 'Docs'].map(item => (
              <a key={item} href="#" className="text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
