const LegalLoader = () => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-2xl rounded-bl-sm max-w-[80%]">
      <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
        <div className="absolute w-0.5 h-6 bg-foreground/40 top-1 left-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 w-5 h-0.5 bg-foreground/40 left-1/2 -translate-x-1/2 rounded-full" />
        <div className="absolute top-1 w-8 h-0.5 bg-foreground/60 left-1/2 -translate-x-1/2 origin-center animate-scale-tip rounded-full">
          <div className="absolute -left-0.5 top-0.5 w-2.5 h-1.5 border border-foreground/30 rounded-b-full" />
          <div className="absolute -right-0.5 top-0.5 w-2.5 h-1.5 border border-foreground/30 rounded-b-full" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-muted-foreground">Consulting legal references...</span>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-saffron animate-legal-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalLoader;
