export type PasswordStrengthResult = {
  score: number;
  label: 'Weak' | 'Fair' | 'Good' | 'Strong';
  criteria: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    specialChar: boolean;
  };
  crackTime: string;
  weaknesses: string[];
  suggestions: string[];
};

export function calculatePasswordStrength(password: string): PasswordStrengthResult {
  const criteria = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[^A-Za-z0-9]/.test(password),
  };

  const weaknesses: string[] = [];
  const suggestions: string[] = [];
  let score = 0;
  let crackTime = "Instantly";

  if (!password) {
    return {
      score: 0,
      label: 'Weak',
      criteria,
      crackTime: "Instantly",
      weaknesses: [],
      suggestions: ["Enter a password to begin analysis."]
    };
  }

  if (password.length >= 8) score += 10;
  if (criteria.length) score += 20;
  if (criteria.uppercase) score += 15;
  if (criteria.lowercase) score += 15;
  if (criteria.number) score += 15;
  if (criteria.specialChar) score += 25;

  const lowerPass = password.toLowerCase();
  const commonWords = ['password', '123', 'qwerty', 'admin', 'welcome', 'letmein'];
  const hasCommon = commonWords.some(word => lowerPass.includes(word));
  if (hasCommon) {
    score -= 30;
    weaknesses.push("Contains common dictionary words or sequences.");
    suggestions.push("Avoid using predictable words like 'password' or keyboard patterns.");
  }

  const hasRepeats = /(.)\1{2,}/.test(password);
  if (hasRepeats) {
    score -= 20;
    weaknesses.push("Contains repeated characters (e.g., 'aaa').");
    suggestions.push("Avoid repeating the same character multiple times in a row.");
  }

  if (!criteria.length) suggestions.push("Increase length to at least 12 characters.");
  if (!criteria.uppercase) suggestions.push("Add at least one uppercase letter.");
  if (!criteria.lowercase) suggestions.push("Add at least one lowercase letter.");
  if (!criteria.number) suggestions.push("Include numbers.");
  if (!criteria.specialChar) suggestions.push("Add special symbols (e.g., @, #, $).");

  score = Math.max(0, Math.min(100, score));

  let label: 'Weak' | 'Fair' | 'Good' | 'Strong' = 'Weak';
  if (score < 40) {
    label = 'Weak';
    crackTime = "Less than a second";
  } else if (score < 70) {
    label = 'Fair';
    crackTime = "A few hours";
  } else if (score < 90) {
    label = 'Good';
    crackTime = "Several months";
  } else {
    label = 'Strong';
    crackTime = "Centuries";
  }

  return { score, label, criteria, crackTime, weaknesses, suggestions };
}

export type UrlAnalysisResult = {
  isSafe: boolean;
  riskLevel: 'Safe' | 'Caution' | 'High Risk';
  reasons: string[];
};

export function analyzeUrl(url: string): UrlAnalysisResult {
  const reasons: string[] = [];
  let riskScore = 0;
  
  if (!url) {
    return { isSafe: true, riskLevel: 'Safe', reasons: [] };
  }

  const lowerUrl = url.toLowerCase();

  if (!lowerUrl.startsWith('https://')) {
    reasons.push("Does not use secure HTTPS encryption.");
    riskScore += 1;
  }

  const suspiciousKeywords = ['free', 'login', 'update', 'secure', 'verify', 'account', 'banking', 'win', 'prize'];
  const foundKeywords = suspiciousKeywords.filter(kw => lowerUrl.includes(kw));
  
  if (foundKeywords.length > 0) {
    reasons.push(`Contains suspicious keywords: ${foundKeywords.join(', ')}`);
    riskScore += foundKeywords.length;
  }

  if (url.length > 75) {
    reasons.push("URL is suspiciously long and may be hiding its true destination.");
    riskScore += 1;
  }
  
  const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  if (ipRegex.test(url)) {
    reasons.push("Uses an IP address instead of a domain name.");
    riskScore += 2;
  }

  let riskLevel: 'Safe' | 'Caution' | 'High Risk' = 'Safe';
  let isSafe = true;

  if (riskScore === 0) {
    riskLevel = 'Safe';
    reasons.push("No immediate red flags detected. Still, always remain vigilant.");
  } else if (riskScore === 1) {
    riskLevel = 'Caution';
    isSafe = false;
  } else {
    riskLevel = 'High Risk';
    isSafe = false;
  }

  return { isSafe, riskLevel, reasons };
}

export type PhishingAnalysisResult = {
  score: number; // 0-100
  reasons: string[];
  recommendations: string[];
  educational: string;
};

export function analyzePhishingText(text: string): PhishingAnalysisResult {
  const reasons: string[] = [];
  const recommendations: string[] = [];
  let score = 0;
  
  if (!text.trim()) {
    return { score: 0, reasons: [], recommendations: [], educational: "" };
  }

  const lowerText = text.toLowerCase();

  // 1. Urgency / Threat Language
  const urgencyKeywords = ['urgent', 'immediate', 'suspended', 'locked', 'verify now', 'action required', 'permanently closed', 'within 24 hours', 'failure to'];
  const foundUrgency = urgencyKeywords.filter(kw => lowerText.includes(kw));
  if (foundUrgency.length > 0) {
    score += 30;
    reasons.push(`Contains urgent or threatening language: "${foundUrgency[0]}"`);
    recommendations.push("Scammers use urgency to force you into making quick, emotional decisions. Take a deep breath and verify the sender independently.");
  }

  // 2. Requests for Credentials
  const credentialKeywords = ['password', 'ssn', 'social security', 'credit card', 'login credentials', 'pin code', 'bank account', 'click here to login'];
  const foundCreds = credentialKeywords.filter(kw => lowerText.includes(kw));
  if (foundCreds.length > 0) {
    score += 40;
    reasons.push(`Requests sensitive information: "${foundCreds[0]}"`);
    recommendations.push("Legitimate organizations will NEVER ask for your password or SSN via email. Do not reply with this info.");
  }

  // 3. Suspicious Links / Shorteners
  const suspiciousLinks = ['bit.ly', 'tinyurl', 'http://'];
  const foundLinks = suspiciousLinks.filter(kw => lowerText.includes(kw));
  if (foundLinks.length > 0) {
    score += 20;
    reasons.push(`Contains potentially dangerous or unencrypted links/shorteners: "${foundLinks[0]}"`);
    recommendations.push("Hover over links before clicking to see their true destination, and beware of shortened URLs.");
  }

  // 4. Grammar / Formatting (Basic heuristic)
  const excessivePunctuation = /[!?]{2,}/;
  const excessiveCaps = /[A-Z]{5,}/;
  if (excessivePunctuation.test(text) || excessiveCaps.test(text)) {
    score += 10;
    reasons.push("Contains unusual formatting, excessive capitalization, or repeated punctuation.");
    recommendations.push("Professional organizations usually have strict editorial standards. Poor grammar or formatting is a major red flag.");
  }

  // 5. Generic Greetings
  const genericGreetings = ['dear customer', 'dear user', 'attention user'];
  const foundGreetings = genericGreetings.filter(kw => lowerText.includes(kw));
  if (foundGreetings.length > 0) {
    score += 10;
    reasons.push(`Uses a generic greeting: "${foundGreetings[0]}"`);
    recommendations.push("Legitimate companies you have an account with usually address you by your actual name.");
  }

  score = Math.min(100, score);
  
  let educational = "";
  if (score > 60) {
    educational = "This text exhibits multiple classic signs of a phishing attack. The combination of urgency and requests for sensitive data is the hallmark of social engineering. Do not interact with this message.";
  } else if (score > 20) {
    educational = "This text has some suspicious elements. While it might be legitimate marketing or automated mail, you should exercise caution and verify the source through an official channel.";
  } else {
    educational = "This text does not trigger our primary phishing heuristics. However, always remain vigilant, as highly targeted 'spear-phishing' attacks can be perfectly written without obvious red flags.";
    reasons.push("No major phishing indicators detected.");
    recommendations.push("Even if an email looks safe, never download unexpected attachments.");
  }

  return { score, reasons, recommendations, educational };
}
