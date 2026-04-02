/**
 * =============================================================================
 * PC ANALYZER PAGE — Input specs → performance analysis
 * =============================================================================
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Monitor, MemoryStick, HardDrive, Zap, AlertTriangle, ArrowUp, TrendingUp } from "lucide-react";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cpuOptions, gpuOptions, ramOptions, storageOptions, analyzeSpecs, type AnalysisResult } from "@/data/temp/pc-analyzer-mock";

const severityColor: Record<string, string> = {
  none: "text-green-400",
  mild: "text-yellow-400",
  moderate: "text-orange-400",
  severe: "text-destructive",
};

const priorityBadge: Record<string, string> = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  low: "bg-muted text-muted-foreground border-border/30",
};

const PcAnalyzerPage = () => {
  const [cpu, setCpu] = useState("");
  const [gpu, setGpu] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => { document.title = "PC Analyzer — nYield"; }, []);

  const canAnalyze = cpu && gpu && ram && storage;

  const runAnalysis = async () => {
    if (!canAnalyze) return;
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setResult(analyzeSpecs({ cpu, gpu, ram, storage }));
    setAnalyzing(false);
  };

  const scoreColor = (s: number) => s >= 80 ? "text-green-400" : s >= 50 ? "text-yellow-400" : "text-destructive";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-3xl font-heading font-bold">🔬 PC Analyzer</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Input your specs and get a full performance breakdown with upgrade suggestions.
            </p>
          </motion.div>

          {/* Spec Input */}
          <Card className="border-border/30 bg-card/50 backdrop-blur-md">
            <CardContent className="p-6">
              <h2 className="font-semibold mb-4">Enter Your Specs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "CPU", icon: Cpu, value: cpu, setter: setCpu, options: cpuOptions },
                  { label: "GPU", icon: Monitor, value: gpu, setter: setGpu, options: gpuOptions },
                  { label: "RAM", icon: MemoryStick, value: ram, setter: setRam, options: ramOptions },
                  { label: "Storage", icon: HardDrive, value: storage, setter: setStorage, options: storageOptions },
                ].map(({ label, icon: Icon, value, setter, options }) => (
                  <div key={label} className="space-y-1.5">
                    <Label className="flex items-center gap-1.5 text-sm">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" /> {label}
                    </Label>
                    <Select value={value} onValueChange={setter}>
                      <SelectTrigger><SelectValue placeholder={`Select ${label}`} /></SelectTrigger>
                      <SelectContent>
                        {options.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
              <Button onClick={runAnalysis} disabled={!canAnalyze || analyzing} className="mt-6 w-full gap-2">
                {analyzing ? (
                  <><span className="animate-spin">⚡</span> Analyzing...</>
                ) : (
                  <><Zap className="h-4 w-4" /> Analyze My PC</>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Overall Score */}
                <Card className="border-primary/30 bg-card/50 backdrop-blur-md overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Overall Performance Score</h3>
                      <span className={`text-4xl font-heading font-bold ${scoreColor(result.overallScore)}`}>
                        {result.overallScore}
                      </span>
                    </div>
                    <Progress value={result.overallScore} className="h-3 mb-4" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: "CPU", score: result.cpuScore },
                        { label: "GPU", score: result.gpuScore },
                        { label: "RAM", score: result.ramScore },
                        { label: "Storage", score: result.storageScore },
                      ].map(({ label, score }) => (
                        <div key={label} className="text-center p-3 rounded-lg bg-muted/20">
                          <p className="text-xs text-muted-foreground">{label}</p>
                          <p className={`text-xl font-bold ${scoreColor(score)}`}>{score}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Bottleneck */}
                <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className={`h-4 w-4 ${severityColor[result.bottleneckSeverity]}`} />
                      <h3 className="font-semibold">Bottleneck Analysis</h3>
                    </div>
                    <p className={`text-sm ${severityColor[result.bottleneckSeverity]}`}>{result.bottleneck}</p>
                    <Badge variant="outline" className="mt-2 capitalize">{result.bottleneckSeverity}</Badge>
                  </CardContent>
                </Card>

                {/* FPS Estimates */}
                <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold">Estimated FPS</h3>
                    </div>
                    <div className="space-y-2">
                      {result.fpsEstimates.map((est) => (
                        <div key={est.game} className="flex items-center justify-between p-3 rounded-lg bg-muted/15">
                          <div>
                            <p className="text-sm font-medium">{est.game}</p>
                            <p className="text-xs text-muted-foreground">{est.resolution} • {est.settings}</p>
                          </div>
                          <span className={`text-lg font-bold ${est.fps >= 144 ? "text-green-400" : est.fps >= 60 ? "text-yellow-400" : "text-destructive"}`}>
                            {est.fps} FPS
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upgrade Suggestions */}
                {result.upgradeSuggestions.length > 0 && (
                  <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <ArrowUp className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold">Upgrade Suggestions</h3>
                      </div>
                      <div className="space-y-3">
                        {result.upgradeSuggestions.map((sug) => (
                          <div key={sug.component} className="p-4 rounded-lg bg-muted/15 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{sug.component}</span>
                              <Badge variant="outline" className={priorityBadge[sug.priority]}>{sug.priority}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{sug.current} → <span className="text-foreground">{sug.suggested}</span></p>
                            <p className="text-xs text-primary">{sug.expectedGain}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Recommended OS */}
                <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Recommended OS</p>
                      <p className="font-semibold text-primary">{result.recommendedOs}</p>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/30">Best Match</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default PcAnalyzerPage;
