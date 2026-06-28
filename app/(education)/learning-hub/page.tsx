import { LearningHub } from "@/components/features/learning/LearningHub";

export default function LearningHubPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Cyber Safety Learning Hub
        </h1>
        <p className="text-lg text-muted-foreground">
          Knowledge is your best defense. Browse our collection of bite-sized articles to level up your digital security skills.
        </p>
      </div>
      
      <LearningHub />
    </div>
  );
}
