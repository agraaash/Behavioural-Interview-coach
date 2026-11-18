import React, { useState } from "react";
import { AnalysisReport, ExerciseType } from "../types";
import { 
  Award, 
  BookOpen, 
  Terminal, 
  BadgeHelp, 
  Sparkles, 
  CheckCircle, 
  ArrowLeft, 
  Copy, 
  Printer, 
  Milestone
} from "lucide-react";

interface ReportViewerProps {
  type: ExerciseType;
  report: AnalysisReport;
  onBackToEdit: () => void;
  onStartNew: () => void;
}

export default function ReportViewer({
  type,
  report,
  onBackToEdit,
  onStartNew,
}: ReportViewerProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [completedMicrotasks, setCompletedMicrotasks] = useState<{ [key: number]: boolean }>({});

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const toggleMicrotask = (idx: number) => {
    setCompletedMicrotasks(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const starText = `SITUATION:\n${report.starMethodDraft.situation}\n\nTASK:\n${report.starMethodDraft.task}\n\nACTION:\n${report.starMethodDraft.action}\n\nRESULT:\n${report.starMethodDraft.result}`;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top action controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-sand pb-5">
        <button
          id="btn-back-to-replies"
          onClick={onBackToEdit}
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-charcoal/60 hover:text-brand-charcoal transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-brand-caramel" />
          Back & Edit Reflections
        </button>

        <div className="flex items-center gap-2">
          <button
            id="btn-print-report"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-brand-charcoal/70 bg-white hover:bg-brand-cream rounded-xl transition-all border border-brand-sand cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-brand-moss" />
            Print / PDF Report
          </button>
          
          <button
            id="btn-start-another-session"
            onClick={onStartNew}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-brand-charcoal hover:bg-brand-charcoal/90 rounded-full transition-all shadow-md cursor-pointer"
          >
            Reset Workspace
          </button>
        </div>
      </div>

      {/* Main Archetype Banner Card */}
      <div className={`relative overflow-hidden p-8 rounded-3xl border shadow-xs ${
        type === "strengths"
          ? "border-brand-olive bg-brand-olive/20"
          : "border-brand-gold bg-brand-straw/50"
      }`}>
        {/* Decorative pattern accent */}
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 filter blur-3xl -mr-16 -mt-16 ${
          type === "strengths" ? "bg-brand-moss" : "bg-brand-caramel"
        }`} />

        <div className="relative z-10">
          <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-2xs font-extrabold uppercase tracking-widest font-mono ${
            type === "strengths"
              ? "bg-brand-moss text-white"
              : "bg-brand-caramel text-white"
          }`}>
            <Award className="w-3.5 h-3.5" />
            Interview persona: {type === "strengths" ? "Core Powerhouse" : "Growth Catalyst"}
          </span>

          <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-charcoal mt-5 tracking-tight leading-none">
            {report.coreIdentifiedTheme}
          </h2>

          <div className="mt-6 max-w-4xl border-l-4 border-brand-charcoal pl-5 py-1">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/50 font-mono">
              Executive Diagnosis
            </h4>
            <p className="text-brand-charcoal text-sm md:text-base mt-2 leading-relaxed font-sans italic">
              "{report.executiveSummary}"
            </p>
          </div>
        </div>
      </div>

      {/* Structural layout: Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1 & 2: Deep Themes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-brand-sand p-6 md:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 sm:p-2.5 bg-brand-moss text-white rounded-xl shadow-xs">
                <BookOpen className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-serif font-black text-brand-charcoal tracking-tight">
                  Behavioral Patterns Analyzed
                </h3>
                <p className="text-xs text-brand-charcoal/50">
                  Detailed professional traits extracted based on your narrative responses
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {report.deepAnalysis.map((finding, idx) => (
                <div 
                  id={`finding-block-${idx}`}
                  key={idx} 
                  className="p-5 rounded-2xl border border-brand-sand bg-brand-cream hover:bg-brand-straw/20 transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-serif text-xl font-black text-brand-gold pr-1">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h4 className="font-bold text-brand-charcoal text-sm uppercase tracking-wide font-sans">
                      {finding.title}
                    </h4>
                  </div>
                  <p className="text-xs md:text-sm text-brand-charcoal/80 leading-relaxed pl-7">
                    {finding.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* STAR Method Pipeline Generator */}
          <div className="bg-white rounded-3xl border border-brand-sand p-6 md:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4 pb-4 border-b border-brand-sand/50">
              <div className="flex items-center gap-3">
                <span className="p-2 sm:p-2.5 bg-brand-caramel text-white rounded-xl shadow-xs">
                  <Terminal className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-serif font-black text-brand-charcoal tracking-tight">
                    STAR Response Template
                  </h3>
                  <p className="text-xs text-brand-charcoal/50">
                    Your real life narrative formatted into the layout recruiters look for
                  </p>
                </div>
              </div>

              <button
                id="btn-copy-star"
                onClick={() => handleCopy(starText, "star")}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-brand-moss hover:text-white bg-brand-straw hover:bg-brand-moss rounded-xl border border-brand-olive transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                {copiedSection === "star" ? "Copied STAR Draft!" : "Copy Full STAR Text"}
              </button>
            </div>

            {/* Visual Step Timeline */}
            <div className="space-y-4">
              
              {/* Situation */}
              <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-start">
                <div className="md:w-32 flex-shrink-0 flex items-center gap-2 py-1">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-black bg-brand-straw text-brand-caramel">
                    S
                  </span>
                  <span className="text-xs font-bold text-brand-charcoal font-mono tracking-wide">
                    SITUATION
                  </span>
                </div>
                <div className="flex-1 bg-brand-cream border border-brand-sand p-4 rounded-xl text-xs md:text-sm text-brand-charcoal/80 leading-relaxed">
                  {report.starMethodDraft.situation}
                </div>
              </div>

              {/* Task */}
              <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-start">
                <div className="md:w-32 flex-shrink-0 flex items-center gap-2 py-1">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-black bg-brand-olive/30 text-brand-moss">
                    T
                  </span>
                  <span className="text-xs font-bold text-brand-charcoal font-mono tracking-wide">
                    TASK
                  </span>
                </div>
                <div className="flex-1 bg-brand-cream border border-brand-sand p-4 rounded-xl text-xs md:text-sm text-brand-charcoal/80 leading-relaxed">
                  {report.starMethodDraft.task}
                </div>
              </div>

              {/* Action */}
              <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-start">
                <div className="md:w-32 flex-shrink-0 flex items-center gap-2 py-1">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-black bg-brand-straw text-brand-caramel">
                    A
                  </span>
                  <span className="text-xs font-bold text-brand-charcoal font-mono tracking-wide">
                    ACTION
                  </span>
                </div>
                <div className="flex-1 bg-brand-cream border border-brand-sand p-4 rounded-xl text-xs md:text-sm text-brand-charcoal/80 leading-relaxed">
                  {report.starMethodDraft.action}
                </div>
              </div>

              {/* Result */}
              <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-start">
                <div className="md:w-32 flex-shrink-0 flex items-center gap-2 py-1">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-black bg-brand-charcoal text-white">
                    R
                  </span>
                  <span className="text-xs font-bold text-brand-charcoal font-mono tracking-wide">
                    RESULT
                  </span>
                </div>
                <div className="flex-1 bg-brand-straw/30 border border-brand-olive p-4 rounded-xl text-xs md:text-sm text-brand-charcoal font-medium leading-relaxed">
                  {report.starMethodDraft.result}
                </div>
              </div>

            </div>

            <p className="text-2xs text-brand-charcoal/40 mt-5 italic">
              * Coach tip: Recruiters analyze how logically situations lead to deliberate actions and tangible outcomes. Use these bullet drafts to polish your responses recursively.
            </p>
          </div>
        </div>

        {/* Column 3: Recruitment context & Growth Map */}
        <div className="space-y-6">
          
          {/* Recruiter Evaluation Panel */}
          <div className="bg-white rounded-3xl border border-brand-sand p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <span className="p-1.5 bg-brand-cream text-brand-moss rounded-md border border-brand-sand">
                <BadgeHelp className="w-4 h-4 text-brand-caramel" />
              </span>
              <h4 className="text-xs font-bold text-brand-charcoal tracking-widest font-mono uppercase">
                The Recruiter's Lens
              </h4>
            </div>

            <p className="text-xs text-brand-charcoal/60 leading-relaxed">
              Why this category is critical during interview evaluations:
            </p>

            <div className="mt-3 bg-brand-straw/40 border border-brand-gold/30 p-4 rounded-xl font-sans text-xs text-brand-charcoal/80 leading-relaxed italic">
              {report.interviewSignificance}
            </div>
          </div>

          {/* Actionable Micro-Roadmap */}
          <div className="bg-white rounded-3xl border border-brand-sand p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <span className="p-1.5 bg-brand-olive/30 text-brand-moss rounded-md">
                <Milestone className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-brand-charcoal tracking-widest font-mono uppercase">
                  30-Day Growth Roadmap
                </h4>
                <p className="text-2xs text-brand-charcoal/40">Micro-habits for active development</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {report.coachingRoadmap.map((roadmapItem, idx) => {
                const isDone = completedMicrotasks[idx] || false;
                return (
                  <div 
                    id={`roadmap-item-${idx}`}
                    key={idx} 
                    onClick={() => toggleMicrotask(idx)}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      isDone 
                        ? "bg-brand-cream border-brand-sand line-through opacity-50" 
                        : "bg-white border-brand-sand hover:border-brand-moss"
                    }`}
                  >
                    <button
                      id={`checkbox-roadmap-${idx}`}
                      className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors ${
                        isDone 
                          ? "bg-brand-moss border-transparent text-white" 
                          : "border-brand-sand hover:border-brand-moss"
                      }`}
                    >
                      {isDone && <CheckCircle className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-xs text-brand-charcoal/80 leading-relaxed selection:bg-transparent">
                      {roadmapItem}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
