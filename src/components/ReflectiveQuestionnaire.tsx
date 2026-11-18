import React, { useState } from "react";
import { Question, Answer, ExerciseType } from "../types";
import { Sparkles, BrainCircuit, CheckCircle2, RotateCcw } from "lucide-react";

interface ReflectiveQuestionnaireProps {
  type: ExerciseType;
  questions: Question[];
  currentAnswers: { [key: string]: string };
  onAnswerChange: (questionId: string, answerText: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onLoadSamples: () => void;
}

export default function ReflectiveQuestionnaire({
  type,
  questions,
  currentAnswers,
  onAnswerChange,
  onSubmit,
  isLoading,
  onLoadSamples,
}: ReflectiveQuestionnaireProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Calculate stats
  const answeredCount = questions.filter(
    (q) => (currentAnswers[q.id] || "").trim().length >= 10
  ).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);
  const isSubmissionReady = answeredCount >= 2; // Allow submission with at least 2 answered questions

  return (
    <div className="bg-white rounded-3xl border border-brand-sand p-6 md:p-10 shadow-xs">
      {/* Exercise Banner */}
      <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-brand-sand/60">
        <div className="flex-1">
          <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold capitalize tracking-wide ${
            type === "strengths" 
              ? "bg-brand-olive/30 text-brand-moss border border-brand-olive/60" 
              : "bg-brand-straw text-brand-caramel border border-brand-gold/30"
          }`}>
            <span className={`w-2 h-2 rounded-full ${type === "strengths" ? "bg-brand-moss" : "bg-brand-caramel"}`} />
            Reflection lab: {type}
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-black text-brand-charcoal mt-3 tracking-tight">
            {type === "strengths" ? "Discover Your Core Strengths" : "Uncover Your Weaknesses"}
          </h2>
          <p className="text-sm text-brand-charcoal/70 mt-2 max-w-xl leading-relaxed">
            Answer the reflective exercises below with concrete life stories, feedback, or personal examples. Our AI coach synthesizes these memories to isolate your core behavioral patterns and format them into STAR templates.
          </p>
        </div>

        {/* Pre-fill / sample helper */}
        <button
          id={`btn-load-sample-${type}`}
          onClick={onLoadSamples}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-brand-moss bg-brand-straw hover:bg-brand-olive/40 rounded-xl transition-all border border-brand-olive cursor-pointer self-start md:self-center"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-caramel animate-pulse" />
          Load Sample Narrative Answers
        </button>
      </div>

      {/* Progress indicators */}
      <div className="mb-8 bg-brand-cream border border-brand-sand/80 p-5 rounded-2xl">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-xs font-bold text-brand-charcoal/80 font-mono tracking-wider">
            COMPLETION PROGRESS: {answeredCount} / {questions.length} REFLECTIONS
          </span>
          <span className="text-xs font-bold text-brand-moss font-mono">
            {progressPercent}% Done
          </span>
        </div>
        <div className="w-full h-2.5 bg-brand-sand rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-700 ${
              type === "strengths" ? "bg-brand-moss" : "bg-brand-caramel"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-2xs text-brand-charcoal/50 mt-2">
          * Please answer at least 2 questions with narrative details to trigger the AI synthesis correctly.
        </p>
      </div>

      {/* Question Cards Feed */}
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const value = currentAnswers[q.id] || "";
          const isAnswered = value.trim().length >= 10;
          const isCurrentFocused = focusedField === q.id;

          return (
            <div
              id={`card-${q.id}`}
              key={q.id}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row gap-6 items-start ${
                isCurrentFocused
                  ? "border-brand-moss bg-brand-straw/30 shadow-xs"
                  : isAnswered
                  ? "border-brand-olive bg-white"
                  : "border-brand-sand bg-white"
              }`}
            >
              {/* Natural Tones Serif Number Index */}
              <span className="font-serif text-3xl font-bold text-brand-gold/60 select-none">
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 w-full">
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <h3 className="text-xs font-bold text-brand-moss font-mono uppercase tracking-widest">
                    {q.snippet}
                  </h3>

                  {isAnswered && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-brand-olive/30 text-brand-moss text-[10px] font-bold font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-moss" />
                      Narrative Written
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-brand-charcoal mb-4 leading-relaxed">
                  {q.text}
                </p>

                {/* Styled cream input boxes representing Natural Tones design precisely */}
                <textarea
                  id={`textarea-answer-${q.id}`}
                  value={value}
                  onChange={(e) => onAnswerChange(q.id, e.target.value)}
                  onFocus={() => setFocusedField(q.id)}
                  onBlur={() => setFocusedField(null)}
                  maxLength={2000}
                  rows={4}
                  className="w-full text-sm text-brand-charcoal placeholder-brand-charcoal/40 bg-brand-cream border-0 focus:ring-1 focus:ring-brand-moss rounded-xl p-4 outline-none resize-y transition-all leading-relaxed shadow-inner"
                  placeholder={q.placeholder}
                />

                <div className="flex justify-between items-center mt-2">
                  <span className="text-[11px] text-brand-charcoal/50 italic">
                    Be descriptive. Mention context, actions, feelings, or real feedback.
                  </span>
                  <span className="text-2xs font-mono text-brand-charcoal/40">
                    {value.length} / 2000
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Actions */}
      <div className="mt-10 border-t border-brand-sand pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <button
          id="btn-nav-reset-inputs"
          onClick={() => {
            if (window.confirm("Are you sure you want to clean your current inputs?")) {
              questions.forEach((q) => onAnswerChange(q.id, ""));
            }
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-brand-charcoal/60 hover:text-brand-charcoal transition-colors border border-transparent rounded-xl cursor-pointer hover:bg-brand-cream"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Workspace Inputs
        </button>

        <button
          id={`btn-submit-${type}`}
          onClick={onSubmit}
          disabled={!isSubmissionReady || isLoading}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold shadow-md transition-all duration-300 text-sm cursor-pointer ${
            isSubmissionReady && !isLoading
              ? "bg-brand-caramel hover:bg-brand-caramel/90 text-white custom-shadow-caramel hover:-translate-y-0.5 active:translate-y-0"
              : "bg-brand-cream text-brand-charcoal/30 border border-brand-sand cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-brand-charcoal" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Coaching Synthesis Active...</span>
            </>
          ) : (
            <>
              <BrainCircuit className="w-4 h-4" />
              <span>Generate {type === "strengths" ? "Strength Map" : "Weakness Map"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Subcomponent: Safe display of headings to keep jsx clean
function HeadingTag({ q }: { q: Question }) {
  return (
    <h3 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
      {q.snippet}
    </h3>
  );
}
