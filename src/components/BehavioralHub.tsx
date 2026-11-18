import React, { useState } from "react";
import { BEHAVIORAL_QUESTIONS, BehavioralQuestion } from "../questionsData";
import { BehavioralUserAnswer } from "../types";
import { 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Search, 
  BookOpen, 
  ChevronRight, 
  PenTool, 
  RotateCcw,
  BookMarked,
  Info,
  CheckCircle
} from "lucide-react";

interface BehavioralHubProps {
  userAnswers: { [key: string]: BehavioralUserAnswer };
  onSaveAnswer: (questionId: string, answer: BehavioralUserAnswer) => void;
  onSelectTab: (tabId: "reflection" | "behavioral" | "repository") => void;
}

export default function BehavioralHub({
  userAnswers,
  onSaveAnswer,
  onSelectTab
}: BehavioralHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedQuestion, setSelectedQuestion] = useState<BehavioralQuestion | null>(BEHAVIORAL_QUESTIONS[0]);
  
  // Current question flow states
  const [knowsAnswer, setKnowsAnswer] = useState<boolean | null>(null);
  const [draftAnswerText, setDraftAnswerText] = useState<string>("");
  const [promptInputs, setPromptInputs] = useState<string[]>(["", "", ""]);
  const [synthesizedText, setSynthesizedText] = useState<string>("");
  const [successNotification, setSuccessNotification] = useState<string | null>(null);

  // Categories
  const categories = ["All", "Conflict", "Leadership", "Teamwork", "Failure & Challenge", "Adaptability", "Success & Impact"];

  // Filtered Questions
  const filteredQuestions = BEHAVIORAL_QUESTIONS.filter((q) => {
    const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
    const matchesSearch = q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // When a question is clicked
  const handleQuestionClick = (q: BehavioralQuestion) => {
    setSelectedQuestion(q);
    setSuccessNotification(null);
    
    // Retrieve previous answer if any
    const existing = userAnswers[q.id];
    if (existing) {
      setKnowsAnswer(existing.knowsAnswer);
      setDraftAnswerText(existing.answerText);
      if (existing.promptAnswers && existing.promptAnswers.length === 3) {
        setPromptInputs(existing.promptAnswers);
      } else {
        setPromptInputs(["", "", ""]);
      }
    } else {
      // Clear flow states
      setKnowsAnswer(null);
      setDraftAnswerText("");
      setPromptInputs(["", "", ""]);
      setSynthesizedText("");
    }
  };

  // Synthesize answer based on the 3 prompts if user selects No (prompts them to answer)
  const handleSynthesize = () => {
    if (!selectedQuestion) return;
    const [p1, p2, p3] = promptInputs;
    
    if (!p1.trim() && !p2.trim() && !p3.trim()) {
      alert("Please fill at least one of the prompt exercises so we can formulate a baseline draft.");
      return;
    }

    // Creating beautiful standard STAR-inspired stitched paragraph
    const p1Text = p1.trim() ? p1.trim() : "[Explain the situation context]";
    const p2Text = p2.trim() ? p2.trim() : "[Describe what you had to do]";
    const p3Text = p3.trim() ? p3.trim() : "[Explain the resultant outcome]";

    const resultNarrative = `Context details: ${p1Text}. To resolve this challenge, I specifically: ${p2Text}. Ultimately, this yielded the following results: ${p3Text}.`;
    
    setDraftAnswerText(resultNarrative);
    setSynthesizedText(resultNarrative);
    setKnowsAnswer(true); // Bring them to editing page
  };

  // Submit/save changes
  const handleSave = (status: "draft" | "finalized") => {
    if (!selectedQuestion) return;

    if (!draftAnswerText.trim()) {
      alert("Please enter some text before saving or finalizing your response.");
      return;
    }

    const payload: BehavioralUserAnswer = {
      questionId: selectedQuestion.id,
      status: status,
      answerText: draftAnswerText,
      knowsAnswer: knowsAnswer ?? true,
      promptAnswers: promptInputs,
      lastUpdated: new Date().toISOString()
    };

    onSaveAnswer(selectedQuestion.id, payload);
    setSuccessNotification(
      status === "finalized" 
        ? "Successfully saved to 'My Answers' repository! 🎉" 
        : "Draft saved successfully. Feel free to refine anytime below."
    );

    // Auto dismiss status bar
    setTimeout(() => {
      setSuccessNotification(null);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Visual Header Banner */}
      <div className="bg-white rounded-3xl border border-brand-sand p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-2xs font-extrabold uppercase tracking-widest font-mono bg-brand-olive/30 text-brand-moss border border-brand-olive/60">
            <span className="w-2 h-2 rounded-full bg-brand-moss" />
            Interview Vault
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-black text-brand-charcoal tracking-tight">
            50 Behavioral Interview Questions
          </h1>
          <p className="text-sm text-brand-charcoal/70 max-w-2xl">
            Compiled from core recruitment patterns on Glassdoor, Google, Reddit, and Ambition Box. Pick any question below, choose if you know the narrative, or let our step-by-step reflection engine draft it for you.
          </p>
        </div>
        <button
          onClick={() => onSelectTab("repository")}
          className="inline-flex items-center gap-2 px-5 py-3 bg-brand-caramel hover:bg-brand-caramel/90 text-white font-bold text-xs rounded-full shadow-md transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
        >
          <BookMarked className="w-4 h-4" />
          View My Repository ({Object.values(userAnswers).length})
        </button>
      </div>

      {/* Main Column Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: 50 Clickable Questions list */}
        <div className="lg:col-span-5 bg-white border border-brand-sand rounded-3xl p-5 shadow-xs flex flex-col h-[700px]">
          
          {/* Header Controls */}
          <div className="space-y-3 pb-4 border-b border-brand-sand/80">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-brand-charcoal">
                Interactive Directory
              </h3>
              <span className="text-[11px] font-mono text-brand-moss font-bold bg-brand-straw/60 px-2.5 py-0.5 rounded-full">
                {filteredQuestions.length} Questions
              </span>
            </div>

            {/* Live Text Search */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-charcoal/40">
                <Search className="w-4 h-4" />
              </span>
              <input
                id="hub-search-input"
                type="text"
                placeholder="Search queries, styles, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs text-brand-charcoal placeholder-brand-charcoal/40 bg-brand-cream border border-brand-sand/80 rounded-xl py-2.5 pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-brand-moss focus:bg-white transition-all shadow-inner"
              />
            </div>

            {/* Horizontal Filter Categories slider */}
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] font-bold font-mono tracking-wider px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all border cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-brand-moss text-white border-transparent shadow-2xs"
                      : "bg-brand-cream text-brand-charcoal/60 border-brand-sand hover:border-brand-moss hover:bg-brand-straw/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List panel */}
          <div className="flex-1 overflow-y-auto mt-3 pr-1 space-y-2 scrollbar-thin">
            {filteredQuestions.length === 0 ? (
              <div className="py-12 text-center text-brand-charcoal/50 text-xs">
                No questions match your filter query. Reset your criteria above.
              </div>
            ) : (
              filteredQuestions.map((q, index) => {
                const globalIndex = BEHAVIORAL_QUESTIONS.findIndex((item) => item.id === q.id) + 1;
                const isSelected = selectedQuestion?.id === q.id;
                const record = userAnswers[q.id];
                const isSaved = !!record;
                const isFinal = record?.status === "finalized";

                return (
                  <button
                    id={`btn-hub-question-${q.id}`}
                    key={q.id}
                    onClick={() => handleQuestionClick(q)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex gap-3.5 group relative hover:shadow-2xs ${
                      isSelected
                        ? "bg-brand-olive/20 border-brand-moss"
                        : "bg-white border-brand-sand/60 hover:bg-brand-cream"
                    }`}
                  >
                    {/* Index display */}
                    <span className="font-serif text-lg font-bold text-brand-gold/65 select-none w-6 text-right flex-shrink-0 mt-0.5">
                      {String(globalIndex).padStart(2, "0")}
                    </span>

                    {/* Question text block */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1 flex-wrap">
                        <span className="text-[9px] font-bold font-mono text-brand-moss uppercase tracking-wider bg-brand-straw/40 px-2 py-0.5 rounded-md">
                          {q.category}
                        </span>
                        {isSaved && (
                          <span className={`inline-flex items-center gap-1 text-[9px] font-extrabold font-mono px-1.5 py-0.2 rounded ${
                            isFinal ? "bg-brand-olive text-brand-moss" : "bg-brand-gold/25 text-brand-caramel border border-brand-gold/40"
                          }`}>
                            {isFinal ? "Finalized" : "Draft"}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-brand-charcoal leading-snug group-hover:text-brand-caramel transition-colors line-clamp-2">
                        {q.questionText}
                      </p>
                    </div>

                    <ChevronRight className={`w-4 h-4 text-brand-charcoal/30 group-hover:text-brand-charcoal mt-auto mb-auto transition-transform ${
                      isSelected ? "translate-x-0.5 text-brand-moss" : ""
                    }`} />
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Clickable Question Workspace Panel */}
        <div className="lg:col-span-7 bg-white border border-brand-sand rounded-3xl p-6 shadow-xs flex flex-col justify-between min-h-[500px]">
          {selectedQuestion ? (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              
              {/* Question Context Banner */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-brand-sand/80 pb-3">
                  <span className="text-xs font-bold font-mono tracking-widest text-brand-charcoal/50 uppercase">
                    ACTIVE REFLECTION WORKSPACE
                  </span>
                  <span className="text-[10px] font-mono text-brand-caramel border border-brand-gold/30 bg-brand-straw/40 px-3 py-0.5 rounded-full">
                    Source: {selectedQuestion.source}
                  </span>
                </div>

                <div className="bg-brand-cream border border-brand-sand rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-brand-gold/10 rounded-full" />
                  <p className="text-sm font-bold font-mono text-brand-moss uppercase tracking-wider mb-2">
                    {selectedQuestion.category} Question
                  </p>
                  <p className="text-base md:text-lg font-serif font-black text-brand-charcoal leading-relaxed relative z-10">
                    "{selectedQuestion.questionText}"
                  </p>
                </div>
              </div>

              {/* Status Alert Banner */}
              {successNotification && (
                <div className="p-3 bg-brand-olive/20 border border-brand-olive text-brand-moss rounded-2xl text-xs font-semibold flex items-center gap-2.5 animate-pulse-once">
                  <CheckCircle className="w-4 h-4 text-brand-moss" />
                  <span>{successNotification}</span>
                </div>
              )}

              {/* Dynamic Interactive Flow State Machine */}
              <div className="flex-1 mt-4">
                
                {knowsAnswer === null ? (
                  /* STEP 1: Ask "Do you know the answer?" */
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-6 max-w-md mx-auto animate-fade-in">
                    <div className="w-14 h-14 rounded-full bg-brand-straw flex items-center justify-center text-brand-caramel border border-brand-gold/35">
                      <HelpCircle className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-lg text-brand-charcoal">
                        Do you know your response for this?
                      </h4>
                      <p className="text-xs text-brand-charcoal/60 mt-2 leading-relaxed">
                        If you have a concrete project narrative or a story in mind, choose **Yes**. If not, let our step-by-step coaching prompts help you draft one.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <button
                        id="btn-hub-answer-yes"
                        onClick={() => {
                          setKnowsAnswer(true);
                          setDraftAnswerText("");
                        }}
                        className="flex-1 py-3 px-5 border border-brand-olive hover:bg-brand-olive/10 rounded-xl font-bold text-xs text-brand-moss cursor-pointer transition-all active:scale-[0.98]"
                      >
                        Yes, I already have a story
                      </button>
                      <button
                        id="btn-hub-answer-no"
                        onClick={() => {
                          setKnowsAnswer(false);
                          setPromptInputs(["", "", ""]);
                        }}
                        className="flex-1 py-3 px-5 bg-brand-straw hover:bg-brand-olive/30 border border-brand-olive text-brand-moss font-bold text-xs rounded-xl cursor-pointer transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-brand-caramel animate-pulse" />
                        No, help me draft one!
                      </button>
                    </div>
                  </div>
                ) : knowsAnswer === true ? (
                  /* STEP 2A: Yes - Input Field Workspace */
                  <div className="space-y-5 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold font-mono tracking-wider text-brand-moss">
                        ENTER YOUR PERSONALIZED ANSWER
                      </h4>
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to reset this question’s workflow?")) {
                            setKnowsAnswer(null);
                          }
                        }}
                        className="text-[10px] font-bold text-brand-charcoal/50 hover:text-brand-charcoal flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" /> Change approach choice
                      </button>
                    </div>

                    <div className="bg-brand-cream border border-brand-sand rounded-2xl p-4 text-xs text-brand-charcoal/80 space-y-1.5 leading-relaxed">
                      <p className="font-serif font-bold text-brand-charcoal flex items-center gap-1.5 text-2xs uppercase tracking-wide">
                        <Info className="w-3.5 h-3.5 text-brand-moss" />
                        Coach tip: Optimize using the STAR response format
                      </p>
                      <p className="text-[11px] text-brand-charcoal/60">
                        Deliver high impact by detailing the **S**ituation (15%), **T**ask (10%), **A**ction you implemented (60%), and measurable **R**esults (15%).
                      </p>
                    </div>

                    <div className="space-y-2">
                      <textarea
                        id="hub-textarea-answer"
                        value={draftAnswerText}
                        onChange={(e) => setDraftAnswerText(e.target.value)}
                        placeholder="Once, during our software development release..."
                        rows={10}
                        maxLength={4000}
                        className="w-full text-xs text-brand-charcoal placeholder-brand-charcoal/40 bg-brand-cream focus:bg-white border border-brand-sand/80 focus:ring-1 focus:ring-brand-moss rounded-2xl p-4 outline-none resize-y transition-all leading-relaxed shadow-inner"
                      />
                      <div className="flex justify-between text-[11px] text-brand-charcoal/40 font-mono">
                        <span>Keep it concise, clear, and action-oriented.</span>
                        <span>{draftAnswerText.length} / 4000 characters</span>
                      </div>
                    </div>

                    {/* Action buttons for saving */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-sand/50">
                      <button
                        id="btn-hub-save-draft"
                        onClick={() => handleSave("draft")}
                        className="px-5 py-2.5 border border-brand-sand hover:border-brand-moss bg-white hover:bg-brand-cream font-bold text-xs rounded-xl cursor-pointer text-brand-charcoal transition-all"
                      >
                        Save as Draft
                      </button>
                      <button
                        id="btn-hub-finalize"
                        onClick={() => handleSave("finalized")}
                        className="px-6 py-2.5 bg-brand-moss hover:bg-brand-moss/90 text-white font-bold text-xs rounded-xl cursor-pointer transition-all shadow-md inline-flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Finalize & Save
                      </button>
                    </div>
                  </div>
                ) : (
                  /* STEP 2B: No - Bite-Sized Prompt Exercise */
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold font-mono tracking-wider text-brand-moss">
                          REFLECTION LAB EXERCISES
                        </h4>
                        <p className="text-[10px] text-brand-charcoal/50">Answer these quick prompts to auto-structure an answer draft.</p>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to change your workflow choice?")) {
                            setKnowsAnswer(null);
                          }
                        }}
                        className="text-[10px] font-bold text-brand-charcoal/50 hover:text-brand-charcoal flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" /> Change choices
                      </button>
                    </div>

                    <div className="space-y-4">
                      {selectedQuestion.prompts.map((prompt, idx) => (
                        <div key={idx} className="bg-brand-cream/80 border border-brand-sand/50 p-4 rounded-xl space-y-2">
                          <p className="text-xs font-bold text-brand-charcoal font-sans flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-brand-straw flex items-center justify-center font-mono text-[10px] text-brand-caramel border border-brand-gold/30">
                              {idx + 1}
                            </span>
                            {prompt}
                          </p>
                          <input
                            type="text"
                            value={promptInputs[idx] || ""}
                            maxLength={500}
                            onChange={(e) => {
                              const copy = [...promptInputs];
                              copy[idx] = e.target.value;
                              setPromptInputs(copy);
                            }}
                            placeholder="Brief bullet notes... (e.g. While working on a customer backend upgrade)"
                            className="w-full text-xs text-brand-charcoal placeholder-brand-charcoal/30 bg-white border border-brand-sand/60 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-brand-moss transition-all"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Synthesis action CTA */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-sand/50">
                      <button
                        id="btn-hub-synthesize"
                        onClick={handleSynthesize}
                        className="w-full sm:w-auto px-6 py-3 bg-brand-caramel hover:bg-brand-caramel/90 text-white font-bold text-xs rounded-xl cursor-pointer transition-all shadow-md inline-flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
                        Synthesize Exercises into Draft
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-3">
              <BookOpen className="w-12 h-12 text-brand-moss/40" />
              <h3 className="font-serif font-black text-brand-charcoal text-base">Select any Interview Question</h3>
              <p className="text-xs text-brand-charcoal/60 max-w-xs leading-relaxed">
                Click any of our 50 curated high-frequency behavioral questions in the directory side-pane to configure your responses.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
