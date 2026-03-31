/**
 * =============================================================================
 * SECURITY PAGE — Account security settings
 * =============================================================================
 */

const SecurityPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Security</h1>
      <p className="text-sm text-muted-foreground">Manage your account security</p>
    </div>

    <div className="space-y-4">
      {/* Password */}
      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5">
        <h3 className="font-semibold text-foreground mb-1">Change Password</h3>
        <p className="text-sm text-muted-foreground mb-3">Update your password regularly for better security.</p>
        <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium opacity-50 cursor-not-allowed" disabled>
          Change Password (Coming Soon)
        </button>
      </div>

      {/* Two-Factor */}
      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5">
        <h3 className="font-semibold text-foreground mb-1">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground mb-3">Add an extra layer of security to your account.</p>
        <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium opacity-50 cursor-not-allowed" disabled>
          Enable 2FA (Coming Soon)
        </button>
      </div>

      {/* Sessions */}
      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5">
        <h3 className="font-semibold text-foreground mb-1">Active Sessions</h3>
        <p className="text-sm text-muted-foreground mb-3">You are currently logged in on this device.</p>
        <div className="text-xs text-muted-foreground">
          <p>🖥 Current Browser · Active now</p>
        </div>
      </div>
    </div>
  </div>
);

export default SecurityPage;
