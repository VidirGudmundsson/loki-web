import React, { useState, useEffect } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { WhyItWorksScreen } from "./components/WhyItWorksScreen";
import { HowItWorksScreen } from "./components/HowItWorksScreen";
import { WhatIsNFCScreen } from "./components/WhatIsNFCScreen";
import { NFCRegistration } from "./components/NFCRegistration";
import { ProfileManagement } from "./components/ProfileManagement";
import { NFCScanScreen } from "./components/NFCScanScreen";
import { ActiveBlockingScreen } from "./components/ActiveBlockingScreen";
import { AppSelectionScreen } from "./components/AppSelectionScreen";
import exampleImage from "figma:asset/3a3d41dd286903eb1cbf61701450346134c671ad.png";

export type Profile = {
  id: string;
  name: string;
  blockedApps: string[];
  color: string;
};

export type BlockingSession = {
  profileId: string;
  startTime: Date;
  breaksUsed: number;
  isActive: boolean;
};

export type AppState =
  | "welcome"
  | "why-it-works"
  | "how-it-works"
  | "what-is-nfc"
  | "nfc-registration"
  | "profile-management"
  | "nfc-scan"
  | "active-blocking"
  | "app-selection";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<AppState>("welcome");
  const [isNFCRegistered, setIsNFCRegistered] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: "1",
      name: "Vinna",
      blockedApps: [],
      color: "#8B5CF6",
    },
    {
      id: "2",
      name: "Heima",
      blockedApps: [],
      color: "#10B981",
    },
    {
      id: "3",
      name: "Einbeiting",
      blockedApps: [],
      color: "#F59E0B",
    },
    {
      id: "4",
      name: "Venjulegt",
      blockedApps: [],
      color: "#6B7280",
    },
  ]);
  const [currentSession, setCurrentSession] =
    useState<BlockingSession | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<
    string | null
  >(null);
  const [editingProfile, setEditingProfile] = useState<
    string | null
  >(null);

  // Load saved data on app start
  useEffect(() => {
    const savedNFC = localStorage.getItem(
      "loki-nfc-registered",
    );
    const savedProfiles = localStorage.getItem("loki-profiles");
    const savedSession = localStorage.getItem(
      "loki-active-session",
    );

    if (savedNFC) {
      setIsNFCRegistered(true);
      setCurrentScreen("profile-management");
    }

    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }

    if (savedSession) {
      const session = JSON.parse(savedSession);
      setCurrentSession({
        ...session,
        startTime: new Date(session.startTime),
      });
      setCurrentScreen("active-blocking");
    }
  }, []);

  const handleNFCRegistered = () => {
    setIsNFCRegistered(true);
    localStorage.setItem("loki-nfc-registered", "true");
    setCurrentScreen("profile-management");
  };

  const handleProfileUpdate = (updatedProfiles: Profile[]) => {
    setProfiles(updatedProfiles);
    localStorage.setItem(
      "loki-profiles",
      JSON.stringify(updatedProfiles),
    );
  };

  const handleNFCScan = () => {
    if (currentSession?.isActive) {
      // End current session
      setCurrentSession(null);
      localStorage.removeItem("loki-active-session");
      setCurrentScreen("profile-management");
    } else {
      // Start new session selection
      setCurrentScreen("nfc-scan");
    }
  };

  const handleProfileSelected = (profileId: string) => {
    const newSession: BlockingSession = {
      profileId,
      startTime: new Date(),
      breaksUsed: 0,
      isActive: true,
    };
    setCurrentSession(newSession);
    localStorage.setItem(
      "loki-active-session",
      JSON.stringify(newSession),
    );
    setCurrentScreen("active-blocking");
  };

  const handleBreakUsed = () => {
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        breaksUsed: currentSession.breaksUsed + 1,
      };
      setCurrentSession(updatedSession);
      localStorage.setItem(
        "loki-active-session",
        JSON.stringify(updatedSession),
      );
    }
  };

  const handleEndSession = () => {
    setCurrentSession(null);
    localStorage.removeItem("loki-active-session");
    setCurrentScreen("profile-management");
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return (
          <WelcomeScreen
            onGetStarted={() =>
              setCurrentScreen("why-it-works")
            }
          />
        );

      case "why-it-works":
        return (
          <WhyItWorksScreen
            onNext={() => setCurrentScreen("how-it-works")}
          />
        );

      case "how-it-works":
        return (
          <HowItWorksScreen
            onNext={() => setCurrentScreen("what-is-nfc")}
          />
        );

      case "what-is-nfc":
        return (
          <WhatIsNFCScreen
            onNext={() => setCurrentScreen("nfc-registration")}
          />
        );

      case "nfc-registration":
        return (
          <NFCRegistration onRegistered={handleNFCRegistered} />
        );

      case "profile-management":
        return (
          <ProfileManagement
            profiles={profiles}
            onProfilesUpdate={handleProfileUpdate}
            onNFCScan={handleNFCScan}
            onEditProfile={(profileId) => {
              setEditingProfile(profileId);
              setCurrentScreen("app-selection");
            }}
            hasActiveSession={currentSession?.isActive || false}
          />
        );

      case "nfc-scan":
        return (
          <NFCScanScreen
            profiles={profiles}
            onProfileSelected={handleProfileSelected}
            onCancel={() =>
              setCurrentScreen("profile-management")
            }
          />
        );

      case "active-blocking":
        return (
          <ActiveBlockingScreen
            session={currentSession!}
            profile={
              profiles.find(
                (p) => p.id === currentSession?.profileId,
              )!
            }
            onBreakUsed={handleBreakUsed}
            onEndSession={handleEndSession}
            onNFCScan={handleNFCScan}
          />
        );

      case "app-selection":
        return (
          <AppSelectionScreen
            profile={
              profiles.find((p) => p.id === editingProfile)!
            }
            onSave={(blockedApps) => {
              const updatedProfiles = profiles.map((p) =>
                p.id === editingProfile
                  ? { ...p, blockedApps }
                  : p,
              );
              handleProfileUpdate(updatedProfiles);
              setEditingProfile(null);
              setCurrentScreen("profile-management");
            }}
            onCancel={() => {
              setEditingProfile(null);
              setCurrentScreen("profile-management");
            }}
          />
        );

      default:
        return (
          <WelcomeScreen
            onGetStarted={() =>
              setCurrentScreen("why-it-works")
            }
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      {renderCurrentScreen()}
    </div>
  );
}