import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Smartphone, Users, Shield, ArrowRight } from 'lucide-react';

interface HowItWorksScreenProps {
  onNext: () => void;
}

export function HowItWorksScreen({ onNext }: HowItWorksScreenProps) {
  const steps = [
    {
      icon: Smartphone,
      title: 'Skannaðu NFC auðkenni',
      description: 'Notaðu hvaða NFC auðkenni sem þú átt til að virkja þinn ham í LOKA',
      color: '#4A90E2'
    },
    {
      icon: Users,
      title: 'Veldu ham',
      description: 'Veldu ham til að virkja:Vinnu-ham, Heima-ham, Einbeitingnar-ham eða Venjulegan-ham',
      color: '#8B5CF6'
    },
    {
      icon: Shield,
      title: 'Lokaðu á öpp',
      description: 'Stilltu hvaða öpp á að loka á í hverjum ham til að halda einbeitingu',
      color: '#10B981'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl text-[#4A90E2] tracking-wide mb-2">
            LOKI
          </h1>
          <h2 className="text-xl text-white mb-4">Hvernig það virkar</h2>
          <p className="text-white/60">
            Stjórnaðu notkun símans þíns í þremur einföldum skrefum
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className="bg-[#1A2B3D] border-[#4A90E2]/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${step.color}20` }}
                    >
                      <IconComponent 
                        className="w-6 h-6" 
                        style={{ color: step.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span 
                          className="w-6 h-6 rounded-full text-xs flex items-center justify-center text-white"
                          style={{ backgroundColor: step.color }}
                        >
                          {index + 1}
                        </span>
                        <h3 className="text-white text-lg">{step.title}</h3>
                      </div>
                      <p className="text-white/70">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Flow Visualization */}
        <Card className="bg-[#4A90E2]/10 border-[#4A90E2]/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#4A90E2]">NFC skann</span>
              <ArrowRight className="w-4 h-4 text-[#4A90E2]" />
              <span className="text-[#4A90E2]">Stilling</span>
              <ArrowRight className="w-4 h-4 text-[#4A90E2]" />
              <span className="text-[#4A90E2]">Öpp læst</span>
            </div>
          </CardContent>
        </Card>



        {/* Continue Button */}
        <Button
          onClick={onNext}
          className="w-full bg-[#4A90E2] hover:bg-[#357ABD] text-white py-3"
        >
          Áfram
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}