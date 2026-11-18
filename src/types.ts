export type ExerciseType = "strengths" | "weaknesses";

export interface BehavioralUserAnswer {
  questionId: string;
  status: "draft" | "finalized";
  answerText: string;
  knowsAnswer: boolean;
  promptAnswers: string[]; // answers to the questionsData prompts list
  lastUpdated: string;
}

export interface Question {
  id: string;
  label: string;
  text: string;
  snippet: string; // concise high-level label
  placeholder: string;
}

export interface Answer {
  questionId: string;
  questionText: string;
  answerText: string;
}

export interface SavedSession {
  id: string;
  type: ExerciseType;
  timestamp: string;
  answers: Answer[];
  analysis?: AnalysisReport;
}

export interface DeepAnalysisFinding {
  title: string;
  details: string;
}

export interface StarMethodDraft {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface AnalysisReport {
  coreIdentifiedTheme: string;
  executiveSummary: string;
  deepAnalysis: DeepAnalysisFinding[];
  interviewSignificance: string;
  starMethodDraft: StarMethodDraft;
  coachingRoadmap: string[];
}

export const STRENGTH_QUESTIONS: Question[] = [
  {
    id: "s1",
    label: "Exercise 1: The Peak Experience",
    text: "Describe a specific situation in your career or life when you felt energized, highly capable, and completely 'in flow.' What were you doing, and what skills were you using?",
    snippet: "The Peak Flow Experience",
    placeholder: "e.g., During our university hackathon, I became the go-to technical lead. I stayed up for 24 hours debugging a real-time message stream. I felt energized because..."
  },
  {
    id: "s2",
    label: "Exercise 2: The Go-To Problem",
    text: "What are the specific kinds of problems or tasks that classmates, colleagues, or friends naturally come to you to solve? Why do they choose you?",
    snippet: "The Go-To Request Patterns",
    placeholder: "e.g., Whenever people are stuck pitching an idea or when there is an interpersonal conflict on a team, they come to me because I listen objectively and help reframe..."
  },
  {
    id: "s3",
    label: "Exercise 3: The Unsolicited Compliment",
    text: "Think of a time you received praise or positive feedback from an external group, peer, or lead that surprised you. What specific action or trait did they highlight?",
    snippet: "The Unexpected Feedback",
    placeholder: "e.g., During my internship, my manager told me they loved how organized my code review responses were. They said I was exceptionally rigorous, which surprised me because..."
  },
  {
    id: "s4",
    label: "Exercise 4: The Natural Learn",
    text: "What is a skill, tool, or subject that you picked up incredibly quickly—so fast that you wonder why other people struggle with it? How did you apply it?",
    snippet: "The Fast-Track Skill Mastery",
    placeholder: "e.g., I picked up SQL queries and database relational joins in a few hours. I designed the schema for our group project over a weekend, which usually takes people days to grasp..."
  },
  {
    id: "s5",
    label: "Exercise 5: The Resourceful Triumph",
    text: "Recall a project or challenge that started going wrong, but you managed to save it. What specific action did you take to turn it around?",
    snippet: "The Turnaround Save",
    placeholder: "e.g., In our capstone project, a package update broke our client's API connection 3 days before submission. I coordinated a hotfix schedule and set up fallback mock data so we could demo..."
  }
];

export const WEAKNESS_QUESTIONS: Question[] = [
  {
    id: "w1",
    label: "Exercise 1: The Recent Feedback Trap",
    text: "What is the most common piece of constructive feedback you have received from managers, peers, or teammates in recent years? What specific behaviors led to it?",
    snippet: "Constructive Criticism Patterns",
    placeholder: "e.g., In group projects, I am repeatedly told that I can be overly quiet or reticent in meetings, making others wonder if I agree or disagree with the direction. This happens because..."
  },
  {
    id: "w2",
    label: "Exercise 2: The Energy Drain",
    text: "Describe a type of task or situation that drains your energy or makes you procrastinate, even if you are capable of doing it. What specific friction does it cause?",
    snippet: "Energy-Draining Scenarios",
    placeholder: "e.g., Writing extensive documentation or creating detailed compliance manuals drains me. I procrastinate on it because I feel like I am not building anything active, which leads to..."
  },
  {
    id: "w3",
    label: "Exercise 3: The Recurrent Friction",
    text: "When working in a group, what specific situations tend to frustrate you or cause disagreement between you and others? How does your communication style play a role?",
    snippet: "Group Work Friction Points",
    placeholder: "e.g., I get frustrated when team members don't meet their self-committed deadlines or do sloppy work. When this happens, I tend to silently take over their work instead of giving feedback..."
  },
  {
    id: "w4",
    label: "Exercise 4: The Unmet Expectation",
    text: "Think of a time when a project or responsibility did not turn out as well as you hoped. If you're being honest with yourself, what personal limitation (delay, scope mismatch, etc.) contributed to that outcome?",
    snippet: "Detailed Personal Oversight",
    placeholder: "e.g., I tried to implement too many features for a mobile app project. I was too optimistic about my time, didn't ask local peers for help, and we ended up presenting an unstable build..."
  },
  {
    id: "w5",
    label: "Exercise 5: The Compensation Play",
    text: "When you are feeling overwhelmed, rushed, or under pressure, what are your default negative habits (e.g., over-thinking, micromanagement, rushing, silent suffering)? How does that affect final results?",
    snippet: "Stress Coping Defaults",
    placeholder: "e.g., Under pressure, I withdraw. I stop updating Discord/slack and bury my head in the code, which creates a communication black hole for my team who don't know my progress..."
  }
];
