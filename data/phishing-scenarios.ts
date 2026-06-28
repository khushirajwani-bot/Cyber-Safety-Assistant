export type PhishingScenario = {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  date: string;
  content: string;
  isPhishing: boolean;
  clues: string[];
};

export const phishingScenarios: PhishingScenario[] = [
  {
    id: "s1",
    senderName: "PayPal Support",
    senderEmail: "security@paypa1-update.com",
    subject: "URGENT: Your account has been locked",
    date: "Today, 9:41 AM",
    content: "Dear Customer,<br/><br/>We noticed unusual activity on your account. To prevent unauthorized access, we have temporarily locked your account.<br/><br/>Please click the link below to verify your identity within 24 hours or your account will be permanently closed.<br/><br/><a href='#' class='text-blue-500 underline'>Verify Account Now</a><br/><br/>Sincerely,<br/>PayPal Security Team",
    isPhishing: true,
    clues: [
      "The sender email is 'paypa1-update.com' instead of 'paypal.com'. Notice the '1' instead of an 'l'.",
      "The email uses urgent, threatening language ('permanently closed').",
      "The greeting is generic ('Dear Customer') instead of your actual name."
    ]
  },
  {
    id: "s2",
    senderName: "Netflix",
    senderEmail: "info@netflix.com",
    subject: "New sign-in to your account",
    date: "Yesterday, 8:15 PM",
    content: "Hi there,<br/><br/>We noticed a new sign-in to your Netflix account from a new device.<br/><br/><strong>Device:</strong> Smart TV<br/><strong>Location:</strong> Chicago, IL<br/><br/>If this was you, you don't need to do anything. If this wasn't you, please change your password immediately by visiting netflix.com.<br/><br/>The Netflix Team",
    isPhishing: false,
    clues: [
      "The sender email is from the official 'netflix.com' domain.",
      "There are no threatening ultimatums or urgent deadlines.",
      "It doesn't include a direct link to change the password, but safely instructs you to visit the website directly."
    ]
  },
  {
    id: "s3",
    senderName: "IT Helpdesk",
    senderEmail: "it-admin@yourcompany-portal.net",
    subject: "Mandatory Password Update Required",
    date: "Today, 10:05 AM",
    content: "All Employees,<br/><br/>As part of our annual security review, you must update your corporate password immediately.<br/><br/>Please download the attached PDF guide and follow the link inside to the secure portal: <strong>password-reset-guide.pdf</strong><br/><br/>Failure to do so by EOD will result in network lockout.<br/><br/>- IT Dept",
    isPhishing: true,
    clues: [
      "The domain 'yourcompany-portal.net' is suspicious (attackers often register lookalike domains for targeted companies).",
      "It asks you to open an unexpected attachment to access a link (common malware delivery tactic).",
      "Creates extreme urgency ('Failure to do so by EOD')."
    ]
  }
];
