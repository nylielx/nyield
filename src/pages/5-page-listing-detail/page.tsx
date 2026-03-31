/**
 * =============================================================================
 * LISTING DETAIL PAGE — Full two-column layout for a single marketplace listing
 * =============================================================================
 *
 * LEFT COLUMN (Trust + Context):
 *   Image/title, price/actions, verification, full parts, usage history,
 *   maintenance, assembly context, included/not included, verification files
 *
 * RIGHT COLUMN (Technical + Validation):
 *   Performance summary, value indicator, data completeness,
 *   expandable detailed specs, transparency, seller notes, location
 *
 * ROUTE: /marketplace/:id
 * =============================================================================
 */

import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Cpu,
  Monitor,
  MemoryStick,
  HardDrive,
  Gauge,
  Thermometer,
  CheckCircle2,
  XCircle,
  FileText,
  MapPin,
  Truck,
  Package,
  Clock,
  Wrench,
  User,
  ChevronDown,
  Lock,
  Zap,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import { marketplaceListings } from "@/data/marketplaceExamples";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/** Helper: renders a key-value spec row */
const SpecRow = ({ label, value, tag }: { label: string; value: string | number; tag?: "verified" | "self-reported" }) => (
  <div className="flex justify-between items-start py-1.5 border-b border-border/50 last:border-0">
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="text-xs text-foreground font-medium text-right max-w-[55%] flex items-center gap-1.5">
      {value}
      {tag === "verified" && <ShieldCheck size={10} className="text-primary shrink-0" />}
      {tag === "self-reported" && <User size={10} className="text-muted-foreground shrink-0" />}
    </span>
  </div>
);

const ListingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const listing = marketplaceListings.find((l) => l.id === id);

  useEffect(() => {
    document.title = listing ? `${listing.title} — nYield Marketplace` : "Listing Not Found — nYield";
    window.scrollTo(0, 0);
  }, [listing]);

  if (!listing) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-6 pt-32 text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Listing Not Found</h1>
          <p className="text-muted-foreground mb-6">This listing doesn't exist or has been removed.</p>
          <Link to="/marketplace"><Button>Back to Marketplace</Button></Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const s = listing.detailedSpecs;

  /** Value bar color: 0-40 red, 40-70 yellow, 70-100 green */
  const getValueColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  /** Similar listings (disabled) */
  const similarListings = marketplaceListings.filter((l) => l.id !== listing.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Back nav */}
      <div className="pt-28 pb-4 bg-background">
        <div className="container mx-auto px-6">
          <Link to="/marketplace" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Marketplace
          </Link>
        </div>
      </div>

      {/* ================================================================
       * TWO-COLUMN LAYOUT
       * ================================================================ */}
      <section className="pb-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">

            {/* ==============================================================
             * LEFT COLUMN — Trust & Context (3/5 width)
             * ============================================================== */}
            <div className="lg:col-span-3 space-y-6">

              {/* 1. Title + Description */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl glass-base p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{listing.title}</h1>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {listing.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border bg-primary/15 text-primary border-primary/30">{tag}</span>
                      ))}
                    </div>
                  </div>
                  {listing.verified && (
                    <div className="flex items-center gap-1 text-primary text-xs font-semibold shrink-0 bg-primary/10 px-2.5 py-1 rounded-full">
                      <ShieldCheck size={14} /> Verified
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{listing.description}</p>
              </motion.div>

              {/* 2. Price + Actions */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-xl glass-base p-6">
                <p className="text-4xl font-heading font-bold text-foreground mb-1">£{listing.price.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mb-4">Seller: {listing.seller} · {listing.condition} · Listed {listing.listedDate}</p>
                <div className="flex gap-3">
                  <Button className="flex-1" disabled><Lock size={14} className="mr-1.5" /> Make Offer</Button>
                  <Button variant="outline" className="flex-1" disabled><Lock size={14} className="mr-1.5" /> Message Seller</Button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 text-center">Messaging and negotiation system coming soon.</p>
              </motion.div>

              {/* 3. Verification */}
              <div className="rounded-xl glass-base p-6">
                <h2 className="font-heading text-sm font-bold text-foreground mb-4 flex items-center gap-2"><ShieldCheck size={16} className="text-primary" /> Verification</h2>
                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div><span className="text-muted-foreground">Last Verified:</span><p className="text-foreground font-medium">{listing.verification.lastVerified}</p></div>
                  <div><span className="text-muted-foreground">Test Duration:</span><p className="text-foreground font-medium">{listing.verification.testDuration}</p></div>
                </div>
                <div className="space-y-2">
                  {[
                    { check: listing.verification.stressTested, label: "Stress tested" },
                    { check: listing.verification.temperatureVerified, label: "Temperature verified" },
                    { check: listing.verification.stabilityConfirmed, label: "Stability confirmed" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 size={14} className={item.check ? "text-green-500" : "text-muted-foreground"} />
                      <span className={item.check ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Full Part List */}
              <div className="rounded-xl glass-base p-6">
                <h2 className="font-heading text-sm font-bold text-foreground mb-4 flex items-center gap-2"><Wrench size={16} className="text-primary" /> Full Part List</h2>
                <div className="space-y-2 text-xs">
                  {Object.entries(listing.fullParts).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-1.5 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground capitalize">{key}</span>
                      <span className="text-foreground font-medium text-right max-w-[60%]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Usage History */}
              <div className="rounded-xl glass-base p-6">
                <h2 className="font-heading text-sm font-bold text-foreground mb-4 flex items-center gap-2"><Clock size={16} className="text-primary" /> Usage History</h2>
                <div className="space-y-2 text-xs">
                  {Object.entries(listing.usageHistory).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-1.5 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground">{key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}</span>
                      <span className="text-foreground font-medium text-right max-w-[60%]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Maintenance History */}
              <div className="rounded-xl glass-base p-6">
                <h2 className="font-heading text-sm font-bold text-foreground mb-4 flex items-center gap-2"><Wrench size={16} className="text-primary" /> Maintenance History</h2>
                <div className="space-y-2 text-xs">
                  {Object.entries(listing.maintenance).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-1.5 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground">{key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}</span>
                      <span className="text-foreground font-medium text-right max-w-[60%]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. Assembly + Sale Context */}
              <div className="rounded-xl glass-base p-6">
                <h2 className="font-heading text-sm font-bold text-foreground mb-4 flex items-center gap-2"><Package size={16} className="text-primary" /> Assembly & Sale Context</h2>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground">Build Type</span>
                    <span className="text-foreground font-medium">{listing.assemblyContext.buildType}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-muted-foreground">Reason for Sale</span>
                    <span className="text-foreground font-medium">{listing.assemblyContext.reasonForSale}</span>
                  </div>
                </div>
              </div>

              {/* 8. Included / Not Included */}
              <div className="rounded-xl glass-base p-6">
                <h2 className="font-heading text-sm font-bold text-foreground mb-4">What's Included</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-semibold text-green-500 mb-2">Included</p>
                    {listing.included.map((item) => (
                      <div key={item} className="flex items-center gap-1.5 text-xs text-foreground mb-1.5">
                        <CheckCircle2 size={12} className="text-green-500 shrink-0" /> {item}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-400 mb-2">Not Included</p>
                    {listing.notIncluded.map((item) => (
                      <div key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                        <XCircle size={12} className="text-red-400 shrink-0" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 9. Verification Files */}
              <div className="rounded-xl glass-base p-6">
                <h2 className="font-heading text-sm font-bold text-foreground mb-4 flex items-center gap-2"><FileText size={16} className="text-primary" /> Verification Files</h2>
                <div className="space-y-2">
                  {listing.verificationFiles.map((file) => (
                    <div key={file} className="flex items-center justify-between py-2 px-3 rounded-lg border border-border bg-secondary/30 text-xs">
                      <div className="flex items-center gap-2">
                        <FileText size={14} className="text-primary" />
                        <span className="text-foreground font-medium">{file}</span>
                      </div>
                      <Button variant="outline" size="sm" className="h-6 text-[10px] px-2" disabled>View</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ==============================================================
             * RIGHT COLUMN — Technical & Validation (2/5 width)
             * ============================================================== */}
            <div className="lg:col-span-2 space-y-6">

              {/* 1. Performance Summary */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl glass-base p-6">
                <h2 className="font-heading text-sm font-bold text-foreground mb-4 flex items-center gap-2"><Gauge size={16} className="text-primary" /> Performance Summary</h2>
                <div className="text-center mb-4">
                  <p className="text-5xl font-heading font-bold text-primary">{listing.performanceSummary.score}</p>
                  <p className="text-xs text-muted-foreground mt-1">Performance Score</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <p className="text-muted-foreground">Tier</p>
                    <p className="font-heading font-bold text-foreground mt-0.5">{listing.performanceSummary.tier}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <p className="text-muted-foreground">Estimated Longevity</p>
                    <p className="font-heading font-bold text-foreground mt-0.5">{listing.performanceSummary.estimatedLongevity}</p>
                  </div>
                </div>
              </motion.div>

              {/* 2. Value Indicator */}
              <div className="rounded-xl glass-base p-6">
                <h2 className="font-heading text-sm font-bold text-foreground mb-4 flex items-center gap-2"><BarChart3 size={16} className="text-primary" /> Value Indicator</h2>
                <div className="relative h-3 rounded-full overflow-hidden bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-foreground border-2 border-background shadow-lg"
                    initial={{ left: "0%" }}
                    animate={{ left: `${listing.valueScore}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{ marginLeft: "-8px" }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1.5">
                  <span>Poor Value</span>
                  <span>Fair</span>
                  <span>Excellent</span>
                </div>
                <p className="text-center text-sm font-heading font-bold text-foreground mt-2">{listing.valueScore}/100</p>
              </div>

              {/* 3. Data Completeness */}
              <div className="rounded-xl glass-base p-6">
                <h2 className="font-heading text-sm font-bold text-foreground mb-3">Data Completeness</h2>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full bg-secondary">
                    <motion.div className="h-2 rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${listing.dataCompleteness}%` }} transition={{ duration: 0.8 }} />
                  </div>
                  <span className="text-sm font-heading font-bold text-foreground">{listing.dataCompleteness}%</span>
                </div>
              </div>

              {/* DETAILED SPECS — Expandable Accordion */}
              <div className="rounded-xl glass-base p-6">
                <h2 className="font-heading text-sm font-bold text-foreground mb-4 flex items-center gap-2"><Zap size={16} className="text-primary" /> Detailed Specifications</h2>

                <Accordion type="multiple" className="w-full">
                  {/* CPU */}
                  <AccordionItem value="cpu">
                    <AccordionTrigger className="text-xs font-heading font-bold"><span className="flex items-center gap-2"><Cpu size={14} className="text-primary" /> CPU</span></AccordionTrigger>
                    <AccordionContent>
                      <SpecRow label="Architecture" value={s.cpu.architecture} />
                      <SpecRow label="Process Node" value={s.cpu.processNode} />
                      <SpecRow label="Cores / Threads" value={`${s.cpu.cores} / ${s.cpu.threads}`} />
                      <SpecRow label="Base Clock" value={s.cpu.baseClock} />
                      <SpecRow label="Boost Clock" value={s.cpu.boostClock} />
                      <SpecRow label="Cache L2" value={s.cpu.cacheL2} />
                      <SpecRow label="Cache L3" value={s.cpu.cacheL3} />
                      <SpecRow label="TDP" value={s.cpu.tdp} />
                      <SpecRow label="Max Temp" value={s.cpu.maxTempVerified} tag="verified" />
                      <SpecRow label="Stability" value={s.cpu.stabilityVerified} tag="verified" />
                    </AccordionContent>
                  </AccordionItem>

                  {/* GPU */}
                  <AccordionItem value="gpu">
                    <AccordionTrigger className="text-xs font-heading font-bold"><span className="flex items-center gap-2"><Monitor size={14} className="text-primary" /> GPU</span></AccordionTrigger>
                    <AccordionContent>
                      <SpecRow label="Architecture" value={s.gpu.architecture} />
                      <SpecRow label="VRAM" value={s.gpu.vram} />
                      <SpecRow label="Memory Bus" value={s.gpu.memoryBus} />
                      <SpecRow label="Core Clock" value={s.gpu.coreClock} />
                      <SpecRow label="Boost Clock" value={s.gpu.boostClock} />
                      <SpecRow label="CUDA Cores" value={s.gpu.cudaCores} />
                      <SpecRow label="RT Cores" value={s.gpu.rtCores} />
                      <SpecRow label="Power Connector" value={s.gpu.powerConnector} />
                      <SpecRow label="Power Draw" value={s.gpu.powerDrawSelfReported} tag="self-reported" />
                      <SpecRow label="Max Temp" value={s.gpu.maxTempVerified} tag="verified" />
                      <SpecRow label="GPU Score" value={`${s.gpu.gpuScoreVerified}/100`} tag="verified" />
                    </AccordionContent>
                  </AccordionItem>

                  {/* RAM */}
                  <AccordionItem value="ram">
                    <AccordionTrigger className="text-xs font-heading font-bold"><span className="flex items-center gap-2"><MemoryStick size={14} className="text-primary" /> RAM</span></AccordionTrigger>
                    <AccordionContent>
                      <SpecRow label="Full Kit Name" value={s.ram.fullKitName} />
                      <SpecRow label="Capacity" value={s.ram.capacity} />
                      <SpecRow label="Module Config" value={s.ram.moduleConfig} />
                      <SpecRow label="Speed" value={s.ram.speed} />
                      <SpecRow label="Latency" value={s.ram.latency} />
                      <SpecRow label="Voltage" value={s.ram.voltage} />
                      <SpecRow label="Rank" value={s.ram.rank} />
                      <SpecRow label="Channels" value={s.ram.channels} />
                      <SpecRow label="Slots Used" value={s.ram.slotsUsed} />
                      <SpecRow label="Slots Available" value={s.ram.slotsAvailable} />
                      <SpecRow label="Max Supported" value={s.ram.maxSupported} />
                      <SpecRow label="XMP" value={s.ram.xmpSelfReported} tag="self-reported" />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Storage */}
                  <AccordionItem value="storage">
                    <AccordionTrigger className="text-xs font-heading font-bold"><span className="flex items-center gap-2"><HardDrive size={14} className="text-primary" /> Storage</span></AccordionTrigger>
                    <AccordionContent>
                      <SpecRow label="Type" value={s.storage.type} />
                      <SpecRow label="Interface" value={s.storage.interface} />
                      <SpecRow label="Form Factor" value={s.storage.formFactor} />
                      <SpecRow label="Capacity" value={s.storage.capacity} />
                      <SpecRow label="Read Speed" value={s.storage.readSpeed} />
                      <SpecRow label="Write Speed" value={s.storage.writeSpeed} />
                      <SpecRow label="Free M.2 Slots" value={s.storage.freeM2Slots} />
                      <SpecRow label="SATA Availability" value={s.storage.sataAvailability} />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Cooling */}
                  <AccordionItem value="cooling">
                    <AccordionTrigger className="text-xs font-heading font-bold"><span className="flex items-center gap-2"><Thermometer size={14} className="text-primary" /> Cooling</span></AccordionTrigger>
                    <AccordionContent>
                      <SpecRow label="Type" value={s.cooling.type} />
                      <SpecRow label="Model" value={s.cooling.model} />
                      <SpecRow label="Fan Count" value={s.cooling.fanCount} />
                      <SpecRow label="Fan Size" value={s.cooling.fanSize} />
                      <SpecRow label="RPM" value={s.cooling.rpm} />
                      <SpecRow label="Intake / Exhaust" value={s.cooling.intakeExhaustLayout} />
                    </AccordionContent>
                  </AccordionItem>

                  {/* PSU */}
                  <AccordionItem value="psu">
                    <AccordionTrigger className="text-xs font-heading font-bold"><span className="flex items-center gap-2"><Zap size={14} className="text-primary" /> PSU</span></AccordionTrigger>
                    <AccordionContent>
                      <SpecRow label="Model" value={s.psu.model} />
                      <SpecRow label="Wattage" value={s.psu.wattage} />
                      <SpecRow label="Efficiency Rating" value={s.psu.efficiencyRating} />
                      <SpecRow label="Efficiency %" value={s.psu.efficiencyPercent} />
                      <SpecRow label="Modular Type" value={s.psu.modularType} />
                      <SpecRow label="Rail Type" value={s.psu.railType} />
                      <SpecRow label="Protections" value={s.psu.protections} />
                      <SpecRow label="PCIe Connectors" value={s.psu.connectorsPcie} />
                      <SpecRow label="SATA Connectors" value={s.psu.connectorsSata} />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Motherboard */}
                  <AccordionItem value="mobo">
                    <AccordionTrigger className="text-xs font-heading font-bold"><span className="flex items-center gap-2"><Cpu size={14} className="text-primary" /> Motherboard</span></AccordionTrigger>
                    <AccordionContent>
                      <SpecRow label="Model" value={s.motherboard.model} />
                      <SpecRow label="Socket" value={s.motherboard.socket} />
                      <SpecRow label="Chipset" value={s.motherboard.chipset} />
                      <SpecRow label="Form Factor" value={s.motherboard.formFactor} />
                      <SpecRow label="Max RAM Capacity" value={s.motherboard.maxRamCapacity} />
                      <SpecRow label="Max RAM Speed" value={s.motherboard.maxRamSpeed} />
                      <SpecRow label="PCIe Slots" value={s.motherboard.pcieSlots} />
                      <SpecRow label="M.2 Slots" value={s.motherboard.m2Slots} />
                      <SpecRow label="SATA Ports" value={s.motherboard.sataPorts} />
                      <SpecRow label="WiFi" value={s.motherboard.wifiSelfReported} tag="self-reported" />
                      <SpecRow label="Bluetooth" value={s.motherboard.bluetoothSelfReported} tag="self-reported" />
                      <SpecRow label="BIOS Version" value={s.motherboard.biosVersion} />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Expansion */}
                  <AccordionItem value="expansion">
                    <AccordionTrigger className="text-xs font-heading font-bold"><span className="flex items-center gap-2"><Package size={14} className="text-primary" /> Expansion</span></AccordionTrigger>
                    <AccordionContent>
                      <SpecRow label="RAM Slots Free" value={s.expansion.ramSlotsFree} />
                      <SpecRow label="M.2 Slots Free" value={s.expansion.m2SlotsFree} />
                      <SpecRow label="SATA Ports Free" value={s.expansion.sataPortsFree} />
                      <SpecRow label="PCIe Availability" value={s.expansion.pcieAvailability} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Transparency */}
              <div className="rounded-xl glass-base p-6">
                <h2 className="font-heading text-sm font-bold text-foreground mb-3 flex items-center gap-2"><ShieldCheck size={16} className="text-primary" /> Transparency</h2>
                <div className="text-center mb-3">
                  <p className="text-3xl font-heading font-bold text-primary">{listing.transparency.score}%</p>
                  <p className="text-[10px] text-muted-foreground">Transparency Score</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <p className="text-muted-foreground">Verified Fields</p>
                    <p className="font-heading font-bold text-foreground">{listing.transparency.verifiedFields}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <p className="text-muted-foreground">Self-Reported</p>
                    <p className="font-heading font-bold text-foreground">{listing.transparency.selfReportedFields}</p>
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground space-y-1">
                  <p className="flex items-center gap-1"><ShieldCheck size={10} className="text-primary" /> <strong>Verified</strong> = tested and confirmed by nYield</p>
                  <p className="flex items-center gap-1"><User size={10} /> <strong>Self-reported</strong> = provided by the seller</p>
                </div>
              </div>

              {/* Seller Notes */}
              <div className="rounded-xl glass-base p-6">
                <h2 className="font-heading text-sm font-bold text-foreground mb-3">Seller Notes</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">{listing.sellerNotes}</p>
              </div>

              {/* Location */}
              <div className="rounded-xl glass-base p-6">
                <h2 className="font-heading text-sm font-bold text-foreground mb-4 flex items-center gap-2"><MapPin size={16} className="text-primary" /> Location</h2>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground">City</span>
                    <span className="text-foreground font-medium">{listing.location.city}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground">Approximate Area</span>
                    <span className="text-foreground font-medium">{listing.location.approximateRadius}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground">Collection</span>
                    <span className="text-foreground font-medium">{listing.location.collectionAvailable ? "Available" : "Not available"}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-foreground font-medium">{listing.location.deliveryOptional ? "Optional" : "Not available"}</span>
                  </div>
                </div>
                {/* Approximate map placeholder */}
                <div className="mt-4 h-32 rounded-lg bg-secondary/50 border border-border flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                    <p className="text-[10px] text-muted-foreground">Approximate location — {listing.location.city}</p>
                    <p className="text-[9px] text-muted-foreground">Exact address not shown for privacy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
       * SIMILAR LISTINGS (disabled)
       * ================================================================ */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2 text-center">Similar Listings</h2>
          <p className="text-sm text-muted-foreground text-center mb-8">More listings coming soon</p>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {similarListings.map((item) => (
              <div key={item.id} className="rounded-xl border border-border/50 bg-card/50 p-5 opacity-50 relative">
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-xl">
                  <div className="text-center">
                    <Lock className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-xs font-heading font-bold text-foreground">Coming Soon</p>
                  </div>
                </div>
                <h3 className="font-heading text-sm font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-lg font-heading font-bold text-foreground mb-2">£{item.price.toLocaleString()}</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>{item.specs.cpu}</p>
                  <p>{item.specs.gpu}</p>
                  <p>{item.specs.ram}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/marketplace"><Button variant="outline">Back to Marketplace</Button></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default ListingDetailPage;
