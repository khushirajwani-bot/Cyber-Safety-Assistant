"use client";

import { useState } from "react";
import { learningModules, LearningModule } from "@/data/learning-modules";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ArrowLeft, Tag } from "lucide-react";

// Simple markdown-to-html parser for our basic needs
function renderMarkdown(md: string) {
  let html = md
    .replace(/### (.*?)\n/g, '<h3 class="text-xl font-bold mt-6 mb-3 text-primary">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code class="bg-muted px-1 rounded text-primary text-sm">$1</code>')
    .replace(/- (.*?)\n/g, '<li class="ml-4 list-disc mb-1">$1</li>');
  
  // Wrap non-tagged lines in paragraphs
  html = html.split('\n\n').map(p => {
    if (p.trim().startsWith('<h3') || p.trim().startsWith('<li') || p.trim() === '') return p;
    return `<p class="mb-4 leading-relaxed">${p}</p>`;
  }).join('');

  return { __html: html };
}

export function LearningHub() {
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null);

  if (activeModule) {
    return (
      <div className="w-full max-w-4xl mx-auto animate-in slide-in-from-right-8 duration-300">
        <Button 
          variant="ghost" 
          onClick={() => setActiveModule(null)}
          className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Hub
        </Button>
        
        <article className="bg-card border rounded-xl p-8 shadow-sm">
          <header className="mb-8 border-b pb-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md">
                <Tag className="h-3 w-3" />
                {activeModule.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {activeModule.readTimeMinutes} min read
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">{activeModule.title}</h1>
            <p className="text-xl text-muted-foreground mt-4">{activeModule.summary}</p>
          </header>
          
          <div 
            className="prose dark:prose-invert max-w-none text-foreground/90"
            dangerouslySetInnerHTML={renderMarkdown(activeModule.content)} 
          />
        </article>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningModules.map((module) => (
          <Card key={module.id} className="flex flex-col h-full hover:shadow-md transition-shadow border-primary/10 hover:border-primary/30">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                  {module.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {module.readTimeMinutes}m
                </span>
              </div>
              <CardTitle className="text-xl leading-tight">{module.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription className="text-sm line-clamp-3">
                {module.summary}
              </CardDescription>
            </CardContent>
            <CardFooter className="pt-4 border-t">
              <Button 
                variant="default" 
                className="w-full group"
                onClick={() => setActiveModule(module)}
              >
                <BookOpen className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Start Reading
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
