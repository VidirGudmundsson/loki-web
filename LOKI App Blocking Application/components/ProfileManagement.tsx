import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Settings, Smartphone, Plus, Zap } from 'lucide-react';
import { Profile } from '../App';

interface ProfileManagementProps {
  profiles: Profile[];
  onProfilesUpdate: (profiles: Profile[]) => void;
  onNFCScan: () => void;
  onEditProfile: (profileId: string) => void;
  hasActiveSession: boolean;
}

export function ProfileManagement({ 
  profiles, 
  onProfilesUpdate, 
  onNFCScan, 
  onEditProfile,
  hasActiveSession 
}: ProfileManagementProps) {
  return (
    <div className="min-h-screen bg-[#0A1628] p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl text-[#4A90E2] tracking-wide mb-2">LOKI</h1>
          <p className="text-white/60">Stjórnaðu lokunarstilingum þínum</p>
        </div>

        {/* NFC Scan Button */}
        <Card className="bg-[#1A2B3D] border-[#4A90E2]/20">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#4A90E2]/20 rounded-full flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-[#4A90E2]" />
              </div>
              
              <div>
                <h3 className="text-white text-lg mb-2">
                  {hasActiveSession ? 'Pikkaðu til að enda lotu' : 'Pikkaðu NFC merki'}
                </h3>
                <p className="text-white/60 text-sm">
                  {hasActiveSession 
                    ? 'Skannaðu NFC merkið þitt til að stöðva núverandi lokunarlotu'
                    : 'Skannaðu NFC merkið þitt til að virkja lokunarstilingi'
                  }
                </p>
              </div>

              <Button
                onClick={onNFCScan}
                className={`w-full ${
                  hasActiveSession 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-[#4A90E2] hover:bg-[#357ABD]'
                } text-white`}
              >
                {hasActiveSession ? (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Enda virka lotu
                  </>
                ) : (
                  <>
                    <Smartphone className="w-4 h-4 mr-2" />
                    Skanna NFC merki
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profiles */}
        <div className="space-y-4">
          <h2 className="text-white text-lg">Þínar stillingar: Veldu hvaða öpp þú vilt LOKA á</h2>
          
          {profiles.map((profile) => (
            <Card key={profile.id} className="bg-[#1A2B3D] border-[#4A90E2]/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: profile.color }}
                    />
                    <div>
                      <h3 className="text-white font-medium">{profile.name}</h3>
                      <p className="text-white/60 text-sm">
                        {profile.blockedApps.length} öpp læst
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => onEditProfile(profile.id)}
                    variant="ghost"
                    size="sm"
                    className="text-[#4A90E2] hover:bg-[#4A90E2]/10"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
                
                {profile.blockedApps.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {profile.blockedApps.slice(0, 3).map((app) => (
                      <Badge 
                        key={app}
                        variant="secondary"
                        className="bg-[#4A90E2]/20 text-[#4A90E2] text-xs"
                      >
                        {app}
                      </Badge>
                    ))}
                    {profile.blockedApps.length > 3 && (
                      <Badge 
                        variant="secondary"
                        className="bg-[#4A90E2]/20 text-[#4A90E2] text-xs"
                      >
                        +{profile.blockedApps.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Status */}
        {hasActiveSession && (
          <Card className="bg-green-600/20 border-green-600/30">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <p className="text-green-400 text-sm">
                  Lokunarlota er núna virk
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}