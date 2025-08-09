import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Smartphone, Tag } from 'lucide-react';

interface NFCRegistrationProps {
  onRegistered: () => void;
}

export function NFCRegistration({ onRegistered }: NFCRegistrationProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [nfcId, setNfcId] = useState('');
  const [step, setStep] = useState<'intro' | 'scanning' | 'manual'>('intro');

  const handleStartScan = () => {
    setIsScanning(true);
    setStep('scanning');
    
    // Simulate NFC scan after 2 seconds
    setTimeout(() => {
      const mockNFCId = 'NFC-' + Math.random().toString(36).substr(2, 8).toUpperCase();
      setNfcId(mockNFCId);
      setIsScanning(false);
      setTimeout(() => {
        onRegistered();
      }, 1000);
    }, 2000);
  };

  const handleManualEntry = () => {
    setStep('manual');
  };

  const handleManualSubmit = () => {
    if (nfcId.trim()) {
      onRegistered();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <Card className="bg-[#1A2B3D] border-[#4A90E2]/20">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-[#4A90E2]/20 rounded-full flex items-center justify-center">
              <Tag className="w-8 h-8 text-[#4A90E2]" />
            </div>
            <CardTitle className="text-white text-xl">NFC merki skráning</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 'intro' && (
              <>
                <div className="text-center space-y-4">
                  <p className="text-white/80">
                    Til að nota LOKI þarftu að skrá NFC merki sem þú átt. Þetta merki verður notað til að virkja og afvirkja lokunarstilingarnar þínar.
                  </p>
                  <div className="bg-[#4A90E2]/10 p-4 rounded-lg">
                    <p className="text-[#4A90E2] text-sm">
                      Gakktu úr skugga um að NFC merkið þitt sé tilbúið og tækið þitt styðji NFC skannun.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button
                    onClick={handleStartScan}
                    className="w-full bg-[#4A90E2] hover:bg-[#357ABD] text-white"
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    Skanna NFC merki
                  </Button>
                  
                  <Button
                    onClick={handleManualEntry}
                    variant="outline"
                    className="w-full border-[#4A90E2]/30 text-white hover:bg-[#4A90E2]/10"
                  >
                    Slá inn merki auðkenni handvirkt
                  </Button>
                </div>
              </>
            )}

            {step === 'scanning' && (
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 mx-auto border-4 border-[#4A90E2] border-t-transparent rounded-full animate-spin"></div>
                  <Tag className="w-8 h-8 text-[#4A90E2] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                
                <div>
                  <h3 className="text-white text-lg mb-2">Leita að NFC merki...</h3>
                  <p className="text-white/60 text-sm">
                    Haltu NFC merkinu þínu nálægt tækinu þínu
                  </p>
                </div>

                {nfcId && (
                  <div className="bg-green-600/20 border border-green-600/30 p-4 rounded-lg">
                    <p className="text-green-400 text-sm">
                      ✓ NFC merki fundið: {nfcId}
                    </p>
                  </div>
                )}
              </div>
            )}

            {step === 'manual' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nfc-id" className="text-white">NFC merki auðkenni</Label>
                  <Input
                    id="nfc-id"
                    value={nfcId}
                    onChange={(e) => setNfcId(e.target.value)}
                    placeholder="Sláðu inn NFC merki auðkennið þitt"
                    className="bg-[#0A1628] border-[#4A90E2]/30 text-white mt-2"
                  />
                </div>
                
                <p className="text-white/60 text-sm">
                  Þú getur fundið NFC merki auðkennið þitt með hvaða NFC lesara appi sem er.
                </p>
                
                <div className="flex space-x-3">
                  <Button
                    onClick={handleManualSubmit}
                    disabled={!nfcId.trim()}
                    className="flex-1 bg-[#4A90E2] hover:bg-[#357ABD] text-white"
                  >
                    Skrá merki
                  </Button>
                  
                  <Button
                    onClick={() => setStep('intro')}
                    variant="outline"
                    className="flex-1 border-[#4A90E2]/30 text-white hover:bg-[#4A90E2]/10"
                  >
                    Til baka
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}