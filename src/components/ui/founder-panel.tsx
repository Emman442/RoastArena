import React from 'react'
import { Card, CardContent, CardHeader } from './card'
import { Challenge } from '@/lib/contracts/types'
import { BattleButton } from './battle-button'
import { useJudgeChallenge } from '@/hooks/RoastArena'
import toast from '@/lib/utils/toast'

export default function FounderPanel({ challenge, isFounder, hasEnded }: { challenge: Challenge, isFounder: boolean, hasEnded: boolean }) {
    const { isPending: isJudgingChallenge, mutate: JudgeChallenge } = useJudgeChallenge()
    const handleJudgeRoasts = () => {

        try {
            JudgeChallenge({ challenge_id: challenge.challenge_id }, {
                onSuccess: () => {
                    toast.success("Roast Judgement Successful", {
                        description: "Roast Challenge results are out!",
                    })
                },
                onError: (error) => {
                    console.error("Error judging roasts:", error)
                    toast.error("Failed to judge roasts. Please try again.")
                }
            })
        } catch (error) {
            console.error("Error judgingg roast:", error)
            toast.error("Failed to judging roast. Please try again.")
        }
    }
    return (
        <div className='mb-10 w-[80%] mx-auto'>
            <Card className=' glass border-primary/30 relative overflow-hidden group'>
                <CardHeader className='text-center font-black uppercase tracking-tighter text-xl italic'>
                    Roast Submissions
                </CardHeader>

                <CardContent className="space-y-6">
                    {Object.entries(challenge.roasts || {}).map(
                        ([wallet, roast], index) => (
                            <div
                                key={wallet}
                                className="p-4 rounded-lg border border-white/10 bg-black/20"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold">
                                        Fighter #{index + 1}
                                    </span>

                                    <span className="text-xs text-muted-foreground">
                                        {wallet.slice(0, 6)}...
                                        {wallet.slice(-4)}
                                    </span>
                                </div>

                                <p>{roast}</p>
                            </div>
                        )
                    )}
                </CardContent>

                <BattleButton
                    onClick={handleJudgeRoasts}
                    disabled={!hasEnded || challenge.status !== "active"}
                    className='mx-auto block my-4'

                >
                    {isJudgingChallenge ? "Judging..." : "Judge Roasts"}
                </BattleButton>
            </Card>
        </div>
    )
}
