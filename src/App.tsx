import React, { useState, useEffect } from "react";
import { 
  STRENGTH_QUESTIONS, 
  WEAKNESS_QUESTIONS, 
  Question, 
  Answer, 
  SavedSession, 
  ExerciseType, 
  AnalysisReport 
} from "./types";
import ReflectiveQuestionnaire from "./components/ReflectiveQuestionnaire";
import ReportViewer from "./components/ReportViewer";
import HistoryLog from "./components/HistoryLog";
import BehavioralHub from "./components/BehavioralHub";
import MyAnswersRepository from "./components/MyAnswersRepository";
import { BehavioralUserAnswer } from "./types";
import { 
  Sparkles, 
  Compass, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb, 
  BookOpen, 
  History,
  Workflow,
  BookMarked
} from "lucide-react";

// Predefined deep narrative sample answers for fast-track app testing
const SAMPLE_STRENGTHS: { [key: string]: string } = {
  s1: "During our final semester capstone project, our production server crashed repeating memory allocation failures under high-concurrency simulation. While others panicked and suggested a full rollback, I took full developer ownership. I stayed up for 14 continuous hours, read garbage collection traces, identified the heap leak inside circular socket connections, and patched it. I felt incredibly energized by the complex debugging loop.",
  s2: "Whenever colleagues are stuck with backend architecture layout or confusing database join statements, they consistently come to me. I explain normalized schema designs simply, helping them visualize index traversals without jargon.",
  s3: "During my previous tech internship, our engineering director gave me unsolicited feedback stating that my system configuration guides were the most exhaustive and logical on-boarding documentation they'd seen in the company's registry. It surprised me since I thought making diagrams was trivial.",
  s4: "I learned PostgreSQL query optimization rules and explain-analyze metrics over a single weekend because our project queries was running slow. I immediately refactored the indexes, cutting query durations by 80%.",
  s5: "Our main third-party payment vendor changed their API response schema 24 hours before our live group presentation. I immediately coordinated a hotfix task flow and wrote a mock proxy layer that returned clean expected data, preventing a disastrous demo failure.",
};

const SAMPLE_WEAKNESSES: { [key: string]: string } = {
  w1: "During project code-reviews, my senior peer pointed out that I tend to keep technical designs too close to my chest and wait until everything is nearly completed before making pull requests. They advised that early drafting saves refactoring effort.",
  w2: "Writing manual software testing spreadsheets and repetitive release compliance protocols is incredibly energy-draining for me. I often procrastinate on these chores, prioritizing active writing of feature code.",
  w3: "When working in a team, I occasionally find myself losing patience with slow progress or missed deadlines. My communication style gets cold, and instead of taking time to coach or collaborate, I silently take on their pending tasks.",
  w4: "In our spring launch, I confidently committed to building two advanced background sync workers. I severely under-estimated the migration debt of our legacy API codebase, causing us to push the release date by an entire week.",
  w5: "Under heavy delivery pressure, I tend to withdraw. I stop posting daily status threads on Slack and focus entirely on coding until it is done. This creates a black box communication gap for surrounding stakeholders.",
};

export default function App() {
  const [activeNavTab, setActiveNavTab] = useState<"reflection" | "behavioral" | "repository">("reflection");
  const [behavioralAnswers, setBehavioralAnswers] = useState<{ [key: string]: BehavioralUserAnswer }>({});
  const [activeTab, setActiveTab] = useState<ExerciseType>("strengths");
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  
  // App-level views: "form" | "report"
  const [currentView, setCurrentView] = useState<"form" | "report">("form");
  const [selectedReportSession, setSelectedReportSession] = useState<SavedSession | null>(null);
  const [sessions, setSessions] = useState<SavedSession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load configuration and history dynamically on mount
  useEffect(() => {
    try {
      const storedAnswers = localStorage.getItem("interview_self_answers");
      if (storedAnswers) {
        setAnswers(JSON.parse(storedAnswers));
      }

      const storedSessions = localStorage.getItem("interview_self_sessions");
      if (storedSessions) {
        setSessions(JSON.parse(storedSessions));
      }

      const storedBehavioral = localStorage.getItem("behavioral_user_answers");
      if (storedBehavioral) {
        setBehavioralAnswers(JSON.parse(storedBehavioral));
      }
    } catch (e) {
      console.error("Local storage restoration failed:", e);
    }
  }, []);

  const handleSaveBehavioralAnswer = (questionId: string, payload: BehavioralUserAnswer) => {
    const updated = { ...behavioralAnswers, [questionId]: payload };
    setBehavioralAnswers(updated);
    localStorage.setItem("behavioral_user_answers", JSON.stringify(updated));
  };

  const handleDeleteBehavioralAnswer = (questionId: string) => {
    const updated = { ...behavioralAnswers };
    delete updated[questionId];
    setBehavioralAnswers(updated);
    localStorage.setItem("behavioral_user_answers", JSON.stringify(updated));
  };

  const handleAnswerChange = (questionId: string, text: string) => {
    const updatedAnswers = { ...answers, [questionId]: text };
    setAnswers(updatedAnswers);
    localStorage.setItem("interview_self_answers", JSON.stringify(updatedAnswers));
  };

  const loadSampleAnswers = (type: ExerciseType) => {
    const samples = type === "strengths" ? SAMPLE_STRENGTHS : SAMPLE_WEAKNESSES;
    const updatedAnswers = { ...answers, ...samples };
    setAnswers(updatedAnswers);
    localStorage.setItem("interview_self_answers", JSON.stringify(updatedAnswers));
  };

  const handleSelectSession = (session: SavedSession) => {
    setSelectedReportSession(session);
    setActiveTab(session.type);
    setCurrentView("report");
    setErrorMessage(null);
  };

  const handleDeleteSession = (sessionId: string) => {
    const remaining = sessions.filter((s) => s.id !== sessionId);
    setSessions(remaining);
    localStorage.setItem("interview_self_sessions", JSON.stringify(remaining));
    
    if (selectedReportSession?.id === sessionId) {
      setSelectedReportSession(null);
      setCurrentView("form");
    }
  };

  const handleResetWorkspace = () => {
    setSelectedReportSession(null);
    setCurrentView("form");
    setErrorMessage(null);
  };

  const handleAnalyzeResponses = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const questionsList = activeTab === "strengths" ? STRENGTH_QUESTIONS : WEAKNESS_QUESTIONS;
    
    // Package only answered questions
    const formattedAnswers: Answer[] = questionsList
      .filter((q) => (answers[q.id] || "").trim().length > 0)
      .map((q) => ({
        questionId: q.id,
        questionText: q.text,
        answerText: answers[q.id],
      }));

    if (formattedAnswers.length < 2) {
      setErrorMessage("Please fill at least 2 questions with standard reflective observations before submitting.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: activeTab,
          answers: formattedAnswers,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with state ${response.status}`);
      }

      const reportData: AnalysisReport = await response.json();

      // Bundle into historical session record
      const newSession: SavedSession = {
        id: `sess_${Date.now()}`,
        type: activeTab,
        timestamp: new Date().toISOString(),
        answers: formattedAnswers,
        analysis: reportData,
      };

      const updatedSessions = [newSession, ...sessions];
      setSessions(updatedSessions);
      localStorage.setItem("interview_self_sessions", JSON.stringify(updatedSessions));
      
      setSelectedReportSession(newSession);
      setCurrentView("report");

    } catch (err: any) {
      console.error("AI coaching retrieval failure:", err);
      setErrorMessage(err.message || "An unexpected error occurred while communicating with the analysis engine. Please verify your GEMINI_API_KEY settings.");
    } finally {
      setIsLoading(false);
    }
  };

  // Switch tabs (strengths vs weaknesses)
  const handleTabSwitch = (theme: ExerciseType) => {
    setActiveTab(theme);
    setErrorMessage(null);
    // If viewing a previous report not matching the switched tab, default back to form input
    if (selectedReportSession && selectedReportSession.type !== theme) {
      setSelectedReportSession(null);
      setCurrentView("form");
    } else if (!selectedReportSession) {
      setCurrentView("form");
    }
  };

  const activeQuestionsList = activeTab === "strengths" ? STRENGTH_QUESTIONS : WEAKNESS_QUESTIONS;

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-charcoal flex flex-col justify-between selection:bg-brand-olive selection:text-brand-moss">
      
      {/* Top Header Navigation */}
      <nav className="h-20 bg-white border-b border-brand-sand px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-moss rounded-xl flex items-center justify-center text-white font-serif font-black text-xl shadow-md border border-brand-olive/20">
            I
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-extrabold tracking-tight text-brand-charcoal leading-none">
              Insightful
            </span>
            <span className="text-[10px] font-bold text-brand-moss uppercase tracking-widest font-mono mt-1">
              Interview Coach Engine
            </span>
          </div>
        </div>

        {/* Global Nav indicators */}
        <div className="hidden md:flex items-center gap-6 font-mono text-[10px] uppercase font-bold tracking-wider">
          <button
            id="topnav-btn-reflection"
            onClick={() => setActiveNavTab("reflection")}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition-all cursor-pointer ${
              activeNavTab === "reflection" 
                ? "bg-brand-straw text-brand-moss border border-brand-olive" 
                : "text-brand-charcoal/50 hover:text-brand-charcoal"
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-brand-caramel" />
            Reflection Labs
          </button>

          <button
            id="topnav-btn-behavioral"
            onClick={() => setActiveNavTab("behavioral")}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition-all cursor-pointer ${
              activeNavTab === "behavioral" 
                ? "bg-brand-straw text-brand-moss border border-brand-olive" 
                : "text-brand-charcoal/50 hover:text-brand-charcoal"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-brand-caramel" />
            50 Behavioral Prompts
          </button>

          <button
            id="topnav-btn-repository"
            onClick={() => setActiveNavTab("repository")}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition-all cursor-pointer ${
              activeNavTab === "repository" 
                ? "bg-brand-straw text-brand-moss border border-brand-olive" 
                : "text-brand-charcoal/50 hover:text-brand-charcoal"
            }`}
          >
            <BookMarked className="w-3.5 h-3.5 text-brand-caramel" />
            My Answers ({Object.keys(behavioralAnswers).length})
          </button>
        </div>

        {/* User Visual avatar element */}
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-full bg-brand-gold border-2 border-white shadow-xs flex items-center justify-center font-serif text-brand-charcoal font-bold text-sm">
            C
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-brand-sand p-6 shadow-xs flex flex-col gap-4">
            <div className="pb-3 border-b border-brand-sand">
              <h2 className="font-serif text-lg font-bold text-brand-charcoal tracking-tight">
                Coach Navigation
              </h2>
              <p className="text-2xs text-brand-charcoal/60 leading-normal mt-1">
                Reflect, practice the 50 key questions, and export your personal scripts.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Lab 1 Selection: Self-Reflection strengths/weaknesses */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold font-mono tracking-wider text-brand-charcoal/40 uppercase block px-1">
                  1. Cognitive Labs
                </span>
                
                <button
                  id="btn-tab-strengths"
                  onClick={() => {
                    setActiveNavTab("reflection");
                    handleTabSwitch("strengths");
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left border transition-all duration-300 group cursor-pointer ${
                    activeNavTab === "reflection" && activeTab === "strengths"
                      ? "bg-brand-moss text-white border-transparent shadow-xs"
                      : "bg-white border-brand-sand hover:bg-brand-cream text-brand-charcoal hover:border-brand-moss"
                  }`}
                >
                  <div>
                    <p className="font-bold text-xs">Strengths Diagnosis</p>
                    <p className={`text-[10px] mt-0.5 ${activeNavTab === "reflection" && activeTab === "strengths" ? "text-brand-straw" : "text-brand-charcoal/60"}`}>
                      Focus on unique value
                    </p>
                  </div>
                  <span className="font-mono text-[9px] bg-brand-cream text-brand-moss font-bold px-1.5 py-0.5 rounded">A</span>
                </button>

                <button
                  id="btn-tab-weaknesses"
                  onClick={() => {
                    setActiveNavTab("reflection");
                    handleTabSwitch("weaknesses");
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left border transition-all duration-300 group cursor-pointer ${
                    activeNavTab === "reflection" && activeTab === "weaknesses"
                      ? "bg-brand-moss text-white border-transparent shadow-xs"
                      : "bg-white border-brand-sand hover:bg-brand-cream text-brand-charcoal hover:border-brand-moss"
                  }`}
                >
                  <div>
                    <p className="font-bold text-xs">Weaknesses Diagnosis</p>
                    <p className={`text-[10px] mt-0.5 ${activeNavTab === "reflection" && activeTab === "weaknesses" ? "text-brand-straw" : "text-brand-charcoal/60"}`}>
                      Uncover growth blocks
                    </p>
                  </div>
                  <span className="font-mono text-[9px] bg-brand-cream text-brand-moss font-bold px-1.5 py-0.5 rounded">B</span>
                </button>
              </div>

              {/* Lab 2: 50 Core Questions Hub */}
              <div className="space-y-1.5 pt-3 border-t border-brand-sand/65">
                <span className="text-[9px] font-bold font-mono tracking-wider text-brand-charcoal/40 uppercase block px-1">
                  2. Behavioral Masterclass
                </span>
                <button
                  id="btn-nav-behavioral-hub"
                  onClick={() => setActiveNavTab("behavioral")}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left border transition-all duration-300 group cursor-pointer ${
                    activeNavTab === "behavioral"
                      ? "bg-brand-moss text-white border-transparent shadow-xs"
                      : "bg-white border-brand-sand hover:bg-brand-cream text-brand-charcoal hover:border-brand-moss"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">50 Common Queries</span>
                  </div>
                  <span className="font-mono text-[8px] bg-brand-cream text-brand-moss font-bold px-1.5 py-0.5 rounded">50 Qs</span>
                </button>
              </div>

              {/* Lab 3: Saved Answers repository */}
              <div className="space-y-1.5 pt-3 border-t border-brand-sand/65">
                <span className="text-[9px] font-bold font-mono tracking-wider text-brand-charcoal/40 uppercase block px-1">
                  3. Exportable Assets
                </span>
                <button
                  id="btn-nav-repository"
                  onClick={() => setActiveNavTab("repository")}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left border transition-all duration-300 group cursor-pointer ${
                    activeNavTab === "repository"
                      ? "bg-brand-moss text-white border-transparent shadow-xs"
                      : "bg-white border-brand-sand hover:bg-brand-cream text-brand-charcoal hover:border-brand-moss"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BookMarked className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">My Answer Vault</span>
                  </div>
                  <span className="font-mono text-2xs bg-brand-straw text-brand-caramel font-bold px-2 py-0.5 rounded-full">
                    {Object.keys(behavioralAnswers).length}
                  </span>
                </button>
              </div>
            </div>

            {/* Micro Pro Tip alert inside sidebar */}
            <div className="p-4 rounded-xl bg-brand-straw border border-brand-olive mt-2">
              <div className="flex gap-2 items-start text-brand-moss">
                <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold font-serif leading-tight">Pro-tip for Results</p>
                  <p className="text-2xs leading-relaxed text-brand-charcoal/80 mt-1">
                    Your answers persist securely in this workspace. Finalize all standard scripts so you can review and duplicate them during live interviews!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Persistent History list inside sidebar (shows only on Reflection view for simplicity) */}
          {activeNavTab === "reflection" && (
            <HistoryLog 
              sessions={sessions} 
              onSelectSession={handleSelectSession}
              onDeleteSession={handleDeleteSession}
              currentActiveId={selectedReportSession?.id}
            />
          )}
        </aside>

        {/* Main Work Arena */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Global Alert messages handler */}
          {errorMessage && (
            <div className="p-4 bg-orange-50 border border-orange-200 text-orange-900 rounded-xl text-sm flex gap-3 items-start animate-fade-in">
              <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Reflection requirement unmet</p>
                <p className="text-xs opacity-90 mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Active View Router */}
          {activeNavTab === "behavioral" ? (
            <BehavioralHub
              userAnswers={behavioralAnswers}
              onSaveAnswer={handleSaveBehavioralAnswer}
              onSelectTab={setActiveNavTab}
            />
          ) : activeNavTab === "repository" ? (
            <MyAnswersRepository
              userAnswers={behavioralAnswers}
              onSaveAnswer={handleSaveBehavioralAnswer}
              onDeleteAnswer={handleDeleteBehavioralAnswer}
              onSelectTab={setActiveNavTab}
            />
          ) : currentView === "form" ? (
            <ReflectiveQuestionnaire
              type={activeTab}
              questions={activeQuestionsList}
              currentAnswers={answers}
              onAnswerChange={handleAnswerChange}
              onSubmit={handleAnalyzeResponses}
              isLoading={isLoading}
              onLoadSamples={() => loadSampleAnswers(activeTab)}
            />
          ) : selectedReportSession ? (
            <ReportViewer
              type={selectedReportSession.type}
              report={selectedReportSession.analysis!}
              onBackToEdit={() => setCurrentView("form")}
              onStartNew={handleResetWorkspace}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-brand-sand p-12 text-center shadow-xs">
              <Workflow className="w-12 h-12 text-brand-moss mx-auto mb-4" />
              <h3 className="text-lg font-bold">Workspace Inactive</h3>
              <p className="text-sm text-brand-charcoal/60 mt-1 max-w-sm mx-auto">
                No active session is currently running. Select a reflection lab or select an item from history to investigate.
              </p>
              <button
                id="btn-workspace-restore-form"
                onClick={() => setCurrentView("form")}
                className="mt-5 px-6 py-2.5 bg-brand-moss text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Go to lab inputs
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Elegant Micro Footer */}
      <footer className="h-12 bg-brand-footer border-t border-brand-sand px-6 md:px-12 flex items-center justify-between text-[10px] uppercase font-mono font-bold text-brand-charcoal/50">
        <span className="tracking-widest">Self-Awareness LAB ID: 419-INSIGHT</span>
        <span className="hidden sm:inline-block">Data is local, encrypted & private. Runs Gemini 3.5 AI</span>
        <span className="tracking-wider">v1.3</span>
      </footer>
    </div>
  );
}

