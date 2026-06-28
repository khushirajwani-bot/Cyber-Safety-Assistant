import { ChatInterface } from "@/components/features/assistant/ChatInterface";

export default function AssistantPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          AI Cyber Safety Assistant
        </h1>
        <p className="text-muted-foreground">
          Have a question about a suspicious email, creating strong passwords, or safe browsing? 
          Ask our virtual assistant below!
        </p>
      </div>
      
      <ChatInterface />
    </div>
  );
}
