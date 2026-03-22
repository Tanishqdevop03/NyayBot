import { useState, useRef, useEffect } from "react";
import { Send, Scale, RotateCcw, ChevronDown, Info } from "lucide-react";
import AshokaChakra from "./AshokaChakra";
import LegalLoader from "./LegalLoader";
import ChatMessage from "./ChatMessage";
import OutOfScopeMessage from "./OutOfScopeMessage";
import ErrorMessage from "./ErrorMessage";
import { getLegalAdvice } from "../services/aiService";

const WELCOME_MSG = {
  id: "welcome",
  content: `🙏 **Namaste!** Welcome to **NyayaBot** — Your Indian Legal Assistant.\n\nI can help you understand Indian laws, legal rights, and procedures. Ask me about FIR filing, bail, property law, consumer rights, RTI, and more.\n\n*Disclaimer: This is general legal information, not professional legal advice.*`,
  role: "bot",
  timestamp: Date.now(),
};

const SUGGESTIONS = [
  "How to file an FIR?",
  "What are my bail rights?",
  "How to file RTI?",
  "Consumer complaint process",
  "Domestic violence protection",
  "Property dispute help",
];

const ChatUi = () => {
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [lastQuery, setLastQuery] = useState("");
  const scrollRef = useRef(null);

  const scrollToBottom = () =>
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 100);
  };

  const sendQuery = async (query) => {
    if (!query || isLoading) return;
    setLastQuery(query);

    const userMsg = { id: Date.now().toString(), content: query, role: "user", timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await getLegalAdvice(query);
      const isOutOfScope = reply.trim() === "__OUT_OF_SCOPE__";
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: reply,
        role: "bot",
        timestamp: Date.now(),
        isOutOfScope,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "bot",
        isError: true,
        timestamp: Date.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (text) => sendQuery((text || input).trim());

  const handleRetry = () => {
    setMessages(prev => prev.slice(0, -1));
    sendQuery(lastQuery);
  };

  const handleReset = () => {
    setMessages([WELCOME_MSG]);
    setInput("");
  };

  const showSuggestions = messages.length <= 1 && !isLoading;

  return (
    <div className="relative flex flex-col h-screen max-h-screen w-screen overflow-hidden bg-[#FAF7F3]">
      {/* Background Ashoka Chakra */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <AshokaChakra className="w-150 h-150 text-chakra-blue animate-chakra-spin opacity-60" />
      </div>

      {/* Tricolor top bar */}
      <div className="shrink-0 h-1 flex">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-card" />
        <div className="flex-1 bg-forest" />
      </div>

      {/* Header */}
      <header className="shrink-0 relative z-10 bg-white border-b border-border">
        <div className="w-full px-10 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Scale className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-md font-bold text-[#161A26] tracking-tight">NyayaBot</span>
            <span className="text-sm font-light text-muted-foreground hidden sm:block">• भारतीय कानूनी सहायक</span>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors duration-200 active:scale-95"
            title="New conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto chat-scroll relative z-10">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          {messages.map(msg =>
            msg.isError
              ? <ErrorMessage key={msg.id} onRetry={handleRetry} />
              : msg.isOutOfScope
                ? <OutOfScopeMessage key={msg.id} />
                : <ChatMessage key={msg.id} content={msg.content} role={msg.role} timestamp={msg.timestamp} />
          )}

          {isLoading && (
            <div className="animate-float-up">
              <LegalLoader />
            </div>
          )}

          {showSuggestions && (
            <div className="animate-float-up pt-2">
              <p className="text-xs text-[#161A26] mb-2 font-medium uppercase tracking-wider">Quick questions</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="px-3 py-1.5 rounded-full text-sm border border-border bg-white/10 text-zinc-600 hover:border-saffron hover:bg-saffron/5 transition-all duration-200 active:scale-95 backdrop-blur-sm"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll to bottom button */}
      {showScrollBtn && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-24 right-6 z-20 p-2 rounded-full bg-white border border-border shadow-md text-muted-foreground hover:text-foreground transition-all animate-float-up"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      )}

      {/* Input area */}
      <div className="shrink-0 relative z-10 bg-white border-t border-border">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about Indian law... (e.g., How to file FIR?)"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-[#FAF7F3] text-[#161A26] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary/40 transition-all duration-200 text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-center gap-1 mt-2">
            <span className="text-[10px] text-[#161A26] opacity-60 hidden sm:block text-center">
              NyayaBot provides general legal information, not professional legal advice. Consult a qualified advocate for specific cases.
            </span>
            <div className="sm:hidden relative flex items-center justify-center">
              <button onClick={() => setShowDisclaimer(p => !p)}>
                <Info className="w-3.5 h-3.5 text-muted-foreground opacity-60" />
              </button>
              {showDisclaimer && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 px-3 py-2 rounded-lg bg-[#161A26] text-white text-[10px] leading-relaxed z-30">
                  NyayaBot provides general legal information, not professional legal advice. Consult a qualified advocate for specific cases.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#161A26]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tricolor bottom bar */}
      <div className="shrink-0 h-1 flex">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-card" />
        <div className="flex-1 bg-forest" />
      </div>
    </div>
  );
};

export default ChatUi;
