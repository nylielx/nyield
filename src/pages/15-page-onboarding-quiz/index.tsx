/**
 * =============================================================================
 * ONBOARDING QUIZ PAGE — "Need Help Choosing?"
 * =============================================================================
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, RotateCcw } from "lucide-react";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { quizQuestions, generateRecommendation, type QuizAnswers } from "@/data/temp/onboarding-quiz-mock";

const OnboardingQuizPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    document.title = "Need Help Choosing? — nYield";
  }, []);

  const currentQ = quizQuestions[step];
  const totalSteps = quizQuestions.length;
  const progressPct = showResult ? 100 : Math.round((step / totalSteps) * 100);

  const selectOption = (value: string) => {
    if (!currentQ) return;
    if (currentQ.type === "multi") {
      const prev = (answers[currentQ.id] as string[]) ?? [];
      const updated = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
      setAnswers({ ...answers, [currentQ.id]: updated });
    } else {
      setAnswers({ ...answers, [currentQ.id]: value });
    }
  };

  const isSelected = (value: string) => {
    const a = answers[currentQ?.id ?? ""];
    if (Array.isArray(a)) return a.includes(value);
    return a === value;
  };

  const canProceed = () => {
    const a = answers[currentQ?.id ?? ""];
    if (Array.isArray(a)) return a.length > 0;
    return !!a;
  };

  const next = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else setShowResult(true);
  };

  const back = () => {
    if (showResult) { setShowResult(false); return; }
    if (step > 0) setStep(step - 1);
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const result = showResult
    ? generateRecommendation({
        field: answers.field as string,
        userType: answers.userType as string,
        dailyHours: answers.dailyHours as string,
        travelFrequency: answers.travelFrequency as string,
        games: (answers.games as string[]) ?? [],
        playstyle: answers.playstyle as string,
        targetFps: answers.targetFps as string,
      })
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-heading font-bold">
              {showResult ? "Your Recommendation" : "Need Help Choosing?"}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              {showResult
                ? "Based on your answers, here's what we recommend."
                : "Answer a few questions and we'll find the perfect setup for you."}
            </p>
          </motion.div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Step {showResult ? totalSteps : step + 1} of {totalSteps}</span>
              <span>{progressPct}%</span>
            </div>
            <Progress value={progressPct} className="h-1.5" />
          </div>

          <AnimatePresence mode="wait">
            {!showResult && currentQ ? (
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold">{currentQ.question}</h2>
                      <p className="text-sm text-muted-foreground mt-1">{currentQ.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentQ.options.map((opt) => (
                        <motion.button
                          key={opt.value}
                          onClick={() => selectOption(opt.value)}
                          className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                            isSelected(opt.value)
                              ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                              : "border-border/30 bg-muted/10 hover:bg-muted/20 hover:border-border/50"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{opt.emoji}</span>
                            <div>
                              <p className="font-medium text-sm">{opt.label}</p>
                              {opt.description && (
                                <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
                              )}
                            </div>
                          </div>
                          {isSelected(opt.value) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2"
                            >
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>

                    {/* Nav */}
                    <div className="flex justify-between pt-2">
                      <Button variant="ghost" onClick={back} disabled={step === 0} className="gap-1.5">
                        <ArrowLeft className="h-4 w-4" /> Back
                      </Button>
                      <Button onClick={next} disabled={!canProceed()} className="gap-1.5">
                        {step === totalSteps - 1 ? "See Results" : "Next"} <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {/* Recommended OS */}
                <Card className="border-primary/30 bg-card/50 backdrop-blur-md overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Recommended OS</h3>
                    </div>
                    <p className="text-xl font-heading font-bold text-primary">{result.recommendedOs}</p>
                    <p className="text-sm text-muted-foreground mt-1">{result.osReason}</p>
                  </CardContent>
                </Card>

                {/* Build Tier */}
                <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">🖥️</span>
                      <h3 className="font-semibold">Recommended Build</h3>
                    </div>
                    <p className="text-xl font-heading font-bold">{result.buildTierName}</p>
                    <p className="text-sm text-muted-foreground mt-1">{result.buildReason}</p>
                    <Button
                      variant="outline"
                      className="mt-4 gap-1.5"
                      onClick={() => navigate(`/builds/tier-${result.buildTier}`)}
                    >
                      View Build <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Optimisation Level */}
                <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">⚡</span>
                      <h3 className="font-semibold">Optimisation Level</h3>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/30 mb-2">
                      {result.optimisationLevel}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{result.optimisationReason}</p>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button variant="ghost" onClick={restart} className="gap-1.5">
                    <RotateCcw className="h-4 w-4" /> Retake Quiz
                  </Button>
                  <Button onClick={() => navigate("/builds")} className="gap-1.5">
                    Browse All Builds <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default OnboardingQuizPage;
