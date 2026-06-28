import { Code, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function AboutDeveloperPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
        About the Developer
      </h1>
      
      <Card className="border-primary/20 shadow-lg text-center overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5 w-full"></div>
        <CardHeader className="-mt-16 pb-2">
          <div className="mx-auto bg-background p-2 rounded-full inline-block border shadow-sm">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <Code className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl mt-4">Student Developer</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-muted-foreground mb-6">
            Hi! I built the Cyber Safety Assistant as part of a student project. 
            I&apos;m passionate about web development, cybersecurity, and building educational 
            tools that make a positive impact.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <GithubIcon className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <LinkedinIcon className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
