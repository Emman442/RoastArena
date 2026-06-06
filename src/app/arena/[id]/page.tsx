import Image from "next/image"
import { ArenaBattle } from "@/components/arena/ArenaBattle"
import { BattleButton } from "@/components/ui/battle-button"
import { Timer, Users, Trophy, ChevronLeft, Share2, Info } from "lucide-react"
import Link from "next/link"

export default function ArenaDetailPage({ params }: { params: { id: string } }) {
  // Mock data for the specific arena
  const arenaData = {
    id: params.id,
    bossName: "Nischal Shetty",
    bossAvatar: "https://picsum.photos/seed/boss1/400/400",
    projectName: "WazirX / Shardeum",
    projectLogo: "https://picsum.photos/seed/proj1/200/200",
    title: "The 'Still Early' Survival Challenge",
    prompt: "Roast founders who think 'we are still early' is a valid excuse for a broken UI.",
    prizePool: "1,500",
    timeLeft: "14:22:05",
    participants: 124,
    description: "Founders often hide behind the 'Alpha' or 'Beta' tag to ship subpar experiences. It's time to bring them back to reality. Be funny, be sharp, but most importantly, be accurate about the pain points of 'early' crypto products.",
    difficulty: "Savage",
    judgeCriteria: [
      "Technical Accuracy",
      "Humor Impact",
      "Creative Narrative",
      "Savagery Index"
    ]
  }

  return (
    <div className="min-h-screen flex flex-col pt-24">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto w-full px-6 mb-8 flex items-center justify-between">
        <Link href="/" passHref>
          <BattleButton variant="ghost" size="sm" className="flex items-center gap-2 group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO ARENAS
          </BattleButton>
        </Link>
        <BattleButton variant="outline" size="sm" className="flex items-center gap-2">
          <Share2 className="w-4 h-4" /> SHARE ARENA
        </BattleButton>
      </div>

      {/* Arena Header */}
      <section className="max-w-7xl mx-auto w-full px-6 mb-12">
        <div className="glass p-8 md:p-12 rounded-2xl border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            {/* Boss Profile */}
            <div className="flex flex-col items-center gap-4 shrink-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-primary/40 overflow-hidden rotate-3 shadow-[0_0_30px_rgba(188,19,254,0.2)]">
                <Image src={arenaData.bossAvatar} alt={arenaData.bossName} fill className="object-cover" />
              </div>
              <div className="text-center">
                <span className="text-[10px] font-black uppercase text-primary tracking-[0.3em]">Arena Boss</span>
                <h2 className="text-xl font-black uppercase tracking-tighter italic">{arenaData.bossName}</h2>
                <span className="text-xs text-secondary font-bold">{arenaData.projectName}</span>
              </div>
            </div>

            {/* Challenge Info */}
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-battle-red text-white text-[10px] font-black uppercase tracking-widest rounded-sm">{arenaData.difficulty} BATTLE</span>
                  <span className="px-3 py-1 glass border-secondary/50 text-secondary text-[10px] font-black uppercase tracking-widest rounded-sm">USDC REWARDS</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">{arenaData.title}</h1>
              </div>

              <div className="bg-black/40 p-6 rounded-xl border border-white/5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-widest">
                  <Info className="w-4 h-4" /> Mission Objective
                </div>
                <p className="text-muted-foreground font-medium leading-relaxed italic">
                  "{arenaData.prompt}"
                </p>
                <p className="text-sm text-muted-foreground/80 leading-relaxed font-medium">
                  {arenaData.description}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-gold" /> Total Pool
                  </span>
                  <div className="text-2xl font-black text-gold leading-none">{arenaData.prizePool} USDC</div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-1">
                    <Timer className="w-3 h-3 text-battle-red" /> Battle Ends
                  </span>
                  <div className="text-2xl font-black text-battle-red leading-none">{arenaData.timeLeft}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-1">
                    <Users className="w-3 h-3 text-secondary" /> Contenders
                  </span>
                  <div className="text-2xl font-black leading-none">{arenaData.participants}</div>
                </div>
                <div className="space-y-1 hidden md:block">
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-1">
                    <Zap className="w-3 h-3 text-primary" /> Multiplier
                  </span>
                  <div className="text-2xl font-black text-primary leading-none">1.5x XP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Battle Component */}
      <ArenaBattle 
        challengeId={arenaData.id}
        bossName={arenaData.bossName}
        challengePrompt={arenaData.prompt}
        prizePool={arenaData.prizePool}
      />
    </div>
  )
}
