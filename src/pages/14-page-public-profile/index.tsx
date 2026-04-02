/**
 * =============================================================================
 * PUBLIC PROFILE PAGE — /user/:username
 * =============================================================================
 */

import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Copy, Share2, ExternalLink, Cpu, Monitor, HardDrive, MemoryStick, Users, Heart } from "lucide-react";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { getAvatarById } from "@/data/temp/8-user-profile-mock";
import { communityProfiles, type PublicProfile } from "@/data/temp/gaming-profile-mock";
import { getLevelFromXp, getLevelProgress, achievementsMock } from "@/data/temp/xp-gamification-mock";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const PublicProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const profile = communityProfiles.find((p) => p.username === username) ?? communityProfiles[0];

  const avatar = getAvatarById(profile.avatar);
  const level = getLevelFromXp(profile.xp);
  const progress = getLevelProgress(profile.xp);
  const unlockedAchievements = achievementsMock.filter((a) => a.unlocked);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied!", description: "Share this profile with anyone." });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-16">
        <motion.div
          className="max-w-4xl mx-auto px-6 space-y-8"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* ── Hero Banner ── */}
          <motion.div variants={fadeUp}>
            <Card className="overflow-hidden border-border/30 bg-card/50 backdrop-blur-md">
              <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent" />
              <CardContent className="-mt-12 px-6 pb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-2xl bg-card border-4 border-background flex items-center justify-center text-4xl shadow-lg">
                    {avatar.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-2xl font-heading font-bold">{profile.fullName}</h1>
                      <Badge variant="outline" className="text-xs gap-1">
                        {level.emoji} {level.name}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">@{profile.username}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={copyLink} className="gap-1.5">
                      <Copy className="h-3.5 w-3.5" /> Copy Link
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <Share2 className="h-3.5 w-3.5" /> Share
                    </Button>
                    <Button size="sm" className="gap-1.5">
                      <Users className="h-3.5 w-3.5" /> Follow
                    </Button>
                  </div>
                </div>

                {/* Bio + Stats */}
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
                <div className="flex gap-6 mt-3 text-sm">
                  <span className="text-foreground font-medium">{profile.followers} <span className="text-muted-foreground font-normal">followers</span></span>
                  <span className="text-foreground font-medium">{profile.following} <span className="text-muted-foreground font-normal">following</span></span>
                  <span className="text-foreground font-medium">{profile.savedBuilds} <span className="text-muted-foreground font-normal">builds</span></span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ── XP Progress ── */}
          <motion.div variants={fadeUp}>
            <Card className="border-border/30 bg-card/50 backdrop-blur-md">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    {level.emoji} Level {level.id} — {level.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">{profile.xp} / {level.maxXp} XP</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1.5">
                  {level.maxXp - profile.xp} XP to next level
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ── Gaming Profile ── */}
            <motion.div variants={fadeUp}>
              <Card className="border-border/30 bg-card/50 backdrop-blur-md h-full">
                <CardContent className="p-5 space-y-4">
                  <h3 className="font-semibold text-sm">🎮 Gaming Profile</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Playstyle</span>
                      <Badge variant="outline" className="capitalize">{profile.gaming.playstyle}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily Hours</span>
                      <span>{profile.gaming.dailyHours}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Target FPS</span>
                      <span>{profile.gaming.targetFps} FPS</span>
                    </div>
                  </div>
                  <Separator className="bg-border/30" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Favourite Games</p>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.gaming.favouriteGames.map((g) => (
                        <Badge key={g} variant="secondary" className="text-xs">{g}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ── PC Setup ── */}
            <motion.div variants={fadeUp}>
              <Card className="border-border/30 bg-card/50 backdrop-blur-md h-full">
                <CardContent className="p-5 space-y-4">
                  <h3 className="font-semibold text-sm">🖥️ PC Setup</h3>
                  <div className="space-y-2.5 text-sm">
                    {[
                      { icon: Cpu, label: "CPU", value: profile.pcSetup.cpu },
                      { icon: Monitor, label: "GPU", value: profile.pcSetup.gpu },
                      { icon: MemoryStick, label: "RAM", value: profile.pcSetup.ram },
                      { icon: HardDrive, label: "Storage", value: profile.pcSetup.storage },
                      { icon: Monitor, label: "Monitor", value: profile.pcSetup.monitor },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center gap-3">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground w-16">{label}</span>
                        <span className="text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="bg-border/30" />
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">OS</span>
                    <Badge className="bg-primary/10 text-primary border-primary/30">{profile.pcSetup.os}</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ── Social Links ── */}
            <motion.div variants={fadeUp}>
              <Card className="border-border/30 bg-card/50 backdrop-blur-md h-full">
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-semibold text-sm">🔗 Social Links</h3>
                  {profile.socialLinks.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No social links added yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {profile.socialLinks.map((link) => (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors group"
                        >
                          <span className="text-lg">{link.emoji}</span>
                          <div className="flex-1">
                            <p className="text-sm font-medium capitalize">{link.platform}</p>
                            <p className="text-xs text-muted-foreground">{link.username}</p>
                          </div>
                          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* ── Achievements ── */}
            <motion.div variants={fadeUp}>
              <Card className="border-border/30 bg-card/50 backdrop-blur-md h-full">
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-semibold text-sm">🏆 Achievements</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {unlockedAchievements.slice(0, 6).map((ach) => (
                      <div key={ach.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/20">
                        <span className="text-lg">{ach.emoji}</span>
                        <div>
                          <p className="text-xs font-medium">{ach.title}</p>
                          <p className="text-[10px] text-muted-foreground">+{ach.xpReward} XP</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Member since */}
          <motion.div variants={fadeUp} className="text-center text-xs text-muted-foreground pt-4">
            Member since {new Date(profile.memberSince).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
          </motion.div>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default PublicProfilePage;
