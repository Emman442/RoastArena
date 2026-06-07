
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BattleButton } from '@/components/ui/battle-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronLeft, Rocket, Coins, Target, ShieldCheck, Loader2, Clock } from 'lucide-react';
import Link from 'next/link';

export default function CreateChallengePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    bossName: '',
    projectName: '',
    prompt: '',
    description: '',
    prizePool: '',
    duration_seconds: 0,
  });
  console.log(formData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

  };


  const DURATIONS = {
  "1h": 3600,
  "6h": 21600,
  "12h": 43200,
  "24h": 86400,
  "3d": 259200,
  "7d": 604800,
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
                  onChange={(e) => setFormData({ ...formData, bossName: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                required
              />
            </div>

            {/* <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Mission Briefing (Optional)</Label>
              <Textarea
                placeholder="Provide context, pain points, or specific things roasters should focus on..."
                className="bg-black/40 border-white/10 min-h-[120px]"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div> */}

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
                  onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                  required
                />
              </div>


              <Select onValueChange={(value) => setFormData({ ...formData, duration_seconds: parseInt(value) })} defaultValue={formData.duration_seconds.toString()} className="bg-black/40 border-white/10">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blue-500" /> Challenge Duration
                </Label>
                <SelectContent>
                  {Object.entries(DURATIONS).map(([label, value]) => (
                    <SelectItem
                      key={value}
                      value={value.toString()}
                      onSelect={() => setFormData({ ...formData, duration_seconds: value })}
                    >
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>




            <div className="pt-6">
              <BattleButton
                variant="primary"
                size="lg"
                className="w-full italic group"
                glowing
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <span className='flex gap-2 items-center'>DEPLOY CHALLENGE <Rocket className="w-8 h-8 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                )}
              </BattleButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
