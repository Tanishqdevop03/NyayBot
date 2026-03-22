import { useState } from "react";
import { Copy, Check } from "lucide-react";

const parseMarkdown = (text) =>
  text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");

const formatTime = (ts) =>
  new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const ChatMessage = ({ content, role, timestamp }) => {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col gap-1 animate-float-up ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`group relative max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-white border border-border text-[#161A26] rounded-bl-sm"
        }`}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
      />
      <div className={`flex items-center gap-2 px-1 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {timestamp && (
          <span className="text-[10px] text-muted-foreground">{formatTime(timestamp)}</span>
        )}
        {!isUser && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied
              ? <><Check className="w-3 h-3 text-forest" /><span className="text-forest">Copied</span></>
              : <><Copy className="w-3 h-3" /><span>Copy</span></>
            }
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
