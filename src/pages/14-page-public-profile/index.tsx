/**
 * =============================================================================
 * PUBLIC USER PROFILE PAGE — /user/:username (eBay-style)
 * =============================================================================
 * Ownership detection uses canonical user.id, not fullName comparison.
 * Profile resolution checks auth registry for dynamically registered users.
 * Reviewer links use canonical reviewerUsername.
 * Message button opens messaging with context.
 * =============================================================================
 */

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Copy, Share2, MessageCircle, MapPin, Calendar, Star,
  Cpu, Monitor, HardDrive, MemoryStick, ExternalLink,
  ShieldCheck, Clock, TrendingUp, Package, Filter,
} from "lucide-react";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getAvatarById } from "@/data/temp/8-user-profile-mock";
import { getUserProfile } from "@/data/temp/profile-mock";
import { marketplaceListings } from "@/data/marketplaceExamples";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

const StarRating = ({ rating, count }: { rating: number; count: number }) => (
  <div className="flex items-center gap-1.5">
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i <= Math.round(rating) ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground/30"}`} />
      ))}
    </div>
    <span className="text-sm font-medium">{rating}</span>
    <span className="text-xs text-muted-foreground">({count} reviews)</span>
  </div>
);

const PublicProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { user: authUser } = useAuth();

  const [reviewSort, setReviewSort] = useState<"newest" | "oldest" | "highest" | "lowest">("newest");
  const [reviewFilter, setReviewFilter] = useState<"all" | "5" | "4" | "3" | "2" | "1">("all");
  const [listingSort, setListingSort] = useState<"newest" | "price-asc" | "price-desc">("newest");

  // Resolve profile — getUserProfile now checks auth registry too
  const profile = username ? getUserProfile(username) : undefined;

  // Own-profile detection: canonical ID check only
  const isOwnProfile = !!(authUser && profile && authUser.id === profile.id);

  // Merge auth context for live data on own profile
  const displayName = isOwnProfile ? authUser!.fullName : profile?.fullName ?? "";
  const displayAvatar = isOwnProfile ? (authUser!.avatar ?? profile?.avatar ?? "dragon") : (profile?.avatar ?? "dragon");
  const displayAvatarUrl = isOwnProfile ? authUser!.avatarUrl : profile?.avatarUrl;

  if (!username || !profile) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-28 pb-16 text-center">
          <p className="text-lg font-medium text-foreground mb-2">User not found</p>
          <p className="text-muted-foreground text-sm">The profile you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="text-primary text-sm hover:underline mt-4 inline-block">← Back to home</Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const avatar = getAvatarById(displayAvatar);
  const userListings = marketplaceListings.filter((l) => profile.listings.includes(l.id));

  const filteredReviews = profile.reviews
    .filter((r) => reviewFilter === "all" || r.rating === Number(reviewFilter))
    .sort((a, b) => {
      switch (reviewSort) {
        case "newest": return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest": return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest": return b.rating - a.rating;
        case "lowest": return a.rating - b.rating;
        default: return 0;
      }
    });

  const sortedListings = [...userListings].sort((a, b) => {
    switch (listingSort) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      default: return 0;
    }
  });

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied!", description: "Share this profile with anyone." });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-16">
        <motion.div className="max-w-5xl mx-auto px-6 space-y-6" variants={stagger} initial="hidden" animate="show">

          {/* ── HEADER CARD ── */}
          <motion.div variants={fadeUp}>
            <Card className="overflow-hidden border-border/30 bg-card/50 backdrop-blur-md">
              <div className="h-20 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent" />
              <CardContent className="-mt-10 px-6 pb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-card border-4 border-background flex items-center justify-center text-4xl shadow-lg overflow-hidden">
                    {displayAvatarUrl ? (
                      <img src={displayAvatarUrl} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      avatar.emoji
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-2xl font-heading font-bold">{displayName}</h1>
                      {profile.verified && (
                        <Badge className="bg-primary/10 text-primary border-primary/30 text-[10px] gap-1">
                          <ShieldCheck className="h-3 w-3" /> Verified
                        </Badge>
                      )}
                      {isOwnProfile && (
                        <Badge variant="outline" className="text-[10px] border-border/30">Your Profile</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">@{profile.username}</p>
                    <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {profile.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Member since {new Date(profile.joinDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>
                    </div>
                    <StarRating rating={profile.rating} count={profile.reviews.length} />
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {!isOwnProfile && authUser && (
                      <Link to={`/messages?to=${profile.username}`}>
                        <Button size="sm" className="gap-1.5">
                          <MessageCircle className="h-3.5 w-3.5" /> Message
                        </Button>
                      </Link>
                    )}
                    {!isOwnProfile && !authUser && (
                      <Link to="/signin">
                        <Button size="sm" className="gap-1.5">
                          <MessageCircle className="h-3.5 w-3.5" /> Message
                        </Button>
                      </Link>
                    )}
                    {isOwnProfile && (
                      <Link to="/account/profile">
                        <Button size="sm" variant="outline" className="gap-1.5">
                          Edit Profile
                        </Button>
                      </Link>
                    )}
                    <Button size="sm" variant="outline" onClick={copyLink} className="gap-1.5">
                      <Copy className="h-3.5 w-3.5" /> Copy Link
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5" onClick={() => toast({ title: "Share", description: "Share feature coming soon (demo)" })}>
                      <Share2 className="h-3.5 w-3.5" /> Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ── TRUST STATS BAR ── */}
          <motion.div variants={fadeUp}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Package, label: "Total Sales", value: profile.stats.totalSales.toString() },
                { icon: Clock, label: "Response Time", value: profile.stats.responseTime },
                { icon: TrendingUp, label: "Completion", value: `${profile.stats.completionRate}%` },
                { icon: Star, label: "Rating", value: `${profile.rating} / 5` },
              ].map(({ icon: Icon, label, value }) => (
                <Card key={label} className="border-border/30 bg-card/50 backdrop-blur-md">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">{value}</p>
                      <p className="text-[10px] text-muted-foreground">{label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* ── TABBED CONTENT ── */}
          <motion.div variants={fadeUp}>
            <Tabs defaultValue="listings" className="space-y-4">
              <TabsList className="bg-muted/20 border border-border/30">
                <TabsTrigger value="listings">Listings ({userListings.length})</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({profile.reviews.length})</TabsTrigger>
                <TabsTrigger value="setup">PC Setup</TabsTrigger>
              </TabsList>

              <TabsContent value="listings">
                {userListings.length === 0 ? (
                  <Card className="border-border/30 bg-card/50"><CardContent className="p-8 text-center text-muted-foreground text-sm">No listings yet.</CardContent></Card>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                      <Select value={listingSort} onValueChange={(v) => setListingSort(v as typeof listingSort)}>
                        <SelectTrigger className="w-[160px] h-8 text-xs bg-muted/20 border-border/30">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="price-asc">Price: Low → High</SelectItem>
                          <SelectItem value="price-desc">Price: High → Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-xs text-muted-foreground ml-auto">{sortedListings.length} listing{sortedListings.length !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sortedListings.map((listing) => (
                        <Link key={listing.id} to={`/marketplace/${listing.id}`}>
                          <Card className="border-border/30 bg-card/50 backdrop-blur-md hover:border-primary/30 transition-all group">
                            <CardContent className="p-4 space-y-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{listing.title}</h3>
                                  <p className="text-xs text-muted-foreground mt-0.5">{listing.condition} · {listing.bestFor}</p>
                                </div>
                                <span className="text-lg font-bold text-primary">£{listing.price.toLocaleString()}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><Cpu className="h-3 w-3" /> {listing.specs.cpu}</span>
                                <span className="flex items-center gap-1"><Monitor className="h-3 w-3" /> {listing.specs.gpu}</span>
                                <span className="flex items-center gap-1"><MemoryStick className="h-3 w-3" /> {listing.specs.ram}</span>
                                <span className="flex items-center gap-1"><HardDrive className="h-3 w-3" /> {listing.specs.storage}</span>
                              </div>
                              <div className="flex gap-1.5">
                                {listing.tags.map((t) => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="about">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                    <CardContent className="p-5 space-y-3">
                      <h3 className="font-semibold text-sm">Bio</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
                      <Separator className="bg-border/30" />
                      <h3 className="font-semibold text-sm">🎮 Gaming Preferences</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Playstyle</span><Badge variant="outline" className="capitalize">{profile.gaming.playstyle}</Badge></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Target FPS</span><span>{profile.gaming.targetFps} FPS</span></div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.gaming.favouriteGames.map((g) => <Badge key={g} variant="secondary" className="text-xs">{g}</Badge>)}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                    <CardContent className="p-5 space-y-3">
                      <h3 className="font-semibold text-sm">🔗 Social Links</h3>
                      {profile.socialLinks.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No social links added.</p>
                      ) : (
                        <div className="space-y-2">
                          {profile.socialLinks.map((link) => (
                            <div key={link.platform} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/20">
                              <span className="text-lg">{link.emoji}</span>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{link.platform}</p>
                                <p className="text-xs text-muted-foreground">{link.username}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                    <Select value={reviewFilter} onValueChange={(v) => setReviewFilter(v as typeof reviewFilter)}>
                      <SelectTrigger className="w-[130px] h-8 text-xs bg-muted/20 border-border/30">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="5">⭐ 5 Stars</SelectItem>
                        <SelectItem value="4">⭐ 4 Stars</SelectItem>
                        <SelectItem value="3">⭐ 3 Stars</SelectItem>
                        <SelectItem value="2">⭐ 2 Stars</SelectItem>
                        <SelectItem value="1">⭐ 1 Star</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={reviewSort} onValueChange={(v) => setReviewSort(v as typeof reviewSort)}>
                      <SelectTrigger className="w-[140px] h-8 text-xs bg-muted/20 border-border/30">
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="highest">Highest Rated</SelectItem>
                        <SelectItem value="lowest">Lowest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-xs text-muted-foreground ml-auto">{filteredReviews.length} of {profile.reviews.length} reviews</span>
                  </div>

                  {filteredReviews.length === 0 ? (
                    <Card className="border-border/30 bg-card/50">
                      <CardContent className="p-8 text-center text-muted-foreground text-sm">
                        No reviews match the selected filter.
                      </CardContent>
                    </Card>
                  ) : (
                    filteredReviews.map((review) => {
                      const reviewerAvatar = getAvatarById(review.reviewerAvatar);
                      return (
                        <Card key={review.id} className="border-border/30 bg-card/50 backdrop-blur-md">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-9 h-9 rounded-full bg-muted/30 flex items-center justify-center text-lg">{reviewerAvatar.emoji}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Link to={`/user/${review.reviewerUsername}`} className="text-sm font-medium hover:text-primary transition-colors">{review.reviewerName}</Link>
                                  <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className={`h-3 w-3 ${i <= review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground/20"}`} />)}
                                  </div>
                                  <span className="text-[10px] text-muted-foreground">{new Date(review.date).toLocaleDateString("en-GB")}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">Re: {review.listingTitle}</p>
                                <p className="text-sm mt-1.5">{review.comment}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  )}
                </div>
              </TabsContent>

              <TabsContent value="setup">
                <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-semibold text-sm">🖥️ Current PC Setup</h3>
                    <div className="space-y-2.5 text-sm">
                      {[
                        { icon: Cpu, label: "CPU", value: profile.pcSpecs.cpu },
                        { icon: Monitor, label: "GPU", value: profile.pcSpecs.gpu },
                        { icon: MemoryStick, label: "RAM", value: profile.pcSpecs.ram },
                        { icon: HardDrive, label: "Storage", value: profile.pcSpecs.storage },
                        { icon: Monitor, label: "Monitor", value: profile.pcSpecs.monitor },
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
                      <Badge className="bg-primary/10 text-primary border-primary/30">{profile.pcSpecs.os}</Badge>
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

export default PublicProfilePage;
