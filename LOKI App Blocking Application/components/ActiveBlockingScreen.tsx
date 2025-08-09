import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, Shield, Coffee, Smartphone, Clock, Zap } from 'lucide-react';
import { Profile, BlockingSession } from '../App';

interface ActiveBlockingScreenProps {
  session: BlockingSession;
  profile: Profile;
  onBreakUsed: () => void;
  onEndSession: () => void;
  onNFCScan: () => void;
}

export function ActiveBlockingScreen({ 
  session, 
  profile, 
  onBreakUsed, 
  onEndSession,
  onNFCScan 
}: ActiveBlockingScreenProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakTimeLeft, setBreakTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - session.startTime.getTime()) / 1000);
      setTimeElapsed(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [session.startTime]);

  useEffect(() => {
    let breakInterval: NodeJS.Timeout;
    
    if (isOnBreak && breakTimeLeft > 0) {
      breakInterval = setInterval(() => {
        setBreakTimeLeft(prev => {
          if (prev <= 1) {
            setIsOnBreak(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (breakInterval) clearInterval(breakInterval);
    };
  }, [isOnBreak, breakTimeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }
    return `${minutes}m ${remainingSeconds}s`;
  };

  const handleTakeBreak = () => {
    setIsOnBreak(true);
    setBreakTimeLeft(300); // 5 minutes
    onBreakUsed();
  };

  const remainingBreaks = 3 - session.breaksUsed;

  return (
    <div className="min-h-screen bg-[#0A1628] p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Shield className="w-6 h-6 text-green-400" />
            <h1 className="text-xl text-white">Blocking Active</h1>
          </div>
          <p className="text-white/60">Profile: {profile.name}</p>
        </div>

        {/* Session Status */}
        <Card className={`${isOnBreak ? 'bg-orange-600/20 border-orange-600/30' : 'bg-green-600/20 border-green-600/30'}`}>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                isOnBreak ? 'bg-orange-600/20' : 'bg-green-600/20'
              }`}>
                {isOnBreak ? (
                  <Coffee className="w-8 h-8 text-orange-400" />
                ) : (
                  <Shield className="w-8 h-8 text-green-400" />
                )}
              </div>
              
              <div>
                <h3 className={`text-lg font-medium ${isOnBreak ? 'text-orange-400' : 'text-green-400'}`}>
                  {isOnBreak ? 'On Break' : 'Apps Blocked'}
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  {isOnBreak 
                    ? `Break ends in ${formatTime(breakTimeLeft)}`
                    : `Session time: ${formatTime(timeElapsed)}`
                  }
                </p>
              </div>

              {isOnBreak && (
                <Progress 
                  value={(breakTimeLeft / 300) * 100} 
                  className="w-full h-2"
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Blocked Apps */}
        <Card className="bg-[#1A2B3D] border-[#4A90E2]/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Blocked Apps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.blockedApps.map((app) => (
                <Badge 
                  key={app}
                  className={`${
                    isOnBreak 
                      ? 'bg-orange-600/20 text-orange-400' 
                      : 'bg-red-600/20 text-red-400'
                  }`}
                >
                  {app}
                </Badge>
              ))}
            </div>
            {profile.blockedApps.length === 0 && (
              <p className="text-white/60 text-sm">No apps configured for blocking</p>
            )}
          </CardContent>
        </Card>

        {/* Break System */}
        <Card className="bg-[#1A2B3D] border-[#4A90E2]/20">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center space-x-2">
              <Coffee className="w-5 h-5" />
              <span>Emergency Breaks</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Breaks remaining:</span>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < remainingBreaks ? 'bg-[#4A90E2]' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <p className="text-white/60 text-sm">
              Take a 5-minute break to access blocked apps in case of emergencies.
            </p>
            
            <Button
              onClick={handleTakeBreak}
              disabled={remainingBreaks === 0 || isOnBreak}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50"
            >
              <Coffee className="w-4 h-4 mr-2" />
              {isOnBreak ? 'Break Active' : 'Take 5min Break'}
            </Button>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="space-y-3">
          <Button
            onClick={onNFCScan}
            className="w-full bg-[#4A90E2] hover:bg-[#357ABD] text-white"
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Scan NFC to End Session
          </Button>
          
          <Button
            onClick={onEndSession}
            variant="outline"
            className="w-full border-red-600/30 text-red-400 hover:bg-red-600/10"
          >
            <Zap className="w-4 h-4 mr-2" />
            Force End Session
          </Button>
        </div>

        {/* Session Stats */}
        <Card className="bg-[#1A2B3D]/50 border-[#4A90E2]/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Started:</span>
              <span className="text-white">{session.startTime.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-white/60">Duration:</span>
              <span className="text-white">{formatTime(timeElapsed)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}