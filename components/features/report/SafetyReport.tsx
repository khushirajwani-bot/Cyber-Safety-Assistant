"use client";

import { useEffect, useRef, useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { Download, Activity, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateReportPDF } from "@/lib/pdf-generator";
import { useUserProgressStore } from "@/store/user-progress";

export function SafetyReport() {
  const progress = useUserProgressStore();
  const [mounted, setMounted] = useState(false);
  const initialized = useRef(false);

  // Avoid hydration mismatch with Zustand
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
      
      // For demonstration purposes, if the store is empty, we inject some mock data
      // so the charts look good for the project presentation.
      // Use a ref to ensure this only runs once and never causes an infinite loop.
      if (!initialized.current) {
        initialized.current = true;
        if (progress.passwordChecks === 0 && progress.urlsChecked === 0 && progress.phishingScore === 0) {
          useUserProgressStore.setState({
            passwordChecks: 5,
            urlsChecked: 3,
            phishingScore: 2
          });
        }
      }
    });

    return () => cancelAnimationFrame(handle);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  const chartData = [
    { name: "Passwords", value: progress.passwordChecks, color: "hsl(var(--chart-1))" },
    { name: "URLs", value: progress.urlsChecked, color: "hsl(var(--chart-2))" },
    { name: "Phishing", value: progress.phishingScore, color: "hsl(var(--chart-3))" },
  ];

  const handleExport = () => {
    generateReportPDF({
      passwordChecks: progress.passwordChecks,
      urlsChecked: progress.urlsChecked,
      phishingScore: progress.phishingScore,
      date: new Date().toLocaleDateString()
    });
  };

  const total = progress.passwordChecks + progress.urlsChecked + progress.phishingScore;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-md border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Total Interactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{total}</div>
            <p className="text-sm text-muted-foreground mt-1">Actions taken across all tools</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-emerald-500/20 bg-emerald-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-500" />
              Safety Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-emerald-500">Good</div>
            <p className="text-sm text-muted-foreground mt-1">Keep practicing your skills!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2 shadow-lg border-border">
          <CardHeader>
            <CardTitle>Activity Breakdown</CardTitle>
            <CardDescription>Visualizing your tool usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Export Panel */}
        <Card className="shadow-lg border-border flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Download Report</CardTitle>
            <CardDescription>
              Export your activity and personalized recommendations as a PDF document.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Download className="h-10 w-10 text-primary" />
            </div>
            <Button size="lg" className="w-full font-bold" onClick={handleExport}>
              Generate PDF
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
