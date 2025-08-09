import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { ArrowLeft, Search, Smartphone, MessageCircle, Camera, Music, Mail, Globe, ShoppingBag, Gamepad2 } from 'lucide-react';
import { Profile } from '../App';

interface AppSelectionScreenProps {
  profile: Profile;
  onSave: (blockedApps: string[]) => void;
  onCancel: () => void;
}

// Mock app data with icons
const AVAILABLE_APPS = [
  { name: 'Instagram', icon: Camera, category: 'Social' },
  { name: 'Facebook', icon: MessageCircle, category: 'Social' },
  { name: 'TikTok', icon: Music, category: 'Entertainment' },
  { name: 'YouTube', icon: Music, category: 'Entertainment' },
  { name: 'Twitter', icon: MessageCircle, category: 'Social' },
  { name: 'Snapchat', icon: Camera, category: 'Social' },
  { name: 'WhatsApp', icon: MessageCircle, category: 'Communication' },
  { name: 'Telegram', icon: MessageCircle, category: 'Communication' },
  { name: 'Gmail', icon: Mail, category: 'Productivity' },
  { name: 'Chrome', icon: Globe, category: 'Browsers' },
  { name: 'Safari', icon: Globe, category: 'Browsers' },
  { name: 'Netflix', icon: Music, category: 'Entertainment' },
  { name: 'Spotify', icon: Music, category: 'Entertainment' },
  { name: 'Amazon', icon: ShoppingBag, category: 'Shopping' },
  { name: 'Reddit', icon: MessageCircle, category: 'Social' },
  { name: 'LinkedIn', icon: MessageCircle, category: 'Professional' },
  { name: 'Discord', icon: Gamepad2, category: 'Gaming' },
  { name: 'Twitch', icon: Gamepad2, category: 'Gaming' },
];

export function AppSelectionScreen({ profile, onSave, onCancel }: AppSelectionScreenProps) {
  const [selectedApps, setSelectedApps] = useState<string[]>(profile.blockedApps);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = AVAILABLE_APPS.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAppToggle = (appName: string) => {
    setSelectedApps(prev =>
      prev.includes(appName)
        ? prev.filter(name => name !== appName)
        : [...prev, appName]
    );
  };

  const handleSave = () => {
    onSave(selectedApps);
  };

  const groupedApps = filteredApps.reduce((acc, app) => {
    if (!acc[app.category]) {
      acc[app.category] = [];
    }
    acc[app.category].push(app);
    return acc;
  }, {} as Record<string, typeof AVAILABLE_APPS>);

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
          <div>
            <h1 className="text-xl text-white">Configure {profile.name}</h1>
            <p className="text-white/60 text-sm">Select apps to block</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search apps..."
            className="pl-10 bg-[#1A2B3D] border-[#4A90E2]/20 text-white"
          />
        </div>

        {/* Selected Apps Count */}
        <Card className="bg-[#4A90E2]/10 border-[#4A90E2]/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-[#4A90E2]">{selectedApps.length} apps selected</span>
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: profile.color }}
              />
            </div>
          </CardContent>
        </Card>

        {/* App Categories */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {Object.entries(groupedApps).map(([category, apps]) => (
            <Card key={category} className="bg-[#1A2B3D] border-[#4A90E2]/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-base">{category}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {apps.map((app) => {
                  const IconComponent = app.icon;
                  const isSelected = selectedApps.includes(app.name);
                  
                  return (
                    <div
                      key={app.name}
                      onClick={() => handleAppToggle(app.name)}
                      className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-[#4A90E2]/10 transition-colors"
                    >
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleAppToggle(app.name)}
                      />
                      <div className="w-8 h-8 bg-[#4A90E2]/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-[#4A90E2]" />
                      </div>
                      <span className="text-white flex-1">{app.name}</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex space-x-3">
          <Button
            onClick={handleSave}
            className="flex-1 bg-[#4A90E2] hover:bg-[#357ABD] text-white"
          >
            Save Profile
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 border-[#4A90E2]/30 text-white hover:bg-[#4A90E2]/10"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}