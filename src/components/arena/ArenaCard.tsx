import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BattleButton } from "@/components/ui/battle-button"
import { Timer, Users, Trophy, Cpu } from "lucide-react"
import Link from "next/link"

interface ArenaCardProps {
  id: string
  bossName: string
  bossAvatar: string
  projectName: string
  projectLogo: string
  prompt: string
  prizePool: string
  timeLeft: string
  participants: number
  difficulty: 'Beginner' | 'Elite' | 'Savage'
}

export function ArenaCard({
  id,
  bossName,
  bossAvatar,
  projectName,
  projectLogo,
  prompt,
  prizePool,
  timeLeft,
  participants,
  difficulty
}: ArenaCardProps) {
  const difficultyColor = {
    Beginner: "bg-blue-500",
    Elite: "bg-primary",
    Savage: "bg-battle-red"
  }[difficulty]

  return (
    <Card className="arena-card glass border-primary/20 hover:border-primary/50 overflow-hidden group">
      <div className="absolute top-0 right-0 p-3 flex gap-2">
        <Badge variant="secondary" className={`${difficultyColor} text-white border-none font-bold`}>
          {difficulty}
        </Badge>
        <Badge variant="outline" className="bg-black/50 border-secondary text-secondary flex items-center gap-1">
          <Cpu className="w-3 h-3" /> AI JUDGE
        </Badge>
      </div>

      <CardHeader className="flex flex-row items-center gap-4 pt-6">
        <div className="relative w-14 h-14 rounded-full border-2 border-primary/50 overflow-hidden shrink-0">
          <Image src={bossAvatar} alt={bossName} fill className="object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Arena Boss</span>
          <span className="text-lg font-black tracking-tight leading-tight">{bossName}</span>
          <span className="text-xs text-secondary font-bold">{projectName}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="bg-white/5 p-4 rounded-lg border border-white/10 min-h-[80px] flex items-center justify-center text-center">
          <p className="text-sm italic font-medium">"{prompt}"</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Trophy className="w-3 h-3 text-gold" /> Prize Pool
            </span>
            <span className="text-xl font-black text-gold">{prizePool} <span className="text-xs font-normal opacity-70">USDC</span></span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Timer className="w-3 h-3 text-battle-red" /> Ends In
            </span>
            <span className="text-lg font-bold text-battle-red">{timeLeft}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="w-3.5 h-3.5" />
          <span className="font-bold">{participants} Fighters</span>
        </div>
        <Link href={`/arena/${id}`} passHref>
          <BattleButton variant="primary" size="sm" className="font-black text-[10px]">
            ENTER BATTLE
          </BattleButton>
        </Link>
      </CardFooter>
    </Card>
  )
}
