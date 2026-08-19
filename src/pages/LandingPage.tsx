import React from "react";
import { Hero } from "../components/Hero";
import { InteractiveBattlePreview } from "../components/InteractiveBattlePreview";
import { LogosMarquee } from "../components/LogosMarquee";
import { FleetStats } from "../components/FleetStats";
import { StagesTabs } from "../components/StagesTabs";
import { LiveLeaderboardSection } from "../components/LiveLeaderboardSection";
import { BentoGrid } from "../components/BentoGrid";
import { Testimonials } from "../components/Testimonials";
import { PricingCalculator } from "../components/PricingCalculator";
import { FaqSection } from "../components/FaqSection";
import { CtaBanner } from "../components/CtaBanner";

interface LandingPageProps {
  onNavigate: (page: string, battleId?: string) => void;
  onOpenExpertModal: () => void;
  onOpenLiveBattleModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenExpertModal,
  onOpenLiveBattleModal
}) => {
  return (
    <div className="flex flex-col">
      <Hero
        onOpenLiveBattleModal={onOpenLiveBattleModal}
        onOpenExpertModal={onOpenExpertModal}
      />

      <InteractiveBattlePreview />

      <LogosMarquee />

      <FleetStats
        onOpenLiveBattleModal={onOpenLiveBattleModal}
        onOpenExpertModal={onOpenExpertModal}
      />

      <StagesTabs />

      <LiveLeaderboardSection />

      <BentoGrid />

      <Testimonials />

      <PricingCalculator
        onOpenLiveBattleModal={onOpenLiveBattleModal}
        onOpenExpertModal={onOpenExpertModal}
      />

      <FaqSection
        onOpenExpertModal={onOpenExpertModal}
      />

      <CtaBanner
        onOpenLiveBattleModal={onOpenLiveBattleModal}
        onOpenExpertModal={onOpenExpertModal}
      />
    </div>
  );
};
