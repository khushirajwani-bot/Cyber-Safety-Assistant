export type LearningModule = {
  id: string;
  title: string;
  summary: string;
  category: 'Passwords' | 'Phishing' | 'General' | 'Network';
  content: string;
  readTimeMinutes: number;
};

export const learningModules: LearningModule[] = [
  {
    id: "m1",
    title: "The Anatomy of a Strong Password",
    summary: "Learn why length matters more than complexity, and how to create passwords you can actually remember.",
    category: 'Passwords',
    readTimeMinutes: 3,
    content: `
### Why Passwords Matter
Your password is the key to your digital life. A weak password is like leaving your front door unlocked.

### Length > Complexity
While special characters are good, **length** is the most important factor in preventing brute-force attacks. A 16-character password made of lowercase letters is mathematically harder to crack than an 8-character password with symbols.

### The Passphrase Strategy
Instead of trying to remember \`P@$$w0rd123!\`, try combining four random words: \`correct-horse-battery-staple\`. It's easy for humans to remember, but extremely difficult for computers to guess.

### Never Reuse Passwords
If you use the same password for Netflix and your bank, a breach at Netflix means attackers now have access to your bank account. Use a Password Manager to generate and store unique passwords for every site.
    `
  },
  {
    id: "m2",
    title: "Spotting Phishing Scams",
    summary: "Phishing is the #1 way attackers compromise accounts. Learn the telltale signs of a fake email.",
    category: 'Phishing',
    readTimeMinutes: 4,
    content: `
### What is Phishing?
Phishing is a social engineering attack where a criminal sends a fraudulent message designed to trick a person into revealing sensitive information or deploying malicious software.

### The 3 Red Flags
1. **Urgency**: Attackers try to make you panic. ("Your account will be suspended in 24 hours!")
2. **Authority**: They impersonate figures of authority (the IRS, your CEO, IT support).
3. **Unexpected Links/Attachments**: They ask you to click a link to log in or open a PDF invoice you weren't expecting.

### How to Protect Yourself
- **Verify the sender**: Expand the "From" address and look closely at the domain. Is it \`paypal.com\` or \`paypa1-security.com\`?
- **Hover before clicking**: Hover your mouse over a link to see where it actually leads before you click.
- **Go direct**: If you get an email saying your bank account is locked, do not click the link. Open your browser and type in your bank's URL directly to check.
    `
  },
  {
    id: "m3",
    title: "The Dangers of Public Wi-Fi",
    summary: "Coffee shop Wi-Fi is convenient, but it's also a hunting ground for hackers. Here's how to stay safe.",
    category: 'Network',
    readTimeMinutes: 2,
    content: `
### The Risk
Public Wi-Fi networks (at airports, cafes, hotels) are often unsecured. This means data transmitted over the network can be intercepted by anyone else on that same network using basic sniffing tools.

### Man-in-the-Middle Attacks
Attackers can set up rogue hotspots with names like "Free Starbucks WiFi". If you connect to it, every piece of unencrypted data you send passes through the attacker's computer.

### Best Practices
- **Use a VPN**: A Virtual Private Network encrypts your connection, keeping your data safe even on public networks.
- **Look for HTTPS**: Only enter sensitive information on sites that use HTTPS (look for the padlock icon).
- **Turn off sharing**: Disable file and printer sharing on your device when on a public network.
    `
  }
];
