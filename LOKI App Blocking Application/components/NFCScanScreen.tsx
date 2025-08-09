import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Smartphone } from 'lucide-react';
import { Profile } from '../App';

interface NFCScanScreenProps {
  profiles: Profile[];
  onProfileSelected: (profileId: string) => void;
  onCancel: () => void;
}

export function NFCScanScreen({ profiles, onProfileSelected, onCancel }: NFCScanScreenProps) {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleProfileSelect = (profileId: string) => {
    setSelectedProfile(profileId);
    setTimeout(() => {
      onProfileSelected(profileId);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0A1628] p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={onCancel}
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white hover:bg-[#4A90E2]/10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl text-white">Veldu stillingu</h1>
        </div>

        {/* NFC Detected Indicator */}
        <Card className="bg-[#1A2B3D] border-green-600/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-green-400 font-medium">NFC merki fundið</h3>
                <p className="text-white/60 text-sm">Veldu stillingu til að virkja</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Selection */}
        <div className="space-y-3">
          {profiles.map((profile) => (
            <Card 
              key={profile.id} 
              className={`bg-[#1A2B3D] border-[#4A90E2]/20 cursor-pointer transition-all duration-200 ${
                selectedProfile === profile.id 
                  ? 'border-[#4A90E2] bg-[#4A90E2]/10 scale-105' 
                  : 'hover:border-[#4A90E2]/50 hover:bg-[#4A90E2]/5'
              }`}
              onClick={() => handleProfileSelect(profile.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: profile.color }}
                    >
                      {selectedProfile === profile.id && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{profile.name}</h3>
                      <p className="text-white/60 text-sm">
                        Læsa {profile.blockedApps.length} öpp
                      </p>
                    </div>
                  </div>
                  
                  {selectedProfile === profile.id && (
                    <div className="text-[#4A90E2] text-sm">Virkja...</div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <Card className="bg-[#4A90E2]/10 border-[#4A90E2]/20">
          <CardContent className="p-4">
            <p className="text-[#4A90E2] text-sm text-center">
              Tap on a profile to start blocking the selected apps. You can end the session by scanning your NFC tag again.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}