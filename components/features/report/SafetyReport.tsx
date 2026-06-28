"use client";

import { useEffect, useState } from "react";
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
import { Download, Activity, Award, Trash2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateReportPDF } from "@/lib/pdf-generator";
import { useUserProgressStore } from "@/store/user-progress";

export function SafetyReport() {
  const progress = useUserProgressStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch with Zustand
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
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

  const loadDemoData = () => {
    useUserProgressStore.setState({
      passwordChecks: 8,
      urlsChecked: 5,
      phishingScore: 4
    });
  };

  const total = progress.passwordChecks + progress.urlsChecked + progress.phishingScore;

  // Determine Safety Level based on total interactions
  const getSafetyLevel = () => {
    if (total === 0) return { label: "No Data", color: "text-muted-foreground", bg: "bg-muted/5", border: "border-muted/20" };
    if (total < 5) return { label: "Beginner", color: "text-yellow-500", bg: "bg-yellow-500/5", border: "border-yellow-500/20" };
    if (total < 12) return { label: "Good", color: "text-blue-500", bg: "bg-blue-500/5", border: "border-blue-500/20" };
    return { label: "Expert", color: "text-emerald-500", bg: "bg-emerald-500/5", border: "border-emerald-500/20" };
  };

  const safety = getSafetyLevel();

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
        
        <Card className={`shadow-md ${safety.border} ${safety.bg}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className={`h-5 w-5 ${safety.color}`} />
              Safety Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-bold ${safety.color}`}>{safety.label}</div>
            <p className="text-sm text-muted-foreground mt-1">
              {total === 0 ? "Complete activities to get a rating." : "Keep practicing your skills!"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2 shadow-lg border-border flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Activity Breakdown</CardTitle>
            <CardDescription>Visualizing your tool usage in real-time</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            {total === 0 ? (
              <div className="h-[250px] w-full flex flex-col items-center justify-center text-center p-4 border border-dashed rounded-lg bg-muted/5">
                <Activity className="h-10 w-10 text-muted-foreground/40 mb-3" />
                <p className="text-sm font-semibold text-muted-foreground">No activity recorded yet</p>
                <p className="text-xs text-muted-foreground/80 mt-1 max-w-xs">
                  Try the Password Analyzer, URL Checker, or Phishing Simulator to see your progress here!
                </p>
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>

        {/* Sidebar Column */}
        <div className="flex flex-col gap-6">
          {/* Export Panel */}
          <Card className="shadow-lg border-border flex flex-col justify-between">
            <CardHeader className="pb-4">
              <CardTitle>Download Report</CardTitle>
              <CardDescription>
                Export your activity and personalized recommendations as a PDF document.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Download className="h-8 w-8 text-primary" />
              </div>
              <Button size="lg" className="w-full font-bold" onClick={handleExport} disabled={total === 0}>
                Generate PDF
              </Button>
            </CardContent>
          </Card>

          {/* Controls Panel */}
          <Card className="shadow-lg border-border">
            <CardHeader className="pb-4">
              <CardTitle>Manage Progress</CardTitle>
              <CardDescription>
                Reset your progress stats or load demo data for demonstration purposes.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row lg:flex-col gap-3 pt-0">
              <Button 
                variant="outline" 
                className="flex-1 font-semibold border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive" 
                onClick={progress.resetProgress}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Reset Stats
              </Button>
              <Button 
                variant="secondary" 
                className="flex-1 font-semibold" 
                onClick={loadDemoData}
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Load Demo Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

