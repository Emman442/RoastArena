import Link from "next/link"
import { BattleButton } from "@/components/ui/battle-button"
import { Trophy, ChevronLeft, Zap, Star, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function LeaderboardPage() {
  const topRoasters = [
    { rank: 1, name: "CryptoRoaster", score: 98.4, wins: 12, earnings: "4,250", avatar: "https://picsum.photos/seed/u1/100/100" },
    { rank: 2, name: "SavageDev", score: 96.2, wins: 8, earnings: "3,100", avatar: "https://picsum.photos/seed/u2/100/100" },
    { rank: 3, name: "MemeLord_99", score: 94.8, wins: 7, earnings: "2,400", avatar: "https://picsum.photos/seed/u3/100/100" },
    { rank: 4, name: "TechBurner", score: 92.1, wins: 5, earnings: "1,850", avatar: "https://picsum.photos/seed/u4/100/100" },
    { rank: 5, name: "AlphaWitch", score: 89.5, wins: 4, earnings: "1,200", avatar: "https://picsum.photos/seed/u5/100/100" },
    { rank: 6, name: "ByteBiter", score: 87.2, wins: 3, earnings: "950", avatar: "https://picsum.photos/seed/u6/100/100" },
  ]

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
      </div>

      <section className="max-w-7xl mx-auto w-full px-6 mb-12">
        <div className="space-y-2 border-l-4 border-primary pl-6 mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">Global <span className="text-primary">Leaderboard</span></h1>
          <p className="text-muted-foreground font-medium italic">Top fighters ranked by AI judgment and cumulative earnings.</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <Card className="glass border-primary/20 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-gold" />
                  <span className="text-sm font-black uppercase tracking-widest italic">All-Time Legends</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Season 1</span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                      <th className="px-6 py-4">Rank</th>
                      <th className="px-6 py-4">Fighter</th>
                      <th className="px-6 py-4">Savagery Score</th>
                      <th className="px-6 py-4">Arena Wins</th>
                      <th className="px-6 py-4 text-right">Total Earnings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {topRoasters.map((roaster) => (
                      <tr key={roaster.rank} className="group hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <span className={`text-2xl font-black italic ${
                            roaster.rank === 1 ? 'text-gold' : 
                            roaster.rank === 2 ? 'text-slate-300' : 
                            roaster.rank === 3 ? 'text-amber-600' : 'text-muted-foreground'
                          }`}>
                            #{roaster.rank}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border border-primary/20">
                              <AvatarImage src={roaster.avatar} />
                              <AvatarFallback>{roaster.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-black tracking-tight flex items-center gap-1 uppercase italic">
                                {roaster.name}
                                {roaster.rank <= 3 && <ShieldCheck className="w-3 h-3 text-primary" />}
                              </span>
                              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Verified Roaster</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-battle-orange fill-battle-orange" />
                            <span className="text-lg font-black italic">{roaster.score}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-secondary fill-secondary" />
                            <span className="text-lg font-black italic">{roaster.wins}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-xl font-black text-gold tracking-tighter italic">{roaster.earnings} USDC</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
