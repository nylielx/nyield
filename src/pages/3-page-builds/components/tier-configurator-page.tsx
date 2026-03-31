/**
 * =============================================================================
 * TIER CONFIGURATOR PAGE — Shared page component for all build tiers
 * =============================================================================
 * Each tier page renders this with different props (tier ID, name, price).
 * Now supports edition selection via URL params.
 * =============================================================================
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { useBuildConfigurator } from "../hooks/use-build-configurator";
import { categoryLabels } from "@/data/temp/builds-options-mock";
import ConfiguratorSection from "./configurator-section";
import ConfiguratorSummary from "./configurator-summary";
import pcBlackout from "@/assets/pc-blackout.jpg";
import pcWhiteout from "@/assets/pc-whiteout.jpg";
import { useToast } from "@/hooks/use-toast";

interface TierConfiguratorPageProps {
  tierId: string;
  tierName: string;
  basePrice: number;
}

const TierConfiguratorPage = ({ tierId, tierName, basePrice }: TierConfiguratorPageProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const edition = searchParams.get("edition") || "blackout";
  const { toast } = useToast();
  const [buildName, setBuildName] = useState("My Build");

  const {
    options,
    selections,
    loading,
    saving,
    totalPrice,
    warnings,
    selectOption,
    resetCategory,
    confirmBuild,
  } = useBuildConfigurator({ tierId, tierName, basePrice });

  useEffect(() => {
    document.title = `Configure ${tierName} Build — nYield`;
  }, [tierName]);

  const handleConfirm = async () => {
    await confirmBuild();
    toast({
      title: "Build Saved!",
      description: `Your "${buildName}" (${tierName} ${edition}) configuration has been saved.`,
    });
    navigate("/account/builds");
  };

  if (loading || !options || !selections) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-32">
          <div className="space-y-4">
            <div className="h-8 w-64 bg-muted/30 rounded animate-pulse" />
            <div className="h-64 bg-muted/30 rounded-xl animate-pulse" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-muted/30 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const editionLabel = edition.charAt(0).toUpperCase() + edition.slice(1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          {/* Back link */}
          <Link
            to="/builds"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Builds
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-1">
              Configure <span className="text-gradient">{tierName}</span> Build
            </h1>
            <p className="text-sm text-primary font-medium mb-1">
              Configuring {editionLabel} Edition
            </p>
            <p className="text-muted-foreground mb-8">
              Customize every component. Starting from £{basePrice.toLocaleString()}.
            </p>
          </motion.div>

          {/* Top layout: Image + Summary */}
          <div className="grid lg:grid-cols-3 gap-8 mb-10">
            {/* PC Image */}
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden glass-base">
                <img
                  src={edition === "whiteout" ? pcWhiteout : pcBlackout}
                  alt={`nYield ${tierName} Build — ${editionLabel} Edition`}
                  className="w-full h-64 md:h-80 object-cover"
                  width={800}
                  height={400}
                />
                <div className="p-5 bg-card">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                    {tierName} Tier — {editionLabel} Edition
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Select your preferred components below. Each upgrade adjusts the total price in real time.
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Panel — sticky on desktop */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ConfiguratorSummary
                tierName={tierName}
                basePrice={basePrice}
                totalPrice={totalPrice}
                selections={selections}
                options={options}
                warnings={warnings}
                onConfirm={handleConfirm}
                saving={saving}
                buildName={buildName}
                onBuildNameChange={setBuildName}
                edition={edition}
              />
            </div>
          </div>

          {/* Configuration Sections */}
          <div className="space-y-3">
            {categoryLabels.map(({ key, label }, i) => (
              <ConfiguratorSection
                key={key}
                label={label}
                options={options[key]}
                selectedId={selections[key]}
                onSelect={(id) => selectOption(key, id)}
                onReset={() => resetCategory(key)}
                defaultOpen={i === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default TierConfiguratorPage;
