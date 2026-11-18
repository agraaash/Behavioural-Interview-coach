import React from "react";
import { SavedSession } from "../types";
import { History, Calendar, ChevronRight, AlertTriangle, CheckCircle, Trash2 } from "lucide-react";

interface HistoryLogProps {
  sessions: SavedSession[];
  onSelectSession: (session: SavedSession) => void;
  onDeleteSession: (sessionId: string) => void;
  currentActiveId?: string;
}

export default function HistoryLog({
  sessions,
  onSelectSession,
  onDeleteSession,
  currentActiveId,
}: HistoryLogProps) {
  if (sessions.length === 0) {
    return (
      <div className="bg-brand-cream border border-brand-sand/80 rounded-2xl p-6 text-center select-none">
        <div className="mx-auto w-10 h-10 bg-white border border-brand-sand flex items-center justify-center text-brand-moss rounded-full mb-3">
          <History className="w-5 h-5" />
        </div>
        <h4 className="text-xs font-bold text-brand-charcoal">No previous profiles</h4>
        <p className="text-[11px] text-brand-charcoal/60 mt-1 max-w-xs mx-auto leading-normal">
          Reflect on strengths or weaknesses and trigger the AI coach to begin tracking.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-brand-sand p-5 shadow-xs space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-brand-sand">
        <History className="w-4 h-4 text-brand-moss" />
        <h3 className="text-xs font-bold text-brand-charcoal tracking-widest font-mono uppercase">
          Reflection History ({sessions.length})
        </h3>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
        {sessions.map((session) => {
          const formattedDate = new Date(session.timestamp).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          });

          const isStrengths = session.type === "strengths";
          const isSelected = currentActiveId === session.id;

          return (
            <div
              id={`history-item-${session.id}`}
              key={session.id}
              className={`group flex items-center justify-between p-3 rounded-xl border transition-all duration-200 text-left ${
                isSelected
                  ? "border-brand-moss bg-brand-olive/20 shadow-2xs animate-pulse-once"
                  : "border-brand-sand hover:border-brand-moss bg-white"
              }`}
            >
              <button
                id={`btn-load-history-${session.id}`}
                onClick={() => onSelectSession(session)}
                className="flex-1 flex items-start gap-2.5 cursor-pointer text-left focus:outline-none"
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs mt-0.5 ${
                  isStrengths 
                    ? "bg-brand-olive/30 text-brand-moss" 
                    : "bg-brand-straw text-brand-caramel"
                }`}>
                  {isStrengths ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertTriangle className="w-4 h-4" />
                  )}
                </span>

                <div className="truncate pr-1">
                  <h4 className="text-xs font-bold text-brand-charcoal leading-snug group-hover:text-brand-caramel transition-colors capitalize truncate">
                    {session.analysis?.coreIdentifiedTheme || `${session.type} Reflection`}
                  </h4>
                  <span className="flex items-center gap-1 text-[10px] text-brand-charcoal/50 font-mono mt-0.5">
                    <Calendar className="w-3 h-3" />
                    {formattedDate}
                  </span>
                </div>
              </button>

              <div className="flex items-center gap-1">
                <button
                  id={`btn-delete-history-${session.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm("Delete this session record?")) {
                      onDeleteSession(session.id);
                    }
                  }}
                  className="p-1.5 text-brand-charcoal/30 hover:text-brand-caramel hover:bg-brand-straw rounded-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Delete Session"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <ChevronRight className={`w-4 h-4 text-brand-charcoal/30 group-hover:text-brand-charcoal transition-transform ${isSelected ? "translate-x-0.5" : ""}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
