"use client";

import { useState } from "react";
import { AlertTriangle, ShieldAlert, CheckCircle2, Info, Check, X, ChevronRight, RotateCcw, FileText, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { analyzePhishingText, PhishingAnalysisResult } from "@/lib/security-utils";
import { phishingScenarios } from "@/data/phishing-scenarios";
import { useUserProgressStore } from "@/store/user-progress";

export function Simulator() {
  // Navigation & Tab State
  const [activeTab, setActiveTab] = useState<'scenarios' | 'custom'>('scenarios');
  
  // Custom Scan State
  const [customText, setCustomText] = useState("");
  const [customResult, setCustomResult] = useState<PhishingAnalysisResult | null>(null);

  // Scenarios State
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'safe' | 'phishing'>>({});

  const incrementPhishingScore = useUserProgressStore((state) => state.incrementPhishingScore);

  const currentScenario = phishingScenarios[scenarioIndex];
  const hasAnsweredCurrent = currentScenario.id in userAnswers;
  const currentAnswer = userAnswers[currentScenario.id];
  const isCorrect = hasAnsweredCurrent && 
    ((currentAnswer === 'phishing' && currentScenario.isPhishing) || 
     (currentAnswer === 'safe' && !currentScenario.isPhishing));

  const handleCustomAnalyze = () => {
    if (!customText.trim()) return;
    setCustomResult(analyzePhishingText(customText));
    incrementPhishingScore();
  };

  const handleScenarioAnswer = (answer: 'safe' | 'phishing') => {
    if (hasAnsweredCurrent) return;
    setUserAnswers(prev => ({ ...prev, [currentScenario.id]: answer }));
    incrementPhishingScore();
  };

  const handleNextScenario = () => {
    if (scenarioIndex < phishingScenarios.length - 1) {
      setScenarioIndex(prev => prev + 1);
    }
  };

  const handleResetScenarios = () => {
    setScenarioIndex(0);
    setUserAnswers({});
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Tab Switcher */}
      <div className="flex bg-muted p-1 rounded-lg w-full max-w-md mx-auto border shadow-sm">
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-md transition-all ${
            activeTab === 'scenarios' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Layout className="h-4 w-4" />
          Practice Scenarios
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-md transition-all ${
            activeTab === 'custom' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <FileText className="h-4 w-4" />
          Custom Text Scan
        </button>
      </div>

      {/* --- SCENARIOS TAB --- */}
      {activeTab === 'scenarios' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center text-sm text-muted-foreground px-1">
            <span>Scenario <strong>{scenarioIndex + 1}</strong> of {phishingScenarios.length}</span>
            <span>Score: {Object.keys(userAnswers).filter(id => {
              const s = phishingScenarios.find(sc => sc.id === id);
              const ans = userAnswers[id];
              return s && ((ans === 'phishing' && s.isPhishing) || (ans === 'safe' && !s.isPhishing));
            }).length} / {Object.keys(userAnswers).length || 0}</span>
          </div>

          {/* Realistic Email Client Card */}
          <Card className="shadow-lg border-primary/20 overflow-hidden">
            <CardHeader className="bg-muted/40 border-b p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                  {currentScenario.senderName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <span className="font-bold text-sm text-foreground truncate">{currentScenario.senderName}</span>
                    <span className="text-xs text-muted-foreground">{currentScenario.date}</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    From: &lt;{currentScenario.senderEmail}&gt;
                  </div>
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Subject</span>
                <h3 className="text-base font-bold text-foreground">{currentScenario.subject}</h3>
              </div>
            </CardHeader>

            <CardContent className="p-6 bg-background">
              {/* Email Body */}
              <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap font-sans min-h-[180px] text-foreground/90 bg-muted/5 p-4 rounded border">
                {currentScenario.body}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons / Choice Selection */}
          {!hasAnsweredCurrent ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center pt-2">
              <button
                onClick={() => handleScenarioAnswer('safe')}
                className="flex-1 max-w-xs mx-auto py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-base"
              >
                <CheckCircle2 className="h-5 w-5" />
                This Email is Safe
              </button>
              <button
                onClick={() => handleScenarioAnswer('phishing')}
                className="flex-1 max-w-xs mx-auto py-4 bg-destructive hover:bg-destructive/90 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-base"
              >
                <ShieldAlert className="h-5 w-5" />
                This is Phishing
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
              {/* Result Banner */}
              <div className={`p-4 rounded-xl border flex items-center gap-3 shadow-sm ${
                isCorrect 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                  : 'bg-destructive/10 border-destructive/20 text-destructive'
              }`}>
                {isCorrect ? <Check className="h-6 w-6 shrink-0" /> : <X className="h-6 w-6 shrink-0" />}
                <div>
                  <h4 className="font-bold text-base">
                    {isCorrect ? "Correct!" : "Incorrect."}
                  </h4>
                  <p className="text-sm text-foreground/80 mt-0.5">
                    {currentScenario.isPhishing 
                      ? "This is indeed a dangerous Phishing attempt." 
                      : "This is a legitimate email notification."}
                  </p>
                </div>
              </div>

              {/* Educational Explanation Breakdown */}
              <Card className="shadow-md border border-border">
                <CardHeader className="bg-muted/30 border-b pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Security Analysis & Explanation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-5">
                  <p className="text-sm text-foreground/90 leading-relaxed bg-primary/5 border border-primary/10 p-3 rounded-md">
                    {currentScenario.explanation}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-destructive mb-2.5 flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5" /> Red Flags
                      </h5>
                      <ul className="space-y-2">
                        {currentScenario.redFlags.map((flag, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                            {flag}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2.5 flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Safety Advice
                      </h5>
                      <ul className="space-y-2">
                        {currentScenario.recommendations.map((rec, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Controls */}
              <div className="flex justify-center gap-4 pt-2">
                {scenarioIndex < phishingScenarios.length - 1 ? (
                  <Button size="lg" className="px-8" onClick={handleNextScenario}>
                    Next Scenario <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button size="lg" variant="outline" className="px-8" onClick={handleResetScenarios}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Restart Practice
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- CUSTOM SCAN TAB --- */}
      {activeTab === 'custom' && (
        <div className="space-y-6 animate-in fade-in duration-300">
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
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
              />
              <Button 
                className="w-full md:w-auto px-8" 
                size="lg" 
                onClick={handleCustomAnalyze}
                disabled={!customText.trim()}
              >
                <ShieldAlert className="mr-2 h-5 w-5" />
                Analyze Text
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          {customResult && (
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
                      strokeDashoffset={351.86 - (351.86 * customResult.score) / 100}
                      className={`${getRiskColor(customResult.score)} transition-all duration-1000 ease-out`} 
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className={`text-4xl font-bold ${getRiskColor(customResult.score)}`}>{customResult.score}</span>
                  </div>
                </div>
                <div className={`text-xl font-bold uppercase tracking-wide ${getRiskColor(customResult.score)}`}>
                  {getRiskLabel(customResult.score)}
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
                    <strong>Summary: </strong> {customResult.educational}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    {/* Reasons */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-destructive flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" /> Red Flags Found
                      </h4>
                      <ul className="space-y-3">
                        {customResult.reasons.map((reason, i) => (
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
                        {customResult.recommendations.map((rec, i) => (
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
      )}
    </div>
  );
}

