import React, { useState } from "react";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LandingPage } from "./pages/LandingPage";
import { NewBattlePage } from "./pages/NewBattlePage";
import { LiveBattlePage } from "./pages/LiveBattlePage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { HistoryPage } from "./pages/HistoryPage";
import { HarnessPlaygroundPage } from "./pages/HarnessPlaygroundPage";
import { CustomBenchmarkPage } from "./pages/CustomBenchmarkPage";
import { LiveBattleModal, ExpertMeetingModal } from "./components/Modals";
import { ApiKeyModal } from "./components/ApiKeyModal";
import { createBattleSession, LiveBattleSession } from "./services/battleEngine";
import { CustomBenchmark } from "./services/customBenchmarkService";

export function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "new" | "battle" | "leaderboard" | "history" | "harness" | "custom-benchmarks">("landing");
  const [battleSession, setBattleSession] = useState<LiveBattleSession>(() => 
    createBattleSession("security-ctf", "claude-3-7-sonnet", "deepseek-r1")
  );
  const [battleModalOpen, setBattleModalOpen] = useState(false);
  const [expertModalOpen, setExpertModalOpen] = useState(false);
  const [keyModalOpen, setKeyModalOpen] = useState(false);

  const handleStartBattle = (formatId: string, modelAId: string, modelBId: string) => {
    const newSession = createBattleSession(formatId, modelAId, modelBId);
    setBattleSession(newSession);
    setCurrentPage("battle");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLaunchCustomBenchmark = (benchmark: CustomBenchmark) => {
    const newSession = createBattleSession(benchmark.id, "claude-3-7-sonnet", "deepseek-r1");
    newSession.format_name = benchmark.title;
    newSession.agentA.currentCode = benchmark.initialCode;
    setBattleSession(newSession);
    setCurrentPage("battle");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReplayBattle = (session: LiveBattleSession) => {
    setBattleSession(session);
    setCurrentPage("battle");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as any);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-accent/30 selection:text-white">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Global Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenExpertModal={() => setExpertModalOpen(true)}
        onOpenLiveBattleModal={() => setBattleModalOpen(true)}
        onOpenKeyModal={() => setKeyModalOpen(true)}
      />

      {/* Dynamic View Router */}
      <main className="flex-1">
        {currentPage === "landing" && (
          <LandingPage
            onNavigate={handleNavigate}
            onOpenExpertModal={() => setExpertModalOpen(true)}
            onOpenLiveBattleModal={() => setBattleModalOpen(true)}
          />
        )}

        {currentPage === "custom-benchmarks" && (
          <CustomBenchmarkPage
            onLaunchBenchmark={handleLaunchCustomBenchmark}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "harness" && (
          <HarnessPlaygroundPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "new" && (
          <NewBattlePage
            onStartBattle={handleStartBattle}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "battle" && (
          <LiveBattlePage
            session={battleSession}
            onUpdateSession={setBattleSession}
            onNavigate={handleNavigate}
            onOpenKeyModal={() => setKeyModalOpen(true)}
          />
        )}

        {currentPage === "leaderboard" && (
          <LeaderboardPage
            onNavigate={handleNavigate}
            onSelectModelForBattle={(modelId) => {
              handleStartBattle("security-ctf", modelId, "deepseek-r1");
            }}
          />
        )}

        {currentPage === "history" && (
          <HistoryPage
            onReplayBattle={handleReplayBattle}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals */}
      <LiveBattleModal
        isOpen={battleModalOpen}
        onClose={() => setBattleModalOpen(false)}
        onLaunchMatch={handleStartBattle}
      />

      <ExpertMeetingModal
        isOpen={expertModalOpen}
        onClose={() => setExpertModalOpen(false)}
      />

      <ApiKeyModal
        isOpen={keyModalOpen}
        onClose={() => setKeyModalOpen(false)}
      />
    </div>
  );
}

export default App;
