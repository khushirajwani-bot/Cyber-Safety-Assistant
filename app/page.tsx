import Link from "next/link";
import { ArrowRight, ShieldCheck, Lock, Search, GraduationCap, Bot, Activity, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-24 lg:pt-32 lg:pb-40 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary mb-6">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Your Personal Security Advisor
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-foreground">
            Empower Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              Digital Defenses
            </span>
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            An interactive educational platform designed to teach you how to spot threats, secure your data, and navigate the web with confidence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white" render={<Link href="/learning-hub" />} nativeButton={false}>
              Start Learning <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base" render={<Link href="/phishing-simulator" />} nativeButton={false}>
              Try the Simulator
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Comprehensive Security Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Test your knowledge and analyze your habits with our suite of browser-based security simulators.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Bot className="h-8 w-8 text-blue-500" />,
                title: "AI Assistant",
                desc: "Ask questions and get instant, tailored advice on common cybersecurity threats.",
                link: "/assistant"
              },
              {
                icon: <Lock className="h-8 w-8 text-indigo-500" />,
                title: "Password Analyzer",
                desc: "Check the strength of your passwords against modern cracking standards.",
                link: "/password-analyzer"
              },
              {
                icon: <Activity className="h-8 w-8 text-purple-500" />,
                title: "Phishing Simulator",
                desc: "Train your eye to spot malicious emails with realistic, interactive scenarios.",
                link: "/phishing-simulator"
              },
              {
                icon: <Search className="h-8 w-8 text-cyan-500" />,
                title: "URL Checker",
                desc: "Scan links for missing encryption, suspicious domains, and known red flags.",
                link: "/url-checker"
              }
            ].map((feature, idx) => (
              <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-shadow bg-background/50 backdrop-blur">
                <CardHeader>
                  <div className="mb-4 bg-muted w-14 h-14 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-6">
                    {feature.desc}
                  </CardDescription>
                  <Link href={feature.link} className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                    Launch Tool <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                Our platform uses a hands-on learning approach. Instead of just reading about security, you experience it.
              </p>
              
              <div className="space-y-8 mt-8">
                {[
                  { step: "1", title: "Learn the Basics", desc: "Read bite-sized articles in our Learning Hub to understand modern threats." },
                  { step: "2", title: "Test Your Skills", desc: "Use our interactive simulators to test passwords, URLs, and spot phishing emails." },
                  { step: "3", title: "Track Your Progress", desc: "View your Personalized Safety Report to see how your security posture improves over time." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 w-full bg-muted/50 rounded-2xl border p-8 relative overflow-hidden min-h-[400px] flex flex-col justify-center items-center text-center">
               <div className="absolute -right-20 -bottom-20 opacity-10">
                 <ShieldCheck className="w-96 h-96" />
               </div>
               <GraduationCap className="w-16 h-16 text-blue-500 mb-6" />
               <h3 className="text-2xl font-bold mb-2">100% Client-Side Privacy</h3>
               <p className="text-muted-foreground max-w-sm">
                 We respect your data. All analysis, simulations, and grading happen directly in your browser. Nothing is ever sent to a remote server.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="w-full py-20 bg-blue-950 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
             <BarChart3 className="w-12 h-12 mx-auto mb-4 text-blue-400" />
             <h2 className="text-3xl font-bold tracking-tight mb-4">The Threat Landscape</h2>
             <p className="text-blue-200/80 max-w-2xl mx-auto">
               Cybersecurity isn&apos;t just for IT professionals anymore. Everyone is a target.
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-blue-800">
            <div className="pt-6 md:pt-0 px-4">
              <div className="text-5xl font-extrabold text-blue-400 mb-2">90%</div>
              <p className="text-lg font-medium mb-2">of Cyber Attacks</p>
              <p className="text-sm text-blue-200/60">Begin with a phishing email targeting a specific individual.</p>
            </div>
            <div className="pt-6 md:pt-0 px-4">
              <div className="text-5xl font-extrabold text-indigo-400 mb-2">81%</div>
              <p className="text-lg font-medium mb-2">of Data Breaches</p>
              <p className="text-sm text-blue-200/60">Are caused by compromised, weak, or reused passwords.</p>
            </div>
            <div className="pt-6 md:pt-0 px-4">
              <div className="text-5xl font-extrabold text-purple-400 mb-2">39s</div>
              <p className="text-lg font-medium mb-2">Attack Frequency</p>
              <p className="text-sm text-blue-200/60">On average, a cyber attack occurs every 39 seconds globally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="w-full py-24 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Ready to Test Your Knowledge?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Put your skills to the test in a safe environment. Start by analyzing a suspicious email in our simulator.
          </p>
          <Button size="lg" className="h-14 px-10 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-500/20" render={<Link href="/phishing-simulator" />} nativeButton={false}>
            Launch Phishing Simulator <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
