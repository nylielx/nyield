/**
 * =============================================================================
 * DASHBOARD PAGE — User overview with XP, activity, and quick actions
 * =============================================================================
 */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Trophy, Cpu, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboard } from "./hooks/use-dashboard";
import { DashboardStats } from "./components/dashboard-stats";
import { DashboardActivity } from "./components/dashboard-activity";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { defaultUserXp, getLevelFromXp, getLevelProgress, achievementsMock, xpLevels } from "@/data/temp/xp-gamification-mock";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

const DashboardPage = () => {
  const { user, isBusiness } = useAuth();
  const { data, loading } = useDashboard();

  if (loading || !data) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-muted/30 rounded animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-muted/30 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-muted/30 rounded-lg animate-pulse" />
      </div>
    );
  }

  const firstName = user?.fullName?.split(" ")[0] ?? "User";
  const memberDate = user?.memberSince
    ? new Date(user.memberSince).toLocaleDateString("en-GB", { month: "long", year: "numeric" })
    : "—";

  const level = getLevelFromXp(defaultUserXp);
  const progress = getLevelProgress(defaultUserXp);
  const nextLevel = xpLevels.find((l) => l.id === level.id + 1);
  const recentAchievements = achievementsMock.filter((a) => a.unlocked).slice(-3);

  return (
    <motion.div className="space-y-6" variants={stagger} initial="hidden" animate="show">
      {/* Welcome */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {firstName}
          </h1>
          {isBusiness && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
              Business
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Member since {memberDate}
        </p>
      </motion.div>

      {/* XP + Level Card */}
      <motion.div variants={fadeUp}>
        <Card className="border-border/30 bg-card/50 backdrop-blur-md overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xl">
                  {level.emoji}
                </div>
                <div>
                  <p className="font-semibold text-sm">Level {level.id} — {level.name}</p>
                  <p className="text-xs text-muted-foreground">{defaultUserXp.toLocaleString()} XP</p>
                </div>
              </div>
              {nextLevel && (
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Next: {nextLevel.emoji} {nextLevel.name}</p>
                  <p className="text-xs text-muted-foreground">{nextLevel.minXp - defaultUserXp} XP to go</p>
                </div>
              )}
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "PC Analyzer", emoji: "🔬", to: "/pc-analyzer", desc: "Check your specs" },
          { label: "Find My Setup", emoji: "🧠", to: "/quiz", desc: "Take the quiz" },
          { label: "Community", emoji: "🌍", to: "/community", desc: "Discover users" },
          { label: "Leaderboard", emoji: "🏆", to: "/community", desc: "See rankings" },
        ].map((action) => (
          <Link key={action.to + action.label} to={action.to}>
            <Card className="border-border/30 bg-card/50 backdrop-blur-md hover:bg-card/70 hover:border-border/50 transition-all group cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <span className="text-2xl group-hover:scale-110 transition-transform">{action.emoji}</span>
                <p className="text-sm font-medium">{action.label}</p>
                <p className="text-[10px] text-muted-foreground">{action.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </motion.div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-primary" /> Recent Achievements
            </h2>
            <Link to="/account/profile" className="text-xs text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recentAchievements.map((ach) => (
              <Card key={ach.id} className="border-border/30 bg-card/50 backdrop-blur-md">
                <CardContent className="p-3 flex items-center gap-3">
                  <span className="text-2xl">{ach.emoji}</span>
                  <div>
                    <p className="text-sm font-medium">{ach.title}</p>
                    <p className="text-[10px] text-muted-foreground">+{ach.xpReward} XP</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div variants={fadeUp}>
        <DashboardStats {...data.stats} />
      </motion.div>

      {/* Activity */}
      <motion.div variants={fadeUp}>
        <DashboardActivity activities={data.recentActivity} />
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
