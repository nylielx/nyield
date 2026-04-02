/**
 * =============================================================================
 * SELLER SETTINGS PAGE — Account, compliance, and integration settings
 * =============================================================================
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  CreditCard,
  FileText,
  Globe,
  Users,
  Zap,
  ExternalLink,
} from "lucide-react";

const settingsSections = [
  {
    icon: CreditCard,
    title: "Payment & Stripe",
    description: "Connect your Stripe account for payouts and payment processing.",
    action: "Connect",
    ready: false,
  },
  {
    icon: FileText,
    title: "Financial Reports",
    description: "Export revenue, P&L, VAT, and accounting data as CSV.",
    action: "Export",
    ready: true,
  },
  {
    icon: Shield,
    title: "GDPR & Compliance",
    description: "Data handling, customer consent logs, and audit trail.",
    action: "View",
    ready: true,
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Add staff members with role-based access to your seller dashboard.",
    action: "Manage",
    ready: false,
  },
  {
    icon: Globe,
    title: "Marketplace Sync",
    description: "Sync your listings across marketplace channels automatically.",
    action: "Configure",
    ready: false,
  },
  {
    icon: Zap,
    title: "API Access",
    description: "Generate API keys for third-party integrations.",
    action: "Generate",
    ready: false,
  },
];

const SellerSettingsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="text-sm text-muted-foreground">
        Account, integrations, compliance, and team management
      </p>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      {settingsSections.map((section) => (
        <Card key={section.title} className="glass-base">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-muted/50">
                <section.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {section.description}
                </p>
                <Button
                  variant={section.ready ? "outline" : "ghost"}
                  size="sm"
                  className="mt-3 text-xs gap-1.5"
                  disabled={!section.ready}
                >
                  {section.action}
                  {!section.ready && <span className="text-[10px] text-muted-foreground">(Coming Soon)</span>}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default SellerSettingsPage;
