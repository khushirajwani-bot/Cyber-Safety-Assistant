export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built for educational purposes. 
          <a href="/about-project" className="font-medium underline underline-offset-4"> About Project</a> | 
          <a href="/about-developer" className="font-medium underline underline-offset-4"> About Developer</a>
        </p>
      </div>
    </footer>
  );
}
