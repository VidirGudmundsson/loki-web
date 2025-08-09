import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Home, Briefcase, Car, Coffee, ArrowRight, Lightbulb, Shield, Target } from 'lucide-react';

interface WhyItWorksScreenProps {
  onNext: () => void;
}

export function WhyItWorksScreen({ onNext }: WhyItWorksScreenProps) {
  const scenarios = [
    {
      icon: Briefcase,
      title: 'Á vinnunni',
      description: 'Skildu kortið eftir heima',
      benefit: 'Getur ekki opnað samfélagsmiðla eða leiki í vinnutíma',
      color: '#8B5CF6'
    },
    {
      icon: Home,
      title: 'Heima',
      description: 'Skildu kortið eftir í vinnunni',
      benefit: 'Engin freisting að athuga tölvupóst eða vinnu-öpp',
      color: '#10B981'
    },
    {
      icon: Coffee,
      title: 'Í námi',
      description: 'Skildu kortið eftir í bílnum',
      benefit: 'Full einbeiting án þess að geta opnað truflandi öpp',
      color: '#F59E0B'
    },
    {
      icon: Car,
      title: 'Á ferðalagi',
      description: 'Gefðu kortið til ferðafélaga',
      benefit: 'Notaðu ferðatímann til að slappa af án skjáa',
      color: '#06B6D4'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#4A90E2]/20 rounded-full flex items-center justify-center">
            <Lightbulb className="w-8 h-8 text-[#4A90E2]" />
          </div>
          <h1 className="text-2xl text-white mb-2">Hvers vegna LOKI virkar</h1>
          <p className="text-white/60">
            Galdur LOKA felst í því að búa til líkamlegar hindranir sem koma í veg fyrir hugsunarlausa notkun.
          </p>
        </div>

        {/* Main concept */}
        <Card className="bg-[#4A90E2]/10 border-[#4A90E2]/20">
          <CardHeader>
            <CardTitle className="text-[#4A90E2] text-lg flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Aðal hugmyndin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#4A90E2]/90 text-sm leading-relaxed">
              Þegar þú skilur NFC kortið eftir á öðrum stað skapar þú <strong>líkamlega hindrun</strong> sem kemur í veg fyrir að þú getir virkjað truflandi öpp án þess að hugsa um það.
            </p>
          </CardContent>
        </Card>

        {/* Scenarios */}
        <div className="space-y-3">
          <h2 className="text-white text-lg mb-3">Dæmigerðar aðstæður</h2>
          {scenarios.map((scenario, index) => {
            const IconComponent = scenario.icon;
            return (
              <Card key={index} className="bg-[#1A2B3D] border-[#4A90E2]/20">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${scenario.color}20` }}
                    >
                      <IconComponent 
                        className="w-5 h-5" 
                        style={{ color: scenario.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">{scenario.title}</h3>
                      <p className="text-white/60 text-sm mb-2">{scenario.description}</p>
                      <p className="text-green-400/80 text-xs">✓ {scenario.benefit}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Psychology behind it */}
        <Card className="bg-[#1A2B3D]/50 border-[#4A90E2]/10">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h3 className="text-green-400 font-medium mb-2">Sálfræðilegur hvati</h3>
                <ul className="text-white/60 text-sm space-y-1">
                  <li>• <strong>Meginvirkni</strong> - Verður að fara í gegnum líkamlegt ferli</li>
                  <li>• <strong>Tími til íhugunar</strong> - Gefur tíma til að hugsa um hvort þú viljir raunverulega opna appið</li>
                  <li>• <strong>Meðvitund</strong> - Breytir ómeðvitaðri hegðun í meðvitaða ákvörðun</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits summary */}
        <Card className="bg-green-600/10 border-green-600/20">
          <CardContent className="p-4">
            <h3 className="text-green-400 font-medium mb-2">Afraksturinn</h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="text-green-400/80 text-sm">
                📈 <strong>Aukin framleiðni</strong> - Færri truflanir þýðir betri árangur
              </div>
              <div className="text-green-400/80 text-sm">
                🧘 <strong>Betri einbeiting</strong> - Djúpri vinna og meiri nærvera
              </div>
              <div className="text-green-400/80 text-sm">
                🔋 <strong>Meiri orka</strong> - Minni andleg þreyta frá skipting athygli
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button
          onClick={onNext}
          className="w-full bg-[#4A90E2] hover:bg-[#357ABD] text-white py-3"
        >
          Skil! Hvernig virkar það?
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}