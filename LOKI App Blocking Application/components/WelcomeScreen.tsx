import React from 'react';
import { Button } from './ui/button';
import exampleImage from 'figma:asset/3a3d41dd286903eb1cbf61701450346134c671ad.png';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="border border-[#4A90E2] border-dashed p-8 rounded-lg text-center">
          {/* LOKI Logo */}
          <div className="mb-8">
            <h1 className="text-6xl tracking-[0.2em] text-[#4A90E2] mb-2">
              LOKI
            </h1>
          </div>

          {/* Description Text */}
          <div className="mb-8 space-y-4">
            <p className="text-white/90 leading-relaxed">
              Þetta app er til þess að hjálpa þér að stýra notkun þinni á öppum í snjálltækinu þínu. Með LOKA getur þú valið ham fyrir mismunandi aðstæður og hvaða app þú vilt LOKA á í þeim aðstæðum.
            </p>
            <p className="text-white/90 leading-relaxed">
              Taktu stjórn á notkun þinni með LOKA
            </p>
          </div>

          {/* Get Started Button */}
          <Button
            onClick={onGetStarted}
            className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white py-3 rounded-lg transition-colors duration-200"
          >
            AFRAM
          </Button>
        </div>
      </div>
    </div>
  );
}