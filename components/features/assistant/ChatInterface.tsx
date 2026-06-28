"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, MessageSquare } from "lucide-react";
import { generateAssistantResponse } from "@/lib/mock-ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_PROMPTS = [
  "How do I identify phishing?",
  "Is public Wi-Fi safe?",
  "How do I create a strong password?",
  "What is ransomware?"
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I am your Cyber Safety Assistant. Ask me anything about passwords, phishing, or staying safe online.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageIdCounterRef = useRef(1);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessageId = messageIdCounterRef.current + 1;
    const aiMessageId = messageIdCounterRef.current + 2;
    messageIdCounterRef.current = aiMessageId;

    const userMessage: Message = {
      id: userMessageId,
      role: "user",
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: aiMessageId,
        role: "assistant",
        content: generateAssistantResponse(userMessage.content),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto h-[650px] flex flex-col shadow-lg border-primary/20">
      <CardHeader className="border-b bg-muted/30 pb-4">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Bot className="h-6 w-6" />
          Cyber Safety Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 overflow-hidden bg-background/50">
        <ScrollArea className="h-full p-4">
          <div className="flex flex-col gap-4 pb-4">
            {messages.map((msg, index) => (
              <div key={msg.id} className="flex flex-col">
                <div
                  className={`flex gap-3 max-w-[85%] ${
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <Avatar className="h-8 w-8 mt-1 border border-primary/20 shrink-0">
                    {msg.role === "assistant" ? (
                      <AvatarFallback className="bg-primary/10 text-primary"><Bot size={16}/></AvatarFallback>
                    ) : (
                      <AvatarFallback className="bg-blue-600 text-white"><User size={16}/></AvatarFallback>
                    )}
                  </Avatar>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-sm"
                        : "bg-muted/80 rounded-tl-sm border border-border/50"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>

                {/* Show suggested prompts only after the first assistant greeting */}
                {index === 0 && messages.length === 1 && (
                  <div className="mt-6 ml-11 flex flex-wrap gap-2 max-w-[85%] animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {SUGGESTED_PROMPTS.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="text-xs bg-background border border-primary/20 hover:border-primary hover:bg-primary/5 text-foreground px-3 py-2 rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <MessageSquare className="h-3 w-3 text-primary/70" />
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <Avatar className="h-8 w-8 mt-1 border border-primary/20 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary"><Bot size={16}/></AvatarFallback>
                </Avatar>
                <div className="rounded-2xl px-4 py-3 text-sm bg-muted/80 rounded-tl-sm border shadow-sm flex items-center gap-1">
                  <span className="animate-bounce inline-block w-1.5 h-1.5 bg-foreground/50 rounded-full"></span>
                  <span className="animate-bounce inline-block w-1.5 h-1.5 bg-foreground/50 rounded-full" style={{ animationDelay: "0.2s" }}></span>
                  <span className="animate-bounce inline-block w-1.5 h-1.5 bg-foreground/50 rounded-full" style={{ animationDelay: "0.4s" }}></span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="p-4 border-t bg-muted/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex w-full items-center gap-2"
        >
          <Input
            placeholder="Ask a cyber safety question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 h-12 focus-visible:ring-primary shadow-sm"
            disabled={isTyping}
          />
          <Button type="submit" size="icon" className="h-12 w-12 bg-blue-600 hover:bg-blue-700 shadow-sm" disabled={!input.trim() || isTyping}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
