
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BattleButton } from '@/components/ui/battle-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronLeft, Rocket, Coins, Target, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function CreateChallengePage() {
  const router = useRouter();
  const db = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    bossName: '',
    projectName: '',
    prompt: '',
    description: '',
    prizePool: '',
    difficulty: 'Elite',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;

    setIsSubmitting(true);

    const challengeData = {
      ...formData,
      prizePool: parseFloat(formData.prizePool),
      bossAvatar: `https://picsum.photos/seed/${Math.random()}/400/400`,
      projectLogo: `https://picsum.photos/seed/${Math.random()}/200/200`,
      createdAt: serverTimestamp(),
      participants: 0,
      timeLeft: '72:00:00', // Default for new
    };

    const challengesRef = collection(db, 'challenges');

    addDoc(challengesRef, challengeData)
      .then(() => {
        router.push('/');
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: 'challenges',
          operation: 'create',
          requestResourceData: challengeData,
        });
        errorEmitter.emit('permission-error', permissionError);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto w-full mb-8">
        <Link href="/" passHref>
          <BattleButton variant="ghost" size="sm" className="flex items-center gap-2 group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO ARENAS
          </BattleButton>
        </Link>
      </div>

      <Card className="max-w-3xl mx-auto w-full glass border-primary/20 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary via-secondary to-battle-red" />
        <CardHeader className="space-y-2">
          <CardTitle className="text-4xl font-black uppercase tracking-tighter italic flex items-center gap-3">
            <Rocket className="w-8 h-8 text-primary" /> Launch <span className="text-primary">Challenge</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground font-medium italic">
            Put your project in the crosshairs. Fund the pool and let the savages roast you to the moon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                  <Target className="w-3 h-3" /> Founder Name
                </Label>
                <Input 
                  placeholder="e.g. Vitalik Buterin" 
                  className="bg-black/40 border-white/10" 
                  value={formData.bossName}
                  onChange={(e) => setFormData({...formData, bossName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Project Name
                </Label>
                <Input 
                  placeholder="e.g. Ethereum Foundation" 
                  className="bg-black/40 border-white/10"
                  value={formData.projectName}
                  onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">The Roast Prompt</Label>
              <Input 
                placeholder="e.g. Roast our gas fees until we ship the next upgrade." 
                className="bg-black/40 border-white/10"
                value={formData.prompt}
                onChange={(e) => setFormData({...formData, prompt: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Mission Briefing (Optional)</Label>
              <Textarea 
                placeholder="Provide context, pain points, or specific things roasters should focus on..." 
                className="bg-black/40 border-white/10 min-h-[120px]"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                  <Coins className="w-3 h-3 text-gold" /> Prize Pool (USDC)
                </Label>
                <Input 
                  type="number" 
                  placeholder="500" 
                  className="bg-black/40 border-white/10"
                  value={formData.prizePool}
                  onChange={(e) => setFormData({...formData, prizePool: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Difficulty Level</Label>
                <Select 
                  value={formData.difficulty} 
                  onValueChange={(val) => setFormData({...formData, difficulty: val})}
                >
                  <SelectTrigger className="bg-black/40 border-white/10">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent className="glass border-white/10">
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Elite">Elite</SelectItem>
                    <SelectItem value="Savage">Savage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-6">
              <BattleButton 
                variant="primary" 
                size="lg" 
                className="w-full text-xl italic group" 
                glowing
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>DEPLOY CHALLENGE <Rocket className="w-6 h-6 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                )}
              </BattleButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
