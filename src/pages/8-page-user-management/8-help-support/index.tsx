/**
 * =============================================================================
 * HELP & SUPPORT PAGE
 * =============================================================================
 */

import { Mail, MessageSquare, FileText } from "lucide-react";

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
          <button className="mt-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium opacity-50 cursor-not-allowed" disabled>
            Start Chat (Coming Soon)
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 flex items-start gap-4">
        <FileText className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">FAQ & Documentation</h3>
          <p className="text-sm text-muted-foreground">Browse common questions and guides</p>
          <button className="mt-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium opacity-50 cursor-not-allowed" disabled>
            View FAQ (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default HelpSupportPage;
