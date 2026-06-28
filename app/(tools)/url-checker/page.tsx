import { UrlChecker } from "@/components/features/url/UrlChecker";

export default function UrlCheckerPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Suspicious URL Checker
        </h1>
        <p className="text-muted-foreground">
          Not sure if a link is safe to click? Paste it below to scan for missing encryption, 
          suspicious keywords, and misleading domain structures.
        </p>
      </div>
      
      <UrlChecker />
    </div>
  );
}
