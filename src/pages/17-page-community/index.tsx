/**
 * =============================================================================
 * COMMUNITY PAGE — Activity feed, leaderboard, discover users
 * =============================================================================
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, Users, Activity, Trophy, Search } from "lucide-react";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAvatarById } from "@/data/temp/8-user-profile-mock";
import { communityProfiles, activityFeedMock, leaderboardMock } from "@/data/temp/gaming-profile-mock";
import { getLevelFromXp } from "@/data/temp/xp-gamification-mock";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const typeColors: Record<string, string> = {
  build: "bg-blue-500/15 text-blue-400",
  purchase: "bg-green-500/15 text-green-400",
  achievement: "bg-yellow-500/15 text-yellow-400",
  review: "bg-purple-500/15 text-purple-400",
  follow: "bg-primary/15 text-primary",
  share: "bg-cyan-500/15 text-cyan-400",
};

const CommunityPage = () => {
  const [search, setSearch] = useState("");

  useEffect(() => { document.title = "Community — nYield"; }, []);

  const filteredProfiles = communityProfiles.filter(
    (p) => p.username.toLowerCase().includes(search.toLowerCase()) || p.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-3xl font-heading font-bold">🌍 Community</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Discover builders, follow gamers, and climb the leaderboard.
            </p>
          </motion.div>

          <Tabs defaultValue="feed" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-6">
              <TabsTrigger value="feed" className="gap-1.5"><Activity className="h-3.5 w-3.5" /> Feed</TabsTrigger>
              <TabsTrigger value="leaderboard" className="gap-1.5"><Trophy className="h-3.5 w-3.5" /> Leaderboard</TabsTrigger>
              <TabsTrigger value="discover" className="gap-1.5"><Users className="h-3.5 w-3.5" /> Discover</TabsTrigger>
            </TabsList>

            {/* ── Activity Feed ── */}
            <TabsContent value="feed">
              <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3 max-w-2xl mx-auto">
                {activityFeedMock.map((item) => {
                  const avatar = getAvatarById(item.avatar);
                  return (
                    <motion.div key={item.id} variants={fadeUp}>
                      <Card className="border-border/30 bg-card/50 backdrop-blur-md hover:bg-card/70 transition-colors">
                        <CardContent className="p-4 flex items-start gap-3">
                          <Link to={`/user/${item.username}`} className="shrink-0">
                            <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center text-lg hover:scale-105 transition-transform">
                              {avatar.emoji}
                            </div>
                          </Link>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">
                              <Link to={`/user/${item.username}`} className="font-medium hover:text-primary transition-colors">
                                {item.username}
                              </Link>{" "}
                              <span className="text-muted-foreground">{item.action}</span>
                            </p>
                            <p className="text-sm text-foreground font-medium mt-0.5">{item.detail}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <Badge variant="outline" className={`text-[10px] ${typeColors[item.type]}`}>
                                {item.type}
                              </Badge>
                              <span className="text-[10px] text-muted-foreground">
                                {new Date(item.timestamp).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>

            {/* ── Leaderboard ── */}
            <TabsContent value="leaderboard">
              <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3 max-w-2xl mx-auto">
                {leaderboardMock
                  .sort((a, b) => b.xp - a.xp)
                  .map((entry, idx) => {
                    const avatar = getAvatarById(entry.avatar);
                    const medals = ["🥇", "🥈", "🥉"];
                    return (
                      <motion.div key={entry.userId} variants={fadeUp}>
                        <Card className={`border-border/30 bg-card/50 backdrop-blur-md ${idx === 0 ? "border-yellow-500/30 shadow-[0_0_15px_hsl(var(--glow)/0.1)]" : ""}`}>
                          <CardContent className="p-4 flex items-center gap-4">
                            <span className="text-2xl w-8 text-center">{medals[idx] ?? `#${idx + 1}`}</span>
                            <Link to={`/user/${entry.username}`} className="shrink-0">
                              <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center text-lg">
                                {avatar.emoji}
                              </div>
                            </Link>
                            <div className="flex-1">
                              <Link to={`/user/${entry.username}`} className="font-medium text-sm hover:text-primary transition-colors">
                                {entry.username}
                              </Link>
                              <p className="text-xs text-muted-foreground">{entry.levelEmoji} {entry.level}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold font-heading">{entry.xp.toLocaleString()}</p>
                              <p className="text-[10px] text-muted-foreground">XP</p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
              </motion.div>
            </TabsContent>

            {/* ── Discover ── */}
            <TabsContent value="discover">
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
                  {filteredProfiles.map((profile) => {
                    const avatar = getAvatarById(profile.avatar);
                    const level = getLevelFromXp(profile.xp);
                    return (
                      <motion.div key={profile.userId} variants={fadeUp}>
                        <Card className="border-border/30 bg-card/50 backdrop-blur-md hover:bg-card/70 transition-colors">
                          <CardContent className="p-4 flex items-center gap-4">
                            <Link to={`/user/${profile.username}`} className="shrink-0">
                              <div className="w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center text-2xl hover:scale-105 transition-transform">
                                {avatar.emoji}
                              </div>
                            </Link>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <Link to={`/user/${profile.username}`} className="font-medium text-sm hover:text-primary transition-colors">
                                  {profile.fullName}
                                </Link>
                                <Badge variant="outline" className="text-[10px] gap-0.5">{level.emoji} {level.name}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground truncate">@{profile.username} • {profile.bio}</p>
                              <div className="flex gap-3 mt-1 text-[10px] text-muted-foreground">
                                <span>{profile.followers} followers</span>
                                <span>{profile.savedBuilds} builds</span>
                              </div>
                            </div>
                            <Button size="sm" variant="outline" className="shrink-0">
                              Follow
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default CommunityPage;
