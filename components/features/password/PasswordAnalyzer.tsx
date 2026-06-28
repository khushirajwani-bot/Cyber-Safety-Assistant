"use client";

import { useState } from "react";
import { Eye, EyeOff, Check, X, ShieldCheck, Clock, AlertTriangle, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { calculatePasswordStrength } from "@/lib/security-utils";

export function PasswordAnalyzer() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const result = calculatePasswordStrength(password);
  
  const getProgressColor = () => {
    if (result.label === 'Weak') return 'bg-destructive';
    if (result.label === 'Fair') return 'bg-yellow-500';
    if (result.label === 'Good') return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  const getLabelColor = () => {
    if (result.label === 'Weak') return 'text-destructive';
    if (result.label === 'Fair') return 'text-yellow-500';
    if (result.label === 'Good') return 'text-blue-500';
    return 'text-emerald-500';
  };

  const criteriaList = [
    { key: 'length', label: 'At least 12 characters', met: result.criteria.length },
    { key: 'uppercase', label: 'Uppercase letter (A-Z)', met: result.criteria.uppercase },
    { key: 'lowercase', label: 'Lowercase letter (a-z)', met: result.criteria.lowercase },
    { key: 'number', label: 'Number (0-9)', met: result.criteria.number },
    { key: 'specialChar', label: 'Special character (!@#$...)', met: result.criteria.specialChar },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-primary/20">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Advanced Password Analyzer</CardTitle>
        <CardDescription>Evaluate password resilience against modern cracking techniques.</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Type a password here..."
            className="pr-10 h-14 text-lg font-mono shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        {/* Score & Meter */}
        <div className="space-y-2 bg-muted/30 p-4 rounded-lg border">
          <div className="flex justify-between items-end mb-2">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Strength Score</div>
              <div className="text-3xl font-bold font-mono tracking-tight flex items-baseline gap-2">
                {result.score}<span className="text-lg text-muted-foreground">/100</span>
              </div>
            </div>
            <div className={`text-xl font-bold uppercase tracking-wider ${password ? getLabelColor() : 'text-muted-foreground'}`}>
              {password ? result.label : 'None'}
            </div>
          </div>
          <div className="h-3 w-full bg-secondary rounded-full overflow-hidden shadow-inner">
            <div 
              className={`h-full transition-all duration-500 ease-in-out ${password ? getProgressColor() : ''}`}
              style={{ width: `${result.score}%` }}
            />
          </div>
          
          {password && (
            <div className="flex items-center gap-2 mt-4 text-sm font-medium bg-background p-2 rounded border">
              <Clock className="h-4 w-4 text-primary" />
              <span>Estimated crack time:</span>
              <span className={getLabelColor()}>{result.crackTime}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Criteria Checklist */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Checklist
            </h4>
            <ul className="space-y-2.5">
              {criteriaList.map((item) => (
                <li key={item.key} className="flex items-start gap-2.5 text-sm">
                  {item.met ? (
                    <div className="bg-emerald-500/20 p-0.5 rounded-full mt-0.5">
                      <Check className="h-3 w-3 text-emerald-500" />
                    </div>
                  ) : (
                    <div className="bg-muted-foreground/10 p-0.5 rounded-full mt-0.5">
                      <X className="h-3 w-3 text-muted-foreground" />
                    </div>
                  )}
                  <span className={item.met ? "text-foreground font-medium" : "text-muted-foreground"}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses & Suggestions */}
          <div className="space-y-6">
            {password.length > 0 && result.weaknesses.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> Detected Weaknesses
                </h4>
                <ul className="space-y-2">
                  {result.weaknesses.map((weakness, i) => (
                    <li key={i} className="text-sm text-destructive bg-destructive/10 p-2 rounded-md border border-destructive/20 leading-tight">
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {password.length > 0 && result.suggestions.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-blue-500 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" /> Suggestions
                </h4>
                <ul className="space-y-2">
                  {result.suggestions.slice(0, 3).map((suggestion, i) => (
                    <li key={i} className="text-sm text-muted-foreground bg-muted p-2 rounded-md border leading-tight">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
