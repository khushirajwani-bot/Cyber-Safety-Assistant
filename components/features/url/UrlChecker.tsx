"use client";

import { useState } from "react";
import { Search, ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { analyzeUrl, UrlAnalysisResult } from "@/lib/security-utils";

export function UrlChecker() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<UrlAnalysisResult | null>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setResult(analyzeUrl(url.trim()));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-primary/20">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
          <Search className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Suspicious URL Checker</CardTitle>
        <CardDescription>Paste a link below to check for common phishing red flags.</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleAnalyze} className="flex gap-2">
          <Input
            type="url"
            placeholder="e.g., https://login-update-secure.com"
            className="h-12 text-lg focus-visible:ring-primary"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Button type="submit" size="lg" className="h-12 px-8">
            Analyze
          </Button>
        </form>

        {result && (
          <div className="pt-6 border-t animate-in fade-in slide-in-from-bottom-4">
            <div className={`flex items-start gap-4 p-4 rounded-lg border-l-4 bg-muted/50 ${
              result.riskLevel === 'Safe' ? 'border-emerald-500' :
              result.riskLevel === 'Caution' ? 'border-yellow-500' : 'border-destructive'
            }`}>
              <div className="mt-1">
                {result.riskLevel === 'Safe' && <ShieldCheck className="h-6 w-6 text-emerald-500" />}
                {result.riskLevel === 'Caution' && <AlertTriangle className="h-6 w-6 text-yellow-500" />}
                {result.riskLevel === 'High Risk' && <ShieldAlert className="h-6 w-6 text-destructive" />}
              </div>
              <div>
                <h3 className={`text-lg font-bold mb-1 ${
                  result.riskLevel === 'Safe' ? 'text-emerald-500' :
                  result.riskLevel === 'Caution' ? 'text-yellow-500' : 'text-destructive'
                }`}>
                  Risk Level: {result.riskLevel}
                </h3>
                
                <ul className="space-y-2 mt-3">
                  {result.reasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4 text-center">
              * Note: This is a basic heuristic analysis and cannot guarantee a site is 100% safe. Always exercise caution.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
