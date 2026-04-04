/**
 * =============================================================================
 * HELP & SUPPORT PAGE — Redirects to the full Support Hub
 * =============================================================================
 */

import { Mail, MessageSquare, FileText, ArrowRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HelpSupportPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
      <p className="text-sm text-muted-foreground">Get help with your account or orders</p>
    </div>

    <div className="space-y-4">
      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 flex items-start gap-4">
        <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">Email Support</h3>
          <p className="text-sm text-muted-foreground">Reach us at support@nyield.com</p>
          <p className="text-xs text-muted-foreground mt-1">Response time: within 24 hours</p>
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 flex items-start gap-4">
        <MessageSquare className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">Live Chat</h3>
          <p className="text-sm text-muted-foreground">Chat with our team in real-time</p>
          <Link to="/messages" className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline">
            Open Messages <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 flex items-start gap-4">
        <FileText className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">FAQ & Documentation</h3>
          <p className="text-sm text-muted-foreground">Browse common questions and guides</p>
          <Link to="/faq" className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline">
            View FAQ <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <Link
        to="/support"
        className="flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
      >
        <HelpCircle className="h-4 w-4" />
        Open Full Support Hub
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </div>
);

export default HelpSupportPage;
