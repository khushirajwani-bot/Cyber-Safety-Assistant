"use client";

import { useState } from "react";
import { AlertTriangle, ShieldAlert, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { analyzePhishingText, PhishingAnalysisResult } from "@/lib/security-utils";

export function Simulator() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<PhishingAnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setResult(analyzePhishingText(text));
  };

  const getRiskColor = (score: number) => {
    if (score > 60) return "text-destructive";
    if (score > 20) return "text-yellow-500";
    return "text-emerald-500";
  };

  const getRiskLabel = (score: number) => {
    if (score > 60) return "High Risk";
    if (score > 20) return "Suspicious";
    return "Low Risk";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      
      {/* Input Section */}
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle>Paste Text to Analyze</CardTitle>
          <CardDescription>
            Copy and paste the body of an email or a website message here to scan it for common phishing red flags like urgency, threats, and credential requests.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            className="w-full min-h-[200px] p-4 rounded-md border bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            placeholder="Paste your email or message content here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button 
            className="w-full md:w-auto px-8" 
            size="lg" 
            onClick={handleAnalyze}
            disabled={!text.trim()}
          >
            <ShieldAlert className="mr-2 h-5 w-5" />
            Analyze Text
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
          
          {/* Score Card */}
          <Card className="md:col-span-1 shadow-md border flex flex-col justify-center items-center py-8 text-center">
            <h3 className="text-lg font-medium text-muted-foreground mb-4">Phishing Risk Score</h3>
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/30" />
                <circle 
                  cx="64" cy="64" r="56" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray="351.86" 
                  strokeDashoffset={351.86 - (351.86 * result.score) / 100}
                  className={`${getRiskColor(result.score)} transition-all duration-1000 ease-out`} 
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className={`text-4xl font-bold ${getRiskColor(result.score)}`}>{result.score}</span>
              </div>
            </div>
            <div className={`text-xl font-bold uppercase tracking-wide ${getRiskColor(result.score)}`}>
              {getRiskLabel(result.score)}
            </div>
          </Card>

          {/* Details Card */}
          <Card className="md:col-span-2 shadow-md border flex flex-col">
            <CardHeader className="bg-muted/30 border-b pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Analysis Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-6 space-y-6">
              
              {/* Educational Explanation */}
              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg text-sm text-foreground/90 leading-relaxed">
                <strong>Summary: </strong> {result.educational}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* Reasons */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" /> Red Flags Found
                  </h4>
                  <ul className="space-y-3">
                    {result.reasons.map((reason, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-tight">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-destructive flex-shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-emerald-500 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Recommendations
                  </h4>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-tight">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </CardContent>
          </Card>

        </div>
      )}
    </div>
  );
}
