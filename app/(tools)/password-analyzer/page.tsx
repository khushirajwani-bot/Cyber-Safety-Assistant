import { PasswordAnalyzer } from "@/components/features/password/PasswordAnalyzer";

export default function PasswordAnalyzerPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Password Strength Analyzer
        </h1>
        <p className="text-muted-foreground">
          A strong password is your first line of defense against cyber attacks. 
          Use this tool to see how resilient your passwords are. We don&apos;t save any data you type here!
        </p>
      </div>
      
      <PasswordAnalyzer />
    </div>
  );
}
