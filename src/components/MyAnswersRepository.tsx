import React, { useState } from "react";
import { BEHAVIORAL_QUESTIONS } from "../questionsData";
import { BehavioralUserAnswer } from "../types";
import { 
  BookMarked, 
  Search, 
  Trash2, 
  Edit3, 
  Copy, 
  Check, 
  FileText, 
  CornerDownRight, 
  CheckCircle,
  HelpCircle,
  ArrowRight
} from "lucide-react";

interface MyAnswersRepositoryProps {
  userAnswers: { [key: string]: BehavioralUserAnswer };
  onSaveAnswer: (questionId: string, answer: BehavioralUserAnswer) => void;
  onDeleteAnswer: (questionId: string) => void;
  onSelectTab: (tabId: "reflection" | "behavioral" | "repository") => void;
}

export default function MyAnswersRepository({
  userAnswers,
  onSaveAnswer,
  onDeleteAnswer,
  onSelectTab
}: MyAnswersRepositoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "finalized">("all");
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [editTextAreaVal, setEditTextAreaVal] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const savedList = Object.values(userAnswers);

  // Filter saved answers
  const filteredSavedAnswers = savedList.filter((ans) => {
    const question = BEHAVIORAL_QUESTIONS.find((q) => q.id === ans.questionId);
    if (!question) return false;

    const matchesSearch = question.questionText.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ans.answerText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ans.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStartEditing = (ans: BehavioralUserAnswer) => {
    setEditingAnswerId(ans.questionId);
    setEditTextAreaVal(ans.answerText);
  };

  const handleSaveEdit = (ans: BehavioralUserAnswer, newStatus?: "draft" | "finalized") => {
    const updated: BehavioralUserAnswer = {
      ...ans,
      answerText: editTextAreaVal,
      status: newStatus || ans.status,
      lastUpdated: new Date().toISOString()
    };
    onSaveAnswer(ans.questionId, updated);
    setEditingAnswerId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner Card */}
      <div className="bg-white rounded-3xl border border-brand-sand p-6 md:p-8 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-2xs font-extrabold uppercase tracking-widest font-mono bg-brand-straw text-brand-caramel border border-brand-gold/30">
            <BookMarked className="w-3.5 h-3.5" />
            My Personal Repository
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-black text-brand-charcoal tracking-tight pt-1">
            Standard Answers Vault
          </h1>
          <p className="text-sm text-brand-charcoal/70">
            A secured, auto-compiled database of your custom behavioral scripts. Take custody of your interview prep.
          </p>
        </div>

        <div className="bg-brand-cream border border-brand-sand rounded-2xl px-5 py-3 text-center">
          <div className="text-2xl font-serif font-black text-brand-moss">
            {savedList.length} / 50
          </div>
          <div className="text-[10px] font-bold font-mono text-brand-charcoal/60 uppercase tracking-wider py-1">
            Questions Mastered
          </div>
        </div>
      </div>

      {savedList.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-brand-sand p-12 text-center shadow-xs space-y-6 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-brand-cream border border-brand-sand flex items-center justify-center text-brand-moss/50 mx-auto">
            <BookMarked className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif font-black text-lg text-brand-charcoal">Answer Repository Empty</h3>
            <p className="text-xs text-brand-charcoal/60 max-w-sm mx-auto leading-relaxed">
              You haven't saved any behavioral answers yet. Start analyzing or draft questions to generate standard narrative assets to export.
            </p>
          </div>
          <button
            onClick={() => onSelectTab("behavioral")}
            className="inline-flex items-center gap-2 px-5 py-3 bg-brand-moss hover:bg-brand-moss/90 text-white font-bold text-xs rounded-full cursor-pointer shadow-md transition-all"
          >
            Go to 50 Questions Directory
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Content Pane */
        <div className="space-y-5">
          
          {/* Filters shelf */}
          <div className="bg-white rounded-3xl border border-brand-sand p-4 md:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search inputs */}
            <div className="relative w-full md:w-96">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-charcoal/40">
                <Search className="w-4 h-4" />
              </span>
              <input
                id="repo-search-input"
                type="text"
                placeholder="Search master answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs text-brand-charcoal placeholder-brand-charcoal/40 bg-brand-cream border border-brand-sand/80 rounded-xl py-2.5 pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-brand-moss focus:bg-white transition-all shadow-inner"
              />
            </div>

            {/* Status filters buttons */}
            <div className="flex items-center gap-1.5 self-stretch sm:self-auto overflow-x-auto">
              <span className="text-[10px] font-bold font-mono tracking-wider text-brand-charcoal/50 uppercase pr-1.5">
                FILTER:
              </span>
              {(["all", "draft", "finalized"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`text-[10px] font-bold font-mono tracking-wider px-3.5 py-2 border rounded-xl capitalize cursor-pointer transition-all ${
                    statusFilter === status
                      ? "bg-brand-moss text-white border-transparent shadow-2xs"
                      : "bg-white text-brand-charcoal/60 border-brand-sand hover:border-brand-moss hover:bg-brand-cream"
                  }`}
                >
                  {status === "all" ? "All Answers" : `${status}s`}
                </button>
              ))}
            </div>
          </div>

          {/* List of answers */}
          <div className="space-y-4">
            {filteredSavedAnswers.length === 0 ? (
              <div className="bg-white border border-brand-sand rounded-3xl p-12 text-center text-xs text-brand-charcoal/60">
                No saved answers match your filter query.
              </div>
            ) : (
              filteredSavedAnswers.map((ans) => {
                const question = BEHAVIORAL_QUESTIONS.find((q) => q.id === ans.questionId);
                const globalIndex = BEHAVIORAL_QUESTIONS.findIndex((item) => item.id === ans.questionId) + 1;
                const isEditing = editingAnswerId === ans.questionId;
                const lastUpdatedDate = new Date(ans.lastUpdated).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                });

                if (!question) return null;

                return (
                  <div
                    id={`repo-card-${ans.questionId}`}
                    key={ans.questionId}
                    className="bg-white border border-brand-sand rounded-3xl p-5 md:p-6 shadow-xs space-y-4 transition-all hover:border-brand-olive hover:shadow-2xs"
                  >
                    {/* Header bar */}
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-start gap-3">
                        <span className="font-serif text-xl font-bold text-brand-gold select-none mt-0.5">
                          {String(globalIndex).padStart(2, "0")}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[9px] font-bold font-mono text-brand-moss tracking-wider uppercase bg-brand-straw/45 px-2.5 py-0.5 rounded-md">
                              {question.category}
                            </span>
                            <span className={`inline-flex items-center gap-1 text-[9px] font-extrabold font-mono px-2 py-0.5 rounded-md border ${
                              ans.status === "finalized" 
                                ? "bg-brand-olive/30 text-brand-moss border-brand-olive" 
                                : "bg-brand-gold/15 text-brand-caramel border-brand-gold/30"
                            }`}>
                              {ans.status === "finalized" ? "Finalized Draft" : "Draft Asset"}
                            </span>
                          </div>
                          <h3 className="font-sans font-bold text-sm text-brand-charcoal leading-snug mt-1.5">
                            {question.questionText}
                          </h3>
                        </div>
                      </div>

                      {/* Top quick Actions */}
                      <div className="flex items-center gap-2 text-brand-charcoal/50">
                        <button
                          onClick={() => handleCopy(ans.answerText, ans.questionId)}
                          className="p-1 px-2.5 rounded-xl border border-brand-sand hover:border-brand-moss text-[10px] font-mono bg-white hover:bg-brand-cream font-bold cursor-pointer transition-colors inline-flex items-center gap-1"
                          title="Copy text of answer to clipboard"
                        >
                          {copiedId === ans.questionId ? (
                            <>
                              <Check className="w-3 h-3 text-brand-moss" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy Code
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this response from your personal repository?")) {
                              onDeleteAnswer(ans.questionId);
                            }
                          }}
                          className="p-2 rounded-xl text-brand-charcoal/30 hover:text-brand-caramel hover:bg-brand-straw cursor-pointer transition-all"
                          title="Delete response"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Answer area: view mode vs edit mode */}
                    {isEditing ? (
                      <div className="space-y-3 pt-2">
                        <textarea
                          id={`repo-textedit-${ans.questionId}`}
                          value={editTextAreaVal}
                          onChange={(e) => setEditTextAreaVal(e.target.value)}
                          rows={6}
                          className="w-full text-xs text-brand-charcoal bg-brand-cream border border-brand-sand rounded-xl p-4 focus:outline-none focus:ring-1 focus:ring-brand-moss resize-y leading-relaxed"
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-brand-charcoal/40">
                            {editTextAreaVal.length} characters
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingAnswerId(null)}
                              className="px-3 py-1.5 text-[10px] font-bold text-brand-charcoal/60 hover:text-brand-charcoal hover:bg-brand-cream border border-brand-sand rounded-lg cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveEdit(ans, "draft")}
                              className="px-3 py-1.5 text-[10px] font-bold text-brand-caramel bg-brand-straw border border-brand-olive rounded-lg cursor-pointer hover:bg-brand-olive/35"
                            >
                              Save Draft
                            </button>
                            <button
                              id={`btn-repo-save-finalize-${ans.questionId}`}
                              onClick={() => handleSaveEdit(ans, "finalized")}
                              className="px-4 py-1.5 text-[10px] font-bold text-white bg-brand-moss rounded-lg cursor-pointer hover:bg-brand-moss/95"
                            >
                              Finalize Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="bg-brand-cream border border-brand-sand/65 rounded-2xl p-4 md:p-5 relative">
                          <CornerDownRight className="w-4 h-4 text-brand-moss/40 absolute top-4 left-4" />
                          <div className="pl-6 text-xs text-brand-charcoal leading-relaxed whitespace-pre-wrap">
                            {ans.answerText}
                          </div>
                        </div>

                        {/* Summary details */}
                        <div className="flex items-center justify-between text-[10px] text-brand-charcoal/40 font-mono flex-wrap gap-2">
                          <span>Last updated: {lastUpdatedDate}</span>
                          <button
                            id={`btn-repo-edit-${ans.questionId}`}
                            onClick={() => handleStartEditing(ans)}
                            className="inline-flex items-center gap-1 text-brand-moss hover:text-brand-moss/80 font-bold transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" />
                            Edit Script/Answer
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

    </div>
  );
}
