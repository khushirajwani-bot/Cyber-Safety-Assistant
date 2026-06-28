export type PhishingScenario = {
  id: string;
  title: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  date: string;
  body: string;
  isPhishing: boolean;
  explanation: string;
  redFlags: string[];
  recommendations: string[];
};

export const phishingScenarios: PhishingScenario[] = [
  {
    id: "s1",
    title: "Google Security Alert",
    senderName: "Google Accounts",
    senderEmail: "no-reply@accounts-security-google.com",
    subject: "Critical Security Alert: Suspicious sign-in blocked",
    date: "Today, 10:24 AM",
    body: `Dear customer,

Someone just used your password to try to sign in to your account from a device in Moscow, Russia. 

Google blocked this attempt, but you should change your password immediately to secure your account. 

Please click the link below to reset your password within 24 hours, or your account will be permanently suspended:

http://bit.ly/secure-google-login-activity

Thanks,
The Google Accounts Team`,
    isPhishing: true,
    explanation: "This is a classic phishing email. While it looks like a legitimate Google security notification, it has several critical red flags: the sender domain is spoofed, it uses an urgent threat ('permanently suspended within 24 hours'), addresses you as 'Dear customer' (Google knows your name), and directs you to a shortened Bit.ly link instead of a secure Google domain.",
    redFlags: [
      "Spoofed Sender: The email address is 'accounts-security-google.com' instead of 'google.com'.",
      "Generic Greeting: 'Dear customer' is used instead of your actual name.",
      "Urgency & Threat: It demands action 'within 24 hours' and threatens 'permanent suspension'.",
      "Suspicious Link: The link uses a URL shortener (bit.ly) and HTTP instead of HTTPS."
    ],
    recommendations: [
      "Never click on security alert links directly from emails. Go to accounts.google.com in a new tab.",
      "Check the sender's domain carefully. Legitimate Google alerts come from @google.com.",
      "Be wary of any email that threatens account suspension if you don't act quickly."
    ]
  },
  {
    id: "s2",
    title: "DHL Package Delivery",
    senderName: "DHL Express",
    senderEmail: "delivery-status@dhl-express-logistics.net",
    subject: "Shipment Notification: Package on hold",
    date: "Yesterday, 3:15 PM",
    body: `Attention User,

Your shipment with tracking number DHL-892304-US has been placed on hold at our local sorting facility due to an unpaid customs duty of $2.99.

To release your package, you must pay the outstanding balance immediately. 

Click here to pay customs fees and arrange delivery:
https://dhl-payment-portal-secure.com/pay

If fees are not paid within 48 hours, the package will be returned to the sender.

Regards,
DHL Express Support`,
    isPhishing: true,
    explanation: "This is a delivery phishing scam (known as 'smishing' or phishing). Attackers exploit the fact that many people are expecting packages. Red flags include a suspicious sender domain, a generic greeting, an urgent demand for payment, and a link to a lookalike domain ('dhl-payment-portal-secure.com') instead of the official 'dhl.com'.",
    redFlags: [
      "Inauthentic Domain: The sender domain is 'dhl-express-logistics.net' instead of 'dhl.com'.",
      "Generic Greeting: Addresses you as 'Attention User'.",
      "Urgent Payment Demand: Claims the package will be returned in 48 hours unless a small fee is paid immediately.",
      "Lookalike Link: The link points to 'dhl-payment-portal-secure.com', which is a registered domain owned by attackers."
    ],
    recommendations: [
      "If you are expecting a package, go to the official DHL website (dhl.com) and paste the tracking number there.",
      "Do not pay any unexpected customs fees through links sent via email or text.",
      "Legitimate delivery companies will contact you with specific tracking information linked to your profile."
    ]
  },
  {
    id: "s3",
    title: "Company Quarterly Survey",
    senderName: "HR Department",
    senderEmail: "hr@company-internal.com",
    subject: "Internal: Q3 Employee Feedback Survey",
    date: "2 days ago",
    body: `Hi Team,

It's time for our quarterly employee feedback survey. Your input is vital to helping us improve our workplace culture, benefits, and team alignment.

The survey is completely anonymous and will take about 5 minutes to complete. It will remain open until next Friday.

Please find the survey link on our internal portal here:
https://company-internal.com/portal/surveys/q3-feedback

If you have any questions or feedback, please reach out to the HR team.

Best regards,
Sarah Jenkins
VP of Human Resources`,
    isPhishing: false,
    explanation: "This email is legitimate. It is sent from an internal company domain, does not use panic-inducing language, does not ask for sensitive credentials or personal information, and links directly to the official internal company portal using a secure HTTPS URL. The deadline is reasonable (next Friday), and a contact name is provided.",
    redFlags: [
      "No red flags detected. The email comes from a trusted internal domain and links to a secure internal URL."
    ],
    recommendations: [
      "It is safe to interact with this email.",
      "Even with internal emails, it's good practice to verify that the sender's email matches your organization's domain exactly."
    ]
  },
  {
    id: "s4",
    title: "Netflix Billing Issue",
    senderName: "Netflix Support",
    senderEmail: "info@member-netflix-update.com",
    subject: "Action Required: Update your payment method",
    date: "3 days ago",
    body: `Dear Member,

We were unable to process your subscription renewal payment for this month. As a result, your Netflix membership has been temporarily suspended.

To reactivate your account, please update your billing information immediately by clicking the link below:

https://netflix-billing-update-center.com/login

If you do not update your payment details within 3 days, your account will be closed and your profile history will be deleted.

We apologize for any inconvenience.

The Netflix Team`,
    isPhishing: true,
    explanation: "This is a billing scam targeting Netflix subscribers. Attackers try to scare you with the threat of losing your watch history. Red flags include a suspicious sender domain, a generic greeting ('Dear Member'), urgent threats of account closure within 3 days, and a link to a fake login portal designed to steal your credit card details.",
    redFlags: [
      "Fake Sender Domain: The email is sent from 'member-netflix-update.com' instead of 'netflix.com'.",
      "Generic Greeting: Addresses you as 'Dear Member'.",
      "High Urgency: Threatens to close your account and delete your profile history in 3 days.",
      "Phishing Link: The link directs to 'netflix-billing-update-center.com', a malicious credential harvesting site."
    ],
    recommendations: [
      "Never click payment links in emails from streaming services. Log in to netflix.com directly in your browser.",
      "Check your billing status directly in your account settings.",
      "Netflix will never threaten to permanently delete your profile history immediately upon a single failed payment."
    ]
  }
];
