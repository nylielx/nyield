/**
 * =============================================================================
 * DISPATCH LEAD TIMES — Compact performance table
 * =============================================================================
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dispatchLeadTimes } from "../data/orders-mock";

export const DispatchLeadTimes = () => (
  <Card className="glass-base">
    <CardHeader className="pb-3">
      <CardTitle className="text-sm font-semibold text-foreground">Orders Dispatched Within</CardTitle>
      <p className="text-xs text-muted-foreground">Current average production and dispatch times</p>
    </CardHeader>
    <CardContent>
      <div className="rounded-lg border border-border/50 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-muted/20 border-b border-border/50">
              <th className="text-left px-3 py-2 font-medium text-muted-foreground">Category</th>
              <th className="text-center px-3 py-2 font-medium text-muted-foreground">7 days</th>
              <th className="text-center px-3 py-2 font-medium text-muted-foreground">14 days</th>
              <th className="text-center px-3 py-2 font-medium text-muted-foreground">21 days</th>
              <th className="text-center px-3 py-2 font-medium text-muted-foreground">28 days</th>
              <th className="text-center px-3 py-2 font-medium text-primary">Average</th>
            </tr>
          </thead>
          <tbody>
            {dispatchLeadTimes.map((row) => (
              <tr key={row.category} className="border-b border-border/30 last:border-0">
                <td className="px-3 py-2.5 font-medium text-foreground">{row.category}</td>
                <td className="px-3 py-2.5 text-center text-muted-foreground">{row.days7}</td>
                <td className="px-3 py-2.5 text-center text-muted-foreground">{row.days14}</td>
                <td className="px-3 py-2.5 text-center text-muted-foreground">{row.days21}</td>
                <td className="px-3 py-2.5 text-center text-muted-foreground">{row.days28}</td>
                <td className="px-3 py-2.5 text-center font-semibold text-primary">{row.average}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);
