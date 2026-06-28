export function generateAssistantResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("password")) {
    return "To create a strong password, use at least 12 characters, mixing uppercase, lowercase, numbers, and symbols. Avoid common words or personal info. Our Password Analyzer tool can help you check its strength!";
  }
  
  if (lowerMessage.includes("phishing") || lowerMessage.includes("email") || lowerMessage.includes("link")) {
    return "Phishing is when attackers send fake emails or links to trick you into revealing sensitive information. Always check the sender's actual email address, hover over links before clicking, and look out for urgent or threatening language. Try our Phishing Simulator to practice spotting them!";
  }
  
  if (lowerMessage.includes("virus") || lowerMessage.includes("malware") || lowerMessage.includes("antivirus")) {
    return "Malware (like viruses) can harm your computer. To stay safe: keep your operating system and software updated, use reputable antivirus software, and never download files from untrusted sources.";
  }

  if (lowerMessage.includes("public wifi") || lowerMessage.includes("coffee shop") || lowerMessage.includes("wi-fi")) {
    return "Public Wi-Fi networks are often unsecured, meaning others could intercept your data. Avoid logging into sensitive accounts (like banking) on public Wi-Fi unless you are using a trusted Virtual Private Network (VPN).";
  }

  if (lowerMessage.includes("ransomware") || lowerMessage.includes("ransom")) {
    return "Ransomware is malicious software that encrypts your files or locks you out of your computer, demanding a ransom (usually cryptocurrency) to restore access. To protect yourself, always back up your data regularly to a disconnected drive, avoid suspicious links, and keep your software updated.";
  }

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "Hello! I am your Cyber Safety Assistant. I can help answer questions about passwords, phishing, secure browsing, and more. What would you like to learn about today?";
  }

  // Default response if no keywords match
  return "That's an interesting question. While I'm a simplified AI focused on core cyber safety topics, a good rule of thumb online is: 'Think before you click.' If you have questions about passwords, phishing, or secure browsing, feel free to ask!";
}
