import { AlertTriangle, RefreshCw } from "lucide-react";

const ErrorMessage = ({ onRetry }) => (
  <div className="animate-float-up flex justify-start">
    <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-red-200 bg-white overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border-b border-red-100">
        <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
        <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">Connection Error</span>
      </div>
      <div className="px-4 py-3 flex gap-3 items-start">
        <div className="space-y-2">
          <p className="text-sm text-[#161A26] font-medium">Unable to reach legal servers.</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Please check your internet connection and try again.
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-1.5 text-xs text-saffron hover:text-saffron/80 font-medium transition-colors mt-1"
            >
              <RefreshCw className="w-3 h-3" /> Try again
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default ErrorMessage;
