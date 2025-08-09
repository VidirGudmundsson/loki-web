import image_19e0dda6dc567c92fe4c2a6b62b9f03cdb3079de from 'figma:asset/19e0dda6dc567c92fe4c2a6b62b9f03cdb3079de.png';
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CreditCard, Waves, Car, Building, KeyRound, ArrowRight, Info } from 'lucide-react';
import nfcSymbol from 'figma:asset/188d46555911cf2a822b1f609ea6a26d0392ef8d.png';

interface WhatIsNFCScreenProps {
  onNext: () => void;
}

export function WhatIsNFCScreen({ onNext }: WhatIsNFCScreenProps) {
  const nfcExamples = [
    {
      icon: Car,
      title: 'Bensínstöðvarkort - lyklakyppa',
      description: 'Orkan lykill, Atlantsolíu lykill, N1 greiðslukort',
      color: '#F59E0B'
    },
    {
      icon: Building,
      title: 'Sundlaugarkort',
      description: 'Aðgangskort fyrir Laugardalslaug, Vesturbæjarlaug',
      color: '#06B6D4'
    },
    {
      icon: KeyRound,
      title: 'Aðgangskort',
      description: 'Skrifstofu-, íbúðar- eða líkamsræktaraðgangskort',
      color: '#8B5CF6'
    },
    {
      icon: CreditCard,
      title: 'Greiðslukort',
      description: 'Kreditkort með snertilausri greiðslu',
      color: '#10B981'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#4A90E2]/20 rounded-full flex items-center justify-center">
            <Waves className="w-8 h-8 text-[#4A90E2]" />
          </div>
          <h1 className="text-2xl text-white mb-2">Hvað er NFC merki?</h1>
          <p className="text-white/60">
            NFC (Near Field Communication) merki eru litlir flísar sem síminn þinn getur lesið þegar þú heldur honum nálægt þeim.
          </p>
        </div>

        {/* What you probably have */}
        <Card className="bg-[#1A2B3D] border-[#4A90E2]/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Þú átt líklega þegar eitt!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nfcExamples.map((example, index) => {
              const IconComponent = example.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${example.color}20` }}
                  >
                    <IconComponent 
                      className="w-5 h-5" 
                      style={{ color: example.color }}
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{example.title}</h3>
                    <p className="text-white/60 text-sm">{example.description}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* How to identify */}
        <Card className="bg-[#4A90E2]/10 border-[#4A90E2]/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-[#4A90E2] mt-0.5" />
              <div>
                <h3 className="text-[#4A90E2] font-medium mb-2">Hvernig á að þekkja NFC kort</h3>
                <ul className="text-[#4A90E2]/80 text-sm space-y-1">
                  <li className="flex items-center">
                    • Leitaðu að þráðlausu/bylgjutákni 
                    <img src={image_19e0dda6dc567c92fe4c2a6b62b9f03cdb3079de} alt="NFC symbol" className="w-4 h-4 ml-2" />
                  </li>
                  <li>• Kort sem virka með því að "skanna"</li>
                  <li>• Hvaða kort sem er sem virkar án þess að stinga því inn</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Don't have one? */}
        <Card className="bg-[#1A2B3D]/50 border-[#4A90E2]/10">
          <CardContent className="p-4">
            <h3 className="text-white font-medium mb-2">Átt þú engin NFC kort?</h3>
            <p className="text-white/60 text-sm mb-3">
              Þú getur keypt auð NFC merki á netinu fyrir um 500-1000 krónur, eða notað NFC kort vinar til að byrja.
            </p>
            <p className="text-white/60 text-xs">
              Vinsælar verslanir: Elko, Tölvutek, eða pantað frá Amazon
            </p>
          </CardContent>
        </Card>

        {/* Security note */}
        <Card className="bg-green-600/10 border-green-600/20">
          <CardContent className="p-4">
            <h3 className="text-green-400 font-medium mb-2">Friðhelgi og öryggi</h3>
            <p className="text-green-400/80 text-sm">
              LOKI les aðeins einstakt auðkenni úr NFC kortinu þínu. Það getur ekki nálgast greiðsluupplýsingar eða persónuleg gögn.
            </p>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button
          onClick={onNext}
          className="w-full bg-[#4A90E2] hover:bg-[#357ABD] text-white py-3"
        >
          Skil! Skráum það
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}