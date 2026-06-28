import { ShieldCheck, Target, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutProjectPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
        About the Project
      </h1>
      
      <div className="space-y-8">
        <Card className="border-primary/20 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            The Cyber Safety Assistant was built as an educational cybersecurity awareness platform. 
            In an increasingly digital world, the weakest link in any security system is often human error. 
            This project aims to bridge the knowledge gap by providing interactive, easy-to-understand tools 
            that simulate real-world cyber threats.
          </CardContent>
        </Card>

        <Card className="border-primary/20 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Privacy by Design
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            This platform runs entirely within your web browser. There is no backend database, 
            and we do not collect, store, or transmit any of the data you enter. Your passwords, 
            the URLs you check, and your simulated chat interactions remain completely private 
            and exist only on your local machine.
          </CardContent>
        </Card>

        <Card className="border-primary/20 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Target Audience
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            This project is designed primarily for students, educators, and anyone looking to 
            improve their fundamental digital hygiene. By turning concepts like phishing detection 
            and password creation into interactive games, we make learning about cybersecurity engaging and memorable.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
