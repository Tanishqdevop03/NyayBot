import { Scale, AlertCircle } from "lucide-react";

const OutOfScopeMessage = () => (
  <div className="animate-float-up flex justify-start">
    <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-saffron/30 bg-white overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-saffron/10 border-b border-saffron/20">
        <AlertCircle className="w-3.5 h-3.5 text-saffron shrink-0" />
        <span className="text-xs font-semibold text-saffron uppercase tracking-wider">Outside Scope</span>
      </div>
      <div className="px-4 py-3 flex gap-3 items-start">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Scale className="w-4 h-4 text-primary" />
        </div>
        <div className="space-y-1">
          <p className="text-sm text-[#161A26] font-medium">I can only assist with Indian legal matters.</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            My expertise is limited to Indian laws, legal rights, court procedures, police matters, and government schemes. Please ask me something within that domain.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default OutOfScopeMessage;
