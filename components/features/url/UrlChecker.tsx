"use client";

import { useState } from "react";
import { Search, ShieldAlert, ShieldCheck, AlertTriangle, Link2, Globe, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { analyzeUrl, UrlAnalysisResult } from "@/lib/security-utils";
import { useUserProgressStore } from "@/store/user-progress";

export function UrlChecker() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<UrlAnalysisResult | null>(null);
  const [analyzedUrlString, setAnalyzedUrlString] = useState("");
  const incrementUrlsChecked = useUserProgressStore((state) => state.incrementUrlsChecked);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setResult(analyzeUrl(url.trim()));
    setAnalyzedUrlString(url.trim());
    incrementUrlsChecked();
  };

  // Helper to parse URL parts for visual breakdown
  const parseUrlParts = (urlStr: string) => {
    try {
      let formattedUrl = urlStr;
      if (!/^https?:\/\//i.test(urlStr)) {
        formattedUrl = 'http://' + urlStr;
      }
      const parsed = new URL(formattedUrl);
      const hasProtocol = /^https?:\/\//i.test(urlStr);
      const protocol = hasProtocol ? parsed.protocol + "//" : "http:// (implied)";
      const isHttps = hasProtocol ? parsed.protocol.toLowerCase() === "https:" : false;
      const domain = parsed.hostname;
      const path = parsed.pathname + parsed.search + parsed.hash;
      
      return { protocol, domain, path, isHttps, success: true };
    } catch {
      return { protocol: "N/A", domain: urlStr, path: "", isHttps: false, success: false };
    }
  };

  const urlParts = analyzedUrlString ? parseUrlParts(analyzedUrlString) : null;

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
            type="text"
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
          <div className="pt-6 border-t animate-in fade-in slide-in-from-bottom-4 space-y-6">
            {/* Risk Level Alert */}
            <div className={`flex items-start gap-4 p-4 rounded-lg border-l-4 bg-muted/50 ${
              result.riskLevel === 'Safe' ? 'border-emerald-500' :
              result.riskLevel === 'Caution' ? 'border-yellow-500' : 'border-destructive'
             }`}>
              <div className="mt-1">
                {result.riskLevel === 'Safe' && <ShieldCheck className="h-6 w-6 text-emerald-500" />}
                {result.riskLevel === 'Caution' && <AlertTriangle className="h-6 w-6 text-yellow-500" />}
                {result.riskLevel === 'High Risk' && <ShieldAlert className="h-6 w-6 text-destructive" />}
              </div>
              <div className="flex-1">
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

            {/* Visual URL Breakdown */}
            {urlParts && (
              <div className="space-y-3 bg-muted/20 p-4 rounded-lg border">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Link2 className="h-4 w-4" /> URL Component Breakdown
                </h4>
                
                <div className="space-y-3 pt-1">
                  {/* Protocol */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between border-b pb-2 text-sm">
                    <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5" /> Protocol:
                    </span>
                    <div className="flex items-center gap-2">
                      <code className="bg-background px-2 py-0.5 rounded border font-mono text-xs">{urlParts.protocol}</code>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        urlParts.isHttps 
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                          : "bg-destructive/10 text-destructive border border-destructive/20"
                      }`}>
                        {urlParts.isHttps ? "Secure (HTTPS)" : "Insecure (HTTP)"}
                      </span>
                    </div>
                  </div>

                  {/* Domain */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between border-b pb-2 text-sm">
                    <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5" /> Domain:
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="bg-background px-2 py-0.5 rounded border font-mono text-xs max-w-[200px] truncate" title={urlParts.domain}>
                        {urlParts.domain}
                      </code>
                      {(() => {
                        const suspiciousKeywords = ['free', 'login', 'update', 'secure', 'verify', 'account', 'banking', 'win', 'prize'];
                        const hasKeywords = suspiciousKeywords.some(kw => urlParts.domain.toLowerCase().includes(kw));
                        const isIp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(urlParts.domain);
                        
                        if (isIp) {
                          return (
                            <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-destructive/10 text-destructive border border-destructive/20">
                              IP Address
                            </span>
                          );
                        }
                        if (hasKeywords) {
                          return (
                            <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                              Suspicious Keywords
                            </span>
                          );
                        }
                        return (
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            Standard Format
                          </span>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Path */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between text-sm">
                    <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                      <Link2 className="h-3.5 w-3.5" /> Path & Parameters:
                    </span>
                    <code className="bg-background px-2 py-0.5 rounded border font-mono text-xs max-w-full sm:max-w-[280px] truncate" title={urlParts.path || "/"}>
                      {urlParts.path || "/"}
                    </code>
                  </div>
                </div>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground mt-4 text-center">
              * Note: This is a basic heuristic analysis and cannot guarantee a site is 100% safe. Always exercise caution.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

