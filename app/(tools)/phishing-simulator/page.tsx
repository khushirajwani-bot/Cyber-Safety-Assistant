import { Simulator } from "@/components/features/phishing/Simulator";

export default function PhishingSimulatorPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Phishing Detection Simulator
        </h1>
        <p className="text-muted-foreground">
          Test your skills! Read the emails below and decide if they are safe to interact with, 
          or if they are dangerous phishing attempts trying to steal your information.
        </p>
      </div>
      
      <Simulator />
    </div>
  );
}
