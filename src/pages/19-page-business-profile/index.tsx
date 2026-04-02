/**
 * =============================================================================
 * BUSINESS PROFILE PAGE — /business/:slug (eBay-style)
 * =============================================================================
 * Uses canonical slug for routing. Reviewer links use reviewerUsername.
 * Message button includes context. Fails cleanly on invalid slug.
 * =============================================================================
 */

import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MessageCircle, MapPin, Calendar, Star, Copy, Share2,
  Cpu, Monitor, HardDrive, MemoryStick, ExternalLink,
  ShieldCheck, Clock, TrendingUp, Package, Users, BarChart3,
} from "lucide-react";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getBusinessProfile } from "@/data/temp/profile-mock";
import { getAvatarById } from "@/data/temp/8-user-profile-mock";
import { marketplaceListings } from "@/data/marketplaceExamples";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

const BusinessProfilePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user: authUser } = useAuth();

  const profile = slug ? getBusinessProfile(slug) : undefined;

  // Own-business detection
  const isOwnBusiness = !!(authUser && profile && authUser.businessSlug === slug);

  if (!slug || !profile) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-28 pb-16 text-center">
          <p className="text-lg font-medium text-foreground mb-2">Business not found</p>
          <p className="text-muted-foreground text-sm">The business profile you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="text-primary text-sm hover:underline mt-4 inline-block">← Back to home</Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const bizListings = marketplaceListings.filter((l) => profile.listings.includes(l.id));

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied!" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-16">
        <motion.div className="max-w-5xl mx-auto px-6 space-y-6" variants={stagger} initial="hidden" animate="show">

          {/* HEADER */}
          <motion.div variants={fadeUp}>
            <Card className="overflow-hidden border-border/30 bg-card/50 backdrop-blur-md">
              <div className="h-20 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent" />
              <CardContent className="-mt-10 px-6 pb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-card border-4 border-background flex items-center justify-center text-4xl shadow-lg">
                    {profile.logo}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-2xl font-heading font-bold">{profile.name}</h1>
                      {profile.verified && (
                        <Badge className="bg-primary/10 text-primary border-primary/30 text-[10px] gap-1">
                          <ShieldCheck className="h-3 w-3" /> Verified Business
                        </Badge>
                      )}
                      {isOwnBusiness && (
                        <Badge variant="outline" className="text-[10px] border-border/30">Your Business</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{profile.specialisation}</p>
                    <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {profile.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Since {new Date(profile.joinDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => <Star key={i} className={`h-3.5 w-3.5 ${i <= Math.round(profile.rating) ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground/30"}`} />)}
                      </div>
                      <span className="text-sm font-medium">{profile.rating}</span>
                      <span className="text-xs text-muted-foreground">({profile.totalRatings} reviews)</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {!isOwnBusiness && authUser && (
                      <Link to={`/messages?to=${profile.slug}&type=business`}>
                        <Button size="sm" className="gap-1.5"><MessageCircle className="h-3.5 w-3.5" /> Contact</Button>
                      </Link>
                    )}
                    {!isOwnBusiness && !authUser && (
                      <Link to="/signin">
                        <Button size="sm" className="gap-1.5"><MessageCircle className="h-3.5 w-3.5" /> Contact</Button>
                      </Link>
                    )}
                    {isOwnBusiness && (
                      <Link to="/seller">
                        <Button size="sm" variant="outline" className="gap-1.5">Manage Dashboard</Button>
                      </Link>
                    )}
                    <Button size="sm" variant="outline" onClick={copyLink} className="gap-1.5"><Copy className="h-3.5 w-3.5" /> Copy</Button>
                    <Button size="sm" variant="outline" className="gap-1.5" onClick={() => toast({ title: "Share", description: "Share feature coming soon (demo)" })}><Share2 className="h-3.5 w-3.5" /> Share</Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {profile.badges.map((b) => <Badge key={b} variant="secondary" className="text-xs">{b}</Badge>)}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* METRICS */}
          <motion.div variants={fadeUp}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { icon: Package, label: "Total Sales", value: profile.metrics.totalSales.toString() },
                { icon: Clock, label: "Response", value: profile.metrics.responseTime },
                { icon: BarChart3, label: "Avg Score", value: `${profile.metrics.avgBenchmarkScore}/100` },
                { icon: TrendingUp, label: "Completion", value: `${profile.metrics.completionRate}%` },
                { icon: Users, label: "Repeat Buyers", value: profile.metrics.repeatCustomers.toString() },
              ].map(({ icon: Icon, label, value }) => (
                <Card key={label} className="border-border/30 bg-card/50 backdrop-blur-md">
                  <CardContent className="p-3 text-center">
                    <Icon className="h-4 w-4 text-primary mx-auto mb-1" />
                    <p className="text-sm font-bold">{value}</p>
                    <p className="text-[10px] text-muted-foreground">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* TABS */}
          <motion.div variants={fadeUp}>
            <Tabs defaultValue="listings" className="space-y-4">
              <TabsList className="bg-muted/20 border border-border/30">
                <TabsTrigger value="listings">Listings ({bizListings.length})</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({profile.reviews.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="listings">
                {bizListings.length === 0 ? (
                  <Card className="border-border/30 bg-card/50"><CardContent className="p-8 text-center text-muted-foreground text-sm">No listings yet.</CardContent></Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bizListings.map((listing) => (
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
                )}
              </TabsContent>

              <TabsContent value="about">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                    <CardContent className="p-5 space-y-3">
                      <h3 className="font-semibold text-sm">About</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{profile.description}</p>
                      <Separator className="bg-border/30" />
                      <h3 className="font-semibold text-sm">Specialisation</h3>
                      <Badge variant="outline">{profile.specialisation}</Badge>
                    </CardContent>
                  </Card>
                  <Card className="border-border/30 bg-card/50 backdrop-blur-md">
                    <CardContent className="p-5 space-y-3">
                      <h3 className="font-semibold text-sm">🔗 Social Links</h3>
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
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-3">
                  {profile.reviews.map((review) => {
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
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

        </motion.div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default BusinessProfilePage;
