"use client"

import { useState, useEffect } from "react"
import { BattleButton } from "@/components/ui/battle-button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Trophy, Flame, Zap, Sword, Shield, Cpu, Loader2, Coins } from "lucide-react"
import { useSubmitRoast } from "@/hooks/RoastArena"
import toast from "@/lib/utils/toast"

interface ArenaBattleProps {
  challengeId: string
  bossName: string
  challengePrompt: string
  prizePool: string
  status: string
  founderAddress: string
  deadline: string
}

export function ArenaBattle({ challengeId, bossName, challengePrompt, prizePool, status, founderAddress, deadline }: ArenaBattleProps) {
  console.log(status)
  const [roastText, setRoastText] = useState("")
  const [isEvaluating, setIsEvaluating] = useState(false)

  const [evalStep, setEvalStep] = useState(0)

  const { mutate: submitRoast, isPending: isSubmitting } = useSubmitRoast()
  const handleSubmit = () => {
    try {
      submitRoast({ challenge_id: challengeId, roast_content: roastText }, {
        onSuccess: () => {
          toast.success("Roast submitted successfully!", {
            description: "Your roast has been submitted for evaluation. Good luck!",
          })
        },
        onError: (error) => {
          console.error("Error submitting roast:", error)
          toast.error("Failed to submit roast. Please try again.")
        }
      })
    } catch (error) {
      console.error("Error submitting roast:", error)
      toast.error("Failed to submit roast. Please try again.")
    }
  }


  // Character limit
  const MAX_CHARS = 280


  const steps = [
    "Analyzing Comedic Timing...",
    "Scanning for Savage Keywords...",
    "Measuring Creative Impact...",
    "Calculating Virality Potential...",
    "Synthesizing AI Judgment..."
  ]


  const evaluation = {
    humor: 85,
    creativity: 78,
    originality: 92,
    savagery: 88,
    relevance: 80,
    viralityPotential: 90,

  }


  const ScoreBar = ({ label, score, color }: { label: string; score: number; color: string }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
        <span>{label}</span>
        <span className={color}>{score}</span>
      </div>
      {/* <Progress value={score} className="h-1.5 bg-white/5" indicatorClassName={color} /> */}
    </div>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-6 pb-20">
      {/* Left: Input Arena */}
      <div className="lg:col-span-7 space-y-6">
        <Card className="glass border-primary/30 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <h3 className="font-black uppercase tracking-tighter text-xl italic flex items-center gap-2">
                <Sword className="w-5 h-5 text-primary" /> Enter the <span className="text-primary">Fray</span>
              </h3>
              <p className="text-xs text-muted-foreground font-bold">CHALLENGE: {bossName}</p>
            </div>
            <Badge variant="outline" className="text-[10px] font-black border-primary/50 text-primary">
              {roastText.length} / {MAX_CHARS}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <Textarea
                placeholder="Unleash your most savage roast here..."
                className="min-h-[200px] bg-black/40 border-white/10 focus:border-primary/50 text-lg font-medium resize-none"
                value={roastText}
                onChange={(e) => setRoastText(e.target.value.slice(0, MAX_CHARS))}
                disabled={isEvaluating}
              />
              {isEvaluating && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center space-y-6 animate-in fade-in duration-500">
                  <div className="relative">
                    <Loader2 className="w-16 h-16 text-primary animate-spin" />
                    <Cpu className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-black uppercase italic tracking-tighter text-primary neon-text animate-pulse">
                      {steps[evalStep]}
                    </p>
                    <div className="flex gap-1 justify-center">
                      {[0, 1, 2, 3, 4].map(i => (
                        <div key={i} className={`h-1 w-8 rounded-full transition-colors duration-300 ${i <= evalStep ? 'bg-primary shadow-[0_0_10px_rgba(188,19,254,1)]' : 'bg-white/10'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                  <Flame className="w-4 h-4 text-battle-orange" />
                  {/* Live Impact: <span className={preview ? "text-battle-orange" : ""}>{preview?.overallScore ?? 0}%</span> */}
                </div>
              </div>
              <BattleButton
                variant="primary"
                size="lg"
                className="font-black italic text-lg px-12 group"
                onClick={handleSubmit}
                disabled={isSubmitting || roastText.length < 10}
              >
                <div className="flex gap-2 justify-center items-center">

                  {isSubmitting ? "Submitting..." : "SUBMIT ENTRY"}
                  <Zap className="w-5 h-5 ml-2 fill-primary group-hover:animate-pulse" />
                </div>
              </BattleButton>
            </div>
          </CardContent>
        </Card>

        {/* AI Result Dashboard */}
        {status === "completed" && (
          <Card className="glass border-gold/30 gold-glow animate-in zoom-in duration-500">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black uppercase tracking-tighter text-3xl italic text-gold flex items-center gap-2">
                  <Trophy className="w-8 h-8" /> Final <span className="text-white">Judgment</span>
                </h3>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase text-muted-foreground block tracking-[0.2em]">Overall Rank</span>
                  <span className="text-4xl font-black italic text-gold">#{Math.floor(Math.random() * 5) + 1}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <ScoreBar label="Humor" score={evaluation.humor} color="bg-primary" />
                <ScoreBar label="Creativity" score={evaluation.creativity} color="bg-secondary" />
                <ScoreBar label="Originality" score={evaluation.originality} color="bg-green-500" />
                <ScoreBar label="Savagery" score={evaluation.savagery} color="bg-battle-red" />
                <ScoreBar label="Relevance" score={evaluation.relevance} color="bg-blue-500" />
                <ScoreBar label="Viral Factor" score={evaluation.viralityPotential} color="bg-battle-orange" />
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-gold text-xs font-black uppercase tracking-[0.2em]">
                  <Cpu className="w-4 h-4" /> Judge Reasoning
                </div>
                {/* <p className="text-sm font-medium leading-relaxed italic opacity-90">
                  "{evaluation.reasoning}"
                </p> */}
              </div>

              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border border-gold/30">
                    <Coins className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-muted-foreground">Estimated Reward</span>
                    <span className="text-lg font-black block text-gold tracking-tight">240.50 USDC</span>
                  </div>
                </div>
                <BattleButton variant="outline" size="sm" className="border-primary/50 text-primary">SHARE BATTLE</BattleButton>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right: Leaderboard & Info */}
      <div className="lg:col-span-5 space-y-6">
        {/* Arena Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass p-6 rounded-xl border-white/5 space-y-1">
            <span className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-1">
              <Trophy className="w-3 h-3 text-gold" /> Prize Pool
            </span>
            <div className="text-2xl font-black text-gold">{prizePool} <span className="text-xs">USDC</span></div>
          </div>
          <div className="glass p-6 rounded-xl border-white/5 space-y-1">
            <span className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-1">
              <Flame className="w-3 h-3 text-battle-red" /> Difficulty
            </span>
            <div className="text-2xl font-black text-battle-red">SAVAGE</div>
          </div>
        </div>

        {/* Live Leaderboard */}
        {status === "completed" && <Card className="glass border-white/10 h-fit">
          <CardHeader className="pb-2">
            <h3 className="font-black uppercase tracking-tighter text-xl italic flex items-center justify-between">
              <span>Arena <span className="text-primary">Standings</span></span>
              <span className="text-[10px] text-muted-foreground tracking-widest bg-white/5 px-2 py-1 rounded">LIVE</span>
            </h3>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {[
                { rank: 1, name: "CryptoRoaster", score: 96.8, prize: "450.00" },
                { rank: 2, name: "MemeKing_AI", score: 95.4, prize: "320.00" },
                { rank: 3, name: "SavageBuilder", score: 93.7, prize: "210.00" },
                { rank: 4, name: "TheAlphaWitch", score: 91.2, prize: "150.00" },
                { rank: 5, name: "DegenerateDev", score: 89.5, prize: "100.00" },
              ].map((entry) => (
                <div key={entry.rank} className={`flex items-center justify-between p-4 hover:bg-white/5 transition-colors group cursor-default ${entry.rank === 1 ? 'bg-gold/5 border-l-2 border-gold' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-xl font-black italic w-6 ${entry.rank === 1 ? 'text-gold' : entry.rank === 2 ? 'text-slate-300' : entry.rank === 3 ? 'text-amber-600' : 'text-muted-foreground'}`}>
                      {entry.rank}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-black tracking-tight">{entry.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{entry.score} SCORE</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-gold block">{entry.prize} USDC</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/5 text-center">
              <BattleButton variant="ghost" size="sm" className="w-full text-[10px] font-black tracking-[0.2em]">VIEW FULL STANDINGS</BattleButton>
            </div>
          </CardContent>
        </Card>}

        {/* AI Judge Specs */}
        <Card className="glass border-secondary/30">
          <CardHeader className="pb-2">
            <h3 className="font-black uppercase tracking-tighter text-sm italic text-secondary flex items-center gap-2">
              <Shield className="w-4 h-4" /> AI Judge Logic v2.5
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
              Submissions are evaluated across 6 vectors including Comedic Timing and Creative Savagery. Low-effort or generative AI detection results in an automatic penalty.
            </p>
            <div className="flex flex-wrap gap-2">
              {['No Spam', 'No Slurs', 'Pure Wit'].map(tag => (
                <span key={tag} className="text-[9px] font-black uppercase tracking-widest bg-white/5 px-2 py-1 rounded-sm border border-white/5 text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
