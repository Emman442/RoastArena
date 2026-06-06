import Link from "next/link"
import Image from "next/image"
import { BattleButton } from "@/components/ui/battle-button"
import { Trophy, ChevronLeft, Quote, Heart, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"

export default function HallOfFamePage() {
  const legendaryRoasts = [
    {
      id: 1,
      author: "CryptoRoaster",
      authorAvatar: "https://picsum.photos/seed/u1/100/100",
      target: "Solana Founders",
      targetAvatar: "https://picsum.photos/seed/sol/100/100",
      content: "Calling Solana a decentralized blockchain is like calling a group chat with a server reboot schedule a 'revolution'. If uptime was a feature, Solana would still be in the 'ideas' phase.",
      score: 98.4,
      likes: "1.2k",
      comments: 84,
      date: "Oct 2024"
    },
    {
      id: 2,
      author: "SavageDev",
      authorAvatar: "https://picsum.photos/seed/u2/100/100",
      target: "ChatGPT 'Artists'",
      targetAvatar: "https://picsum.photos/seed/ai/100/100",
      content: "Your 'creative process' is just a high-bandwidth copy-paste. You're not an artist, you're a prompt engineer for a plagiarism engine. Even the AI is tired of your repetitive descriptions.",
      score: 96.8,
      likes: "942",
      comments: 52,
      date: "Nov 2024"
    },
    {
      id: 3,
      author: "MemeLord_99",
      authorAvatar: "https://picsum.photos/seed/u3/100/100",
      target: "Venture Capitalists",
      targetAvatar: "https://picsum.photos/seed/vc/100/100",
      content: "VCs are just rich people who get paid to say 'AI' and 'Web3' until someone gives them a board seat. They're like weather forecasters, but for money that doesn't belong to them.",
      score: 95.2,
      likes: "850",
      comments: 120,
      date: "Dec 2024"
    }
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
        <div className="space-y-2 border-l-4 border-battle-orange pl-6 mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">Hall of <span className="text-battle-orange">Fame</span></h1>
          <p className="text-muted-foreground font-medium italic">The most savage, high-scoring roasts ever recorded in the arena.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {legendaryRoasts.map((roast) => (
            <Card key={roast.id} className="glass border-battle-orange/20 overflow-hidden hover:border-battle-orange/50 transition-all group">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full border-2 border-battle-orange/40 overflow-hidden">
                    <Image src={roast.authorAvatar} alt={roast.author} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black italic tracking-tight">{roast.author}</span>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{roast.date}</span>
                  </div>
                </div>
                <div className="bg-battle-orange/10 px-2 py-1 rounded border border-battle-orange/20">
                  <span className="text-xs font-black text-battle-orange italic">{roast.score}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative p-6 bg-black/40 rounded-xl border border-white/5">
                  <Quote className="absolute top-2 left-2 w-4 h-4 text-battle-orange/20" />
                  <p className="text-sm font-medium leading-relaxed italic text-muted-foreground group-hover:text-foreground transition-colors">
                    "{roast.content}"
                  </p>
                </div>
                <div className="flex items-center gap-4 py-2 border-y border-white/5">
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="relative w-6 h-6 rounded-full border border-primary/40 overflow-hidden">
                      <Image src={roast.targetAvatar} alt={roast.target} fill className="object-cover" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Target: {roast.target}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1.5 hover:text-battle-red cursor-pointer transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs font-black">{roast.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-secondary cursor-pointer transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs font-black">{roast.comments}</span>
                  </div>
                </div>
                <Trophy className="w-5 h-5 text-gold animate-pulse" />
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-12">
          <BattleButton variant="outline" className="uppercase tracking-[0.3em] text-xs py-8 px-12 italic border-battle-orange text-battle-orange">
            LOAD MORE LEGENDS
          </BattleButton>
        </div>
      </section>
    </div>
  )
}
