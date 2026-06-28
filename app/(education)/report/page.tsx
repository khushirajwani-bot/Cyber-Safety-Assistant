import { SafetyReport } from "@/components/features/report/SafetyReport";

export default function ReportPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Personalized Safety Report
        </h1>
        <p className="text-lg text-muted-foreground">
          Track your learning progress across the platform and export your results.
        </p>
      </div>
      
      <SafetyReport />
    </div>
  );
}
