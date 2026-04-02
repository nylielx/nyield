/**
 * =============================================================================
 * AFFILIATE DASHBOARD — ExitLag-style affiliate program
 * =============================================================================
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Copy, Gift, DollarSign, TrendingUp, Users, Download,
  ExternalLink, Search, ChevronRight, Award, Zap,
  CreditCard, AlertTriangle, CheckCircle, Clock,
  FileText, Video, Image as ImageIcon, BookOpen,
} from "lucide-react";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import {
  affiliateDataMock, affiliateLevels, rewardsMock,
  redemptionsMock, materialsMock,
} from "@/data/temp/affiliate-mock";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

const data = affiliateDataMock;

const AffiliatePage = () => {
  useEffect(() => { document.title = "Affiliate Dashboard — nYield"; }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(data.referralLink);
    toast({ title: "Referral link copied!", description: "Share it with your friends to earn commissions." });
  };

  const nextLevel = affiliateLevels.find((l) => l.minSales > data.totalReferrals) ?? affiliateLevels[affiliateLevels.length - 1];
  const levelProgress = nextLevel.minSales > 0 ? (data.totalReferrals / nextLevel.minSales) * 100 : 100;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-16">
        <motion.div className="max-w-5xl mx-auto px-6 space-y-6" variants={stagger} initial="hidden" animate="show">

          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-3 mb-2">
              <Award className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-heading font-bold">Affiliate Dashboard</h1>
            </div>
            <p className="text-sm text-muted-foreground">Earn commissions by referring customers to nYield.</p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-muted/20 border border-border/30 flex-wrap h-auto gap-1 p-1">
                <TabsTrigger value="overview">My Affiliate</TabsTrigger>
                <TabsTrigger value="rewards">Rewards Store</TabsTrigger>
                <TabsTrigger value="indications">Indications</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="balance">My Balance</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
              </TabsList>

              {/* ══ MY AFFILIATE ══ */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Level Card */}
                  <Card className="border-border/30 bg-card/50 backdrop-blur-md col-span-1">
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{data.level.emoji}</span>
                        <Badge variant="outline" className="text-xs">Level {data.level.id}</Badge>
                      </div>
                      <h3 className="text-lg font-bold">{data.level.name}</h3>
                      <p className="text-xs text-muted-foreground">Next: {nextLevel.name} ({nextLevel.minSales} sales)</p>
                      <Progress value={levelProgress} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{data.totalReferrals} sales</span>
                        <span>{nextLevel.minSales} needed</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Balance Card */}
                  <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold">Balance</span>
                      </div>
                      <p className="text-3xl font-bold text-primary">£{data.balance.available.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">Available to withdraw</p>
                      <Button size="sm" className="w-full">Redeem</Button>
                    </CardContent>
                  </Card>

                  {/* Benefits Card */}
                  <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                    <CardContent className="p-5 space-y-3">
                      <h3 className="text-sm font-semibold">Your Benefits</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Commission</span><span className="font-medium">{data.level.commission}%</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Rewards Store</span><span className="text-green-400">✓ Unlocked</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Media Kit</span><span className="text-green-400">✓ Access</span></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Challenges */}
                <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                  <CardContent className="p-5 space-y-4">
                    <h3 className="text-sm font-semibold flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Active Challenges</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {data.challenges.map((ch) => (
                        <div key={ch.id} className="p-3 rounded-xl bg-muted/10 border border-border/20 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{ch.emoji}</span>
                            <span className="text-sm font-medium">{ch.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{ch.description}</p>
                          <Progress value={(ch.current / ch.target) * 100} className="h-1.5" />
                          <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>{ch.current}/{ch.target}</span>
                            <span className="text-primary">{ch.reward}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Referral Banner */}
                <Card className="border-primary/20 bg-primary/5 backdrop-blur-md">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">Invite friends. Earn rewards your way.</h3>
                        <p className="text-xs text-muted-foreground mt-1">Share your unique referral link and earn {data.level.commission}% on every sale.</p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Input readOnly value={data.referralLink} className="text-xs bg-background/50 border-border/30 flex-1 sm:w-64" />
                        <Button size="sm" onClick={copyCode} className="gap-1 shrink-0"><Copy className="h-3.5 w-3.5" /> Copy</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ══ REWARDS STORE ══ */}
              <TabsContent value="rewards" className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Your balance: <span className="font-bold text-foreground">£{data.balance.available.toFixed(2)}</span></p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {rewardsMock.map((rw) => (
                    <Card key={rw.id} className="border-border/30 bg-card/50 backdrop-blur-md overflow-hidden">
                      <CardContent className="p-0">
                        <div className="h-24 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                          <span className="text-4xl">{rw.image}</span>
                        </div>
                        <div className="p-4 space-y-2">
                          <Badge variant="secondary" className="text-[10px]">{rw.discount}</Badge>
                          <p className="text-sm font-semibold">{rw.name}</p>
                          <p className="text-xs text-muted-foreground">{rw.category} · {rw.costPoints} pts</p>
                          <Button size="sm" variant={rw.available ? "default" : "outline"} disabled={!rw.available} className="w-full text-xs">
                            {rw.available ? "Redeem" : "No Balance"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* ══ INDICATIONS (EARNINGS) ══ */}
              <TabsContent value="indications" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { label: "Available", value: `£${data.balance.available.toFixed(2)}`, icon: DollarSign },
                    { label: "Maturation", value: `£${data.balance.maturation.toFixed(2)}`, icon: Clock },
                    { label: "Total Earnings", value: `£${data.totalEarnings.toFixed(2)}`, icon: TrendingUp },
                  ].map(({ label, value, icon: Icon }) => (
                    <Card key={label} className="border-border/30 bg-card/50 backdrop-blur-md">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Icon className="h-4 w-4 text-primary" /></div>
                        <div><p className="text-lg font-bold">{value}</p><p className="text-[10px] text-muted-foreground">{label}</p></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold mb-3">Commission History</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead><tr className="text-xs text-muted-foreground border-b border-border/20">
                          <th className="text-left p-2">Date</th><th className="text-left p-2">Referral</th><th className="text-left p-2">Product</th><th className="text-right p-2">Amount</th><th className="text-right p-2">Status</th>
                        </tr></thead>
                        <tbody>
                          {data.commissions.map((c) => (
                            <tr key={c.id} className="border-b border-border/10">
                              <td className="p-2 text-muted-foreground">{new Date(c.date).toLocaleDateString("en-GB")}</td>
                              <td className="p-2">{c.referralName}</td>
                              <td className="p-2 text-muted-foreground">{c.product}</td>
                              <td className="p-2 text-right font-medium">£{c.amount.toFixed(2)}</td>
                              <td className="p-2 text-right">
                                <Badge variant={c.status === "confirmed" ? "default" : "outline"} className="text-[10px]">{c.status}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ══ BENEFITS ══ */}
              <TabsContent value="benefits" className="space-y-4">
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">Redeem Your Free Codes</h3>
                      <p className="text-xs text-muted-foreground mt-1">As a {data.level.name} affiliate, you have access to exclusive free codes.</p>
                    </div>
                    <Button size="sm" className="gap-1"><Gift className="h-3.5 w-3.5" /> Redeem Code</Button>
                  </CardContent>
                </Card>

                <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold mb-3">Redemption History</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead><tr className="text-xs text-muted-foreground border-b border-border/20">
                          <th className="text-left p-2">Code</th><th className="text-left p-2">Plan</th><th className="text-left p-2">Date</th><th className="text-right p-2">Status</th>
                        </tr></thead>
                        <tbody>
                          {redemptionsMock.map((r) => (
                            <tr key={r.id} className="border-b border-border/10">
                              <td className="p-2 font-mono text-xs">{r.code}</td>
                              <td className="p-2">{r.plan}</td>
                              <td className="p-2 text-muted-foreground">{new Date(r.requestDate).toLocaleDateString("en-GB")}</td>
                              <td className="p-2 text-right">
                                <Badge variant={r.status === "active" ? "default" : "outline"} className="text-[10px]">{r.status}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ══ MY BALANCE ══ */}
              <TabsContent value="balance" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { label: "Available", value: `£${data.balance.available.toFixed(2)}`, colour: "text-green-400" },
                    { label: "Maturation", value: `£${data.balance.maturation.toFixed(2)}`, colour: "text-yellow-400" },
                    { label: "Withdrawn", value: `£${data.balance.withdrawn.toFixed(2)}`, colour: "text-muted-foreground" },
                  ].map(({ label, value, colour }) => (
                    <Card key={label} className="border-border/30 bg-card/50 backdrop-blur-md">
                      <CardContent className="p-4 text-center">
                        <p className={`text-2xl font-bold ${colour}`}>{value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Payment setup */}
                <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold">Payment Method</h3>
                    </div>
                    {!data.paypalEmail ? (
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-500">No payment method configured</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Add your PayPal to withdraw earnings.</p>
                        </div>
                      </div>
                    ) : null}
                    <div className="flex gap-2">
                      <Input placeholder="your@email.com" className="flex-1 bg-muted/20 border-border/30" />
                      <Button size="sm">Add Account</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Withdrawal history */}
                <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold mb-3">Withdrawal History</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead><tr className="text-xs text-muted-foreground border-b border-border/20">
                          <th className="text-left p-2">Date</th><th className="text-left p-2">Method</th><th className="text-right p-2">Amount</th><th className="text-right p-2">Status</th>
                        </tr></thead>
                        <tbody>
                          {data.withdrawals.map((w) => (
                            <tr key={w.id} className="border-b border-border/10">
                              <td className="p-2 text-muted-foreground">{new Date(w.date).toLocaleDateString("en-GB")}</td>
                              <td className="p-2">{w.method}</td>
                              <td className="p-2 text-right font-medium">£{w.amount.toFixed(2)}</td>
                              <td className="p-2 text-right">
                                <Badge variant={w.status === "completed" ? "default" : "outline"} className="text-[10px]">{w.status}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ══ MATERIALS ══ */}
              <TabsContent value="materials" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {materialsMock.map((m) => (
                    <Card key={m.id} className="border-border/30 bg-card/50 backdrop-blur-md">
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">{m.emoji}</div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{m.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{m.description}</p>
                          <Button size="sm" variant="outline" className="mt-2 text-xs gap-1">
                            <Download className="h-3 w-3" /> Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Separator className="bg-border/20" />

                {/* Affiliate Bot */}
                <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🤖</span>
                      <h3 className="text-sm font-semibold">Affiliate Bot</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-muted/10 border border-border/20">
                        <p className="text-sm font-medium">What it does</p>
                        <p className="text-xs text-muted-foreground mt-1">Automatically tracks clicks, conversions, and commissions from your referral links across all platforms.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/10 border border-border/20">
                        <p className="text-sm font-medium">How to use it</p>
                        <p className="text-xs text-muted-foreground mt-1">Simply share your unique referral link. The bot handles attribution, cookie tracking, and commission calculation automatically.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

        </motion.div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default AffiliatePage;
