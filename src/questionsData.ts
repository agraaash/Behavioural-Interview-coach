export interface BehavioralQuestion {
  id: string;
  category: "Conflict" | "Leadership" | "Teamwork" | "Failure & Challenge" | "Adaptability" | "Success & Impact";
  questionText: string;
  source: string;
  prompts: string[];
}

export const BEHAVIORAL_QUESTIONS: BehavioralQuestion[] = [
  // Category: Teamwork
  {
    id: "bq1",
    category: "Teamwork",
    questionText: "Tell me about a time you had to work with someone whose personality or work style was very different from yours.",
    source: "Glassdoor, Reddit",
    prompts: [
      "What was their working style (e.g., highly analytical vs fast/casual), and what friction did it cause?",
      "How did you adapt your communication or approach to create a comfortable middle ground?",
      "What did the collaboration achieve, and what did you learn about working with diverse profiles?"
    ]
  },
  {
    id: "bq2",
    category: "Teamwork",
    questionText: "Describe a situation where your team was disagreeing on how to solve a problem. How did you align everyone?",
    source: "Google, Glassdoor",
    prompts: [
      "What was the core disagreement or competing approach?",
      "What steps did you take to facilitate an objective comparison (e.g., listing pros/cons, prototyping)?",
      "How did you establish a consensus or decide on a constructive way forward?"
    ]
  },
  {
    id: "bq3",
    category: "Teamwork",
    questionText: "Describe a time you contributed to a project that would have failed without teamwork and deep collaboration.",
    source: "Ambition Box, Twitter",
    prompts: [
      "What was the ambitious goal, and what made it too complex for one person to build/solve?",
      "What specific portion did you own, and how did you synchronise with other team members?",
      "What was the final impact, and how did you celebrate or recognize your collaborators' efforts?"
    ]
  },
  {
    id: "bq4",
    category: "Teamwork",
    questionText: "Tell me about a time you noticed a co-worker or classmate was struggling with their workload. What did you do?",
    source: "Reddit, Glassdoor",
    prompts: [
      "What indicators or conversations made you realize they were overwhelmed?",
      "How did you offer assistance without making them feel incompetent or micromanaged?",
      "What was the result of your support on the project timeline and your relationship?"
    ]
  },
  {
    id: "bq5",
    category: "Teamwork",
    questionText: "Share an experience where you had to depend on information from someone else to complete a task, but they were unresponsive.",
    source: "Google, Glassdoor",
    prompts: [
      "What critical information/asset did you need, and why was it blocking your progress?",
      "How did you reach out to them (e.g., politely follow up, offer help on their side, escalate)?",
      "How did you manage the delay to ensure your own deadlines were met?"
    ]
  },
  {
    id: "bq6",
    category: "Teamwork",
    questionText: "Describe a time you had to deliver difficult feedback to a peer, co-worker, or classmate.",
    source: "Reddit Interview Prep",
    prompts: [
      "What constructive feedback was necessary, and what was the risk of not delivering it?",
      "How did you phrase the feedback to keep it focused on actions/outcomes rather than personal traits?",
      "How did the recipient respond, and how did it influence your future teamwork?"
    ]
  },
  {
    id: "bq7",
    category: "Teamwork",
    questionText: "Tell me about a time you joined a pre-existing project team or inherited another person's code/work.",
    source: "Twitter Engineering, Glassdoor",
    prompts: [
      "What was the state of the inherited project/codebase, and what was the learning curve?",
      "How did you build trust with the existing team members without criticizing the previous person's output?",
      "What was your first meaningful contribution to the project?"
    ]
  },
  {
    id: "bq8",
    category: "Teamwork",
    questionText: "Describe a time when you had to share credit for a major achievement with a team, even though you felt you did the majority of the work.",
    source: "Ambition Box, Google",
    prompts: [
      "What was the project, and what was the extent of your extra contribution?",
      "Why was it professionally important to present a unified team achievement?",
      "How did you ensure everyone’s role was communicated fairly without engendering resentment?"
    ]
  },

  // Category: Leadership
  {
    id: "bq9",
    category: "Leadership",
    questionText: "Tell me about a time you took the lead on a project or initiative when no official leader was assigned.",
    source: "Glassdoor, Google",
    prompts: [
      "What was the project, and why was there a leadership/coordination vacuum?",
      "How did you step up (e.g., organizing tasks, setting up meetings) without overstepping boundaries?",
      "What did the team accomplish under your informal guidance?"
    ]
  },
  {
    id: "bq10",
    category: "Leadership",
    questionText: "Describe a situation where you had to motivate team members who showed little interest or enthusiasm.",
    source: "Reddit, Ambition Box",
    prompts: [
      "Why was the team morale low or disconnected initially?",
      "What creative motivational strategies did you implement (e.g., aligning work to interests, establishing gamified milestones)?",
      "What was the final outcome, and how did engagement level shift?"
    ]
  },
  {
    id: "bq11",
    category: "Leadership",
    questionText: "Tell me about a time you had to make a highly unpopular decision in a group. How did you handle the pushback?",
    source: "Google, Glassdoor",
    prompts: [
      "What was the decision, and why was it necessary but unpopular?",
      "How did you communicate the rationale or tradeoffs to transparently address their concerns?",
      "How did the project turn out, and how did you rebuild alignment afterward?"
    ]
  },
  {
    id: "bq12",
    category: "Leadership",
    questionText: "Describe a time you delegated a significant task to someone else, but they ended up making a major error. How did you respond?",
    source: "Glassdoor",
    prompts: [
      "What was the task, and how was the error discovered?",
      "How did you take ultimate accountability as the lead rather than publicly blaming them?",
      "How did you collaborate with them to debug or fix the error, and what process was changed?"
    ]
  },
  {
    id: "bq13",
    category: "Leadership",
    questionText: "Tell me about a time you mentored or coached a classmate or colleague to help them achieve an objective.",
    source: "Reddit, Twitter",
    prompts: [
      "What was the skill gap or bottleneck they were trying to overcome?",
      "How did you break down the mentoring process (e.g., pair programming, mock reviews, sharing guides)?",
      "What was their outcome, and how did it influence their long-term growth?"
    ]
  },
  {
    id: "bq14",
    category: "Leadership",
    questionText: "Describe a situation where you identified an inefficiency in a project process and proposed a new standard.",
    source: "Ambition Box, Google",
    prompts: [
      "What was the bottleneck or friction point that people were tolerating?",
      "What solution or optimization did you propose, and what data/evidence did you use to justify it?",
      "How did you onboard others to this new standard, and what was the time/resource saved?"
    ]
  },
  {
    id: "bq15",
    category: "Leadership",
    questionText: "Tell me about a time you stood up for an idea or solution you believed in, even though superiors or senior members disagreed.",
    source: "Glassdoor, Tech Twitter",
    prompts: [
      "What was your proposed solution, and why did they disagree or push back?",
      "How did you construct your argument objectively (e.g., using test results, metrics, customer value)?",
      "What was the resolution or compromise, and what did you learn about presenting controversial opinions?"
    ]
  },

  // Category: Conflict
  {
    id: "bq16",
    category: "Conflict",
    questionText: "Describe a time you had a serious disagreement with a direct supervisor or professor. How did you resolve it?",
    source: "Glassdoor, Reddit",
    prompts: [
      "What was the core point of disagreement (e.g., project direction, grading criteria, architecture)?",
      "How did you arrange a private, respectful meeting to discuss this instead of arguing in public?",
      "What active listening techniques did you use, and what professional compromise did you reach?"
    ]
  },
  {
    id: "bq17",
    category: "Conflict",
    questionText: "Tell me about a time a customer or project stakeholder was highly critical or angry about your work. How did you de-escalate?",
    source: "Google, Ambition Box",
    prompts: [
      "What was the source of their frustration (e.g., mismanaged expectations, server crash, missing feature)?",
      "How did you demonstrate empathy and active listening to validate their feelings?",
      "What concrete action plan did you execute to resolve their immediate pain point and win back their trust?"
    ]
  },
  {
    id: "bq18",
    category: "Conflict",
    questionText: "Describe a time when you and a peer had differing technical approaches to a feature. How did you decide which to use?",
    source: "Twitter Engineering, Glassdoor",
    prompts: [
      "What were the two technical approaches (e.g., microservices vs monolith, React vs Vue)?",
      "What objective standards did you use to evaluate them fairly (e.g., proof-of-concept tests, latency metrics)?",
      "How did you preserve your relationship and align on the final decision?"
    ]
  },
  {
    id: "bq19",
    category: "Conflict",
    questionText: "Describe a situation where a classmate or colleague did not deliver on their promise, leaving you in a difficult spot.",
    source: "Reddit, Ambition Box",
    prompts: [
      "What had they committed to, and how did their failure affect your immediate timeline?",
      "How did you handle the emotional response and adapt to protect the project outcome?",
      "How did you address the accountability issue with them once the immediate crisis was resolved?"
    ]
  },
  {
    id: "bq20",
    category: "Conflict",
    questionText: "Tell me about a time you noticed unhealthy friction or division growing within a school or work group. What did you do?",
    source: "Glassdoor, Google",
    prompts: [
      "What was causing the sub-surface friction (e.g., lack of credit, unbalanced workloads)?",
      "What diplomatic steps did you take to bring people together or open communication lines?",
      "What was the result of your intervention on the team's operational rhythm?"
    ]
  },

  // Category: Failure & Challenge
  {
    id: "bq21",
    category: "Failure & Challenge",
    questionText: "Tell me about your biggest professional or academic mistake. What happened, and what did you learn?",
    source: "Reddit, Glassdoor",
    prompts: [
      "What was the mistake, and what circumstances or misjudgments led to it?",
      "How did you immediately own up to and communicate the issue to stakeholders rather than hiding it?",
      "What specific step-by-step mitigation plan did you execute, and what safety safeguards did you implement afterward?"
    ]
  },
  {
    id: "bq22",
    category: "Failure & Challenge",
    questionText: "Describe a time you set a goal for yourself that you failed to meet. Why did you fall short, and how did you adjust?",
    source: "Ambition Box, Google",
    prompts: [
      "What was the goal (e.g., getting a certification, building a side-project), and what metrics did you set?",
      "What unexpected hurdles or capacity errors caused you to miss it?",
      "How did you process this failure, and what was your adjusted plan or subsequent outcome?"
    ]
  },
  {
    id: "bq23",
    category: "Failure & Challenge",
    questionText: "Describe the most technically or logically challenging problem you have ever solved. What made it so difficult?",
    source: "Tech Twitter, Glassdoor",
    prompts: [
      "What was the complex problem, and why couldn't it be solved with standard copy-paste solutions?",
      "How did you break down the massive challenge into systematic diagnostic phases?",
      "What was your creative solution, and how did you verify it was stable?"
    ]
  },
  {
    id: "bq24",
    category: "Failure & Challenge",
    questionText: "Tell me about a time you had to complete a project with virtually no resources or budget. How did you get creative?",
    source: "Reddit, Google",
    prompts: [
      "What was the scope of the project, and what crucial resources were missing?",
      "What free/open-source assets, fallback workarounds, or shared scripts did you leverage?",
      "What was the final impact, and what did you learn about lean problem solving?"
    ]
  },
  {
    id: "bq25",
    category: "Failure & Challenge",
    questionText: "Describe a situation where you felt overwhelmed by the technical scope of a task. How did you navigate the learning curve?",
    source: "Twitter Engineering, Glassdoor",
    prompts: [
      "What was the technologies or concepts you were completely unfamiliar with?",
      "What structured learning plan did you design (e.g., reading docs, building micro-prototypes, talking to mentors)?",
      "How did you integrate the learnings into the main project successfully?"
    ]
  },
  {
    id: "bq26",
    category: "Failure & Challenge",
    questionText: "Tell me about a time when you had to manage multiple competing deadlines. How did you prioritize?",
    source: "Ambition Box, Reddit",
    prompts: [
      "What were the multiple deliverables, and what made the timeline seem realistic at first?",
      "What system did you use to evaluate priority (e.g., Eisenhower matrix, stakeholder urgency)?",
      "How did you communicate with stakeholders to adjust expectations on lower-priority items?"
    ]
  },
  {
    id: "bq27",
    category: "Failure & Challenge",
    questionText: "Describe a time you received critical feedback that was painful or difficult to accept.",
    source: "Google, Glassdoor",
    prompts: [
      "Who delivered the feedback, and why did it initially feel challenging or offensive?",
      "How did you separate your self-worth from your work to evaluate the feedback objectively?",
      "What changes did you actively make to your habits or code to address it?"
    ]
  },

  // Category: Adaptability
  {
    id: "bq28",
    category: "Adaptability",
    questionText: "Tell me about a time when a project's goals or requirements suddenly changed midway through. How did you adapt?",
    source: "Glassdoor, Google",
    prompts: [
      "What was the original goal, and what triggered the pivot mid-project?",
      "How did you audit your existing code/plans to find what was reusable vs what needed binning?",
      "How did you manage the stress of the change to deliver successfully under the new criteria?"
    ]
  },
  {
    id: "bq29",
    category: "Adaptability",
    questionText: "Describe a situation where you had to quickly learn a completely new tool or programming language to complete a task.",
    source: "Reddit, Ambition Box",
    prompts: [
      "What was the tool/language, and why was it mandated or chosen?",
      "What hands-on or real-world practice did you focus on to gain practical competence rapidly?",
      "How did your rapid adaptation impact the project results?"
    ]
  },
  {
    id: "bq30",
    category: "Adaptability",
    questionText: "Tell me about a time you had to adjust your communication style to explain a highly technical concept to a non-technical audience.",
    source: "Twitter, Glassdoor",
    prompts: [
      "What was the technical concept, and who was the audience (e.g., marketing team, clients)?",
      "What analogies, metaphors, or simplified visuals did you use to avoid confusing jargon?",
      "How did you verify they understood, and what business alignment was unlocked?"
    ]
  },
  {
    id: "bq31",
    category: "Adaptability",
    questionText: "Tell me about an experience playing a role on a team that you had never played before.",
    source: "Reddit, Google",
    prompts: [
      "What was this new role (e.g., project manager, UI builder), and why were you chosen?",
      "What initial discomfort did you face, and how did you cross-examine experts to learn?",
      "How did this broaden your empathy for other roles on a multidisciplinary team?"
    ]
  },
  {
    id: "bq32",
    category: "Adaptability",
    questionText: "Describe a time you had to work around a sudden environment or systemic shift (like shifting to remote work or server infrastructure changes).",
    source: "Ambition Box, Glassdoor",
    prompts: [
      "What was the environmental shift, and what daily habits or communication methods did it break?",
      "What deliberate replacement protocols did you set up to stay focused (e.g., asynchronous updates, better tooling)?",
      "What was the long-term benefit of this added flexibility?"
    ]
  },

  // Category: Success & Impact
  {
    id: "bq33",
    category: "Success & Impact",
    questionText: "Tell me about your proudest academic or professional achievement. Walk me through how you executed it.",
    source: "Glassdoor, Ambition Box",
    prompts: [
      "What was the achievement, and why was it deeply meaningful to you?",
      "What was the specific tactical plan you authored to reach this outcome?",
      "What were the measurable results (e.g., percentage, active users, load-time savings)?"
    ]
  },
  {
    id: "bq34",
    category: "Success & Impact",
    questionText: "Describe a time you went above and beyond your core job description or assignment requirements.",
    source: "Google, Glassdoor",
    prompts: [
      "What was your assigned scope, and what system opportunity did you notice outside of it?",
      "Why did you feel it was valuable enough to invest extra, unprompted energy?",
      "What was the positive impact of this extra effort on the overall organization?"
    ]
  },
  {
    id: "bq35",
    category: "Success & Impact",
    questionText: "Tell me about a feature or system you built that had a measurable business or performance impact.",
    source: "Reddit, Twitter",
    prompts: [
      "What was the feature/system, and what was the bottleneck prior to building it?",
      "What metrics did you track (e.g., load time down 40%, user engagement up 15%)?",
      "How did you present these metrics to prove your engineering choices were correct?"
    ]
  },
  {
    id: "bq36",
    category: "Success & Impact",
    questionText: "Describe an experience where you anticipated a major problem before it occurred and took preventive action.",
    source: "Google, Glassdoor",
    prompts: [
      "What indicators or observations made you anticipate the potential failure?",
      "What preventative measure did you design and propose to your team or lead?",
      "What was the disaster or resource cost that you successfully averted?"
    ]
  },
  {
    id: "bq37",
    category: "Success & Impact",
    questionText: "Tell me about a time you presented research or data that directly influenced a strategic team decision.",
    source: "Ambition Box",
    prompts: [
      "What research or analysis did you conduct, and what patterns did you highlight?",
      "How did you organize your presentation to make the insights clear and undeniable?",
      "What was the decision the team reached, and what was the strategic outcome?"
    ]
  },

  // Additional hybrid Glassdoor/Ambition Box trends (Questions 38 - 50)
  {
    id: "bq38",
    category: "Leadership",
    questionText: "Tell me about a time you had to onboard a new team member. How did you ensure they were productive quickly?",
    source: "Ambition Box",
    prompts: [
      "What was their background, and what made the configuration complex?",
      "What onboarding resources or checklists did you structure to help them find their footing?",
      "How long did it take them to ship their first task under your guide?"
    ]
  },
  {
    id: "bq39",
    category: "Conflict",
    questionText: "Describe a time your team was stuck in an infinite cycle of analysis paralysis. How did you force a decision?",
    source: "Reddit, Google",
    prompts: [
      "What was the decision, and what duplicate research was stalling progress?",
      "How did you define a clean deadline or risk-bounding prototype experiment?",
      "What was the resolution, and how did it save team development velocity?"
    ]
  },
  {
    id: "bq40",
    category: "Failure & Challenge",
    questionText: "Tell me about a project that was high-risk or had a high probability of failure. How did you mitigate those risks?",
    source: "Glassdoor, Twitter",
    prompts: [
      "What made the project exceptionally risky (e.g., novel libraries, strict deadline)?",
      "What proactive mitigation tasks (e.g., smoke tests, fallback pipelines) did you implement?",
      "What was the final outcome?"
    ]
  },
  {
    id: "bq41",
    category: "Adaptability",
    questionText: "Describe a situation where you had to work with extremely vague or poorly defined requirements. What was your strategy?",
    source: "Google, Glassdoor",
    prompts: [
      "What was the vague feature description, and why was the stakeholder unavailable to clarify?",
      "What user assumptions did you document and present as a proposal first?",
      "How did you incrementally build and gather feedback to prevent wasting development hours?"
    ]
  },
  {
    id: "bq42",
    category: "Teamwork",
    questionText: "Describe a situation where you had to align multiple cross-functional stakeholders who had competing priorities.",
    source: "Ambition Box",
    prompts: [
      "Who were the stakeholders (e.g., designers, developers, product managers), and what were their conflicting goals?",
      "How did you establish a mutually-beneficial framework (e.g. system reliability vs feature speed)?",
      "What was the shared roadmap you aligned them on?"
    ]
  },
  {
    id: "bq43",
    category: "Success & Impact",
    questionText: "Tell me about a time you successfully managed up—helping your manager or lead see a blindspot or adjust a timeline.",
    source: "Reddit, Twitter",
    prompts: [
      "What was the blindspot or incorrect estimate your manager was operating with?",
      "How did you prepare data/evidence to present your point collaboratively rather than defensively?",
      "How did they react, and what positive project change was implemented?"
    ]
  },
  {
    id: "bq44",
    category: "Failure & Challenge",
    questionText: "Tell me about a time when you had to prioritize your moral or professional standards over meeting a short-term project goal.",
    source: "Glassdoor",
    prompts: [
      "What was the risk or cutoff that was proposed (e.g., skipping user data validation, deploying insecure code)?",
      "How did you voice your concerns ethically to protect long-term trust/security?",
      "What was the compromise you achieved?"
    ]
  },
  {
    id: "bq45",
    category: "Adaptability",
    questionText: "Describe a time when you received contradictory instructions from two different authority figures (e.g. two professors or managers). How did you resolve the deadlock?",
    source: "Reddit",
    prompts: [
      "What were the duplicate conflicting instructions you received?",
      "How did you host a clarifying sync or communicate trade-offs rather than choosing one over the other?",
      "How was the aligned priority established?"
    ]
  },
  {
    id: "bq46",
    category: "Teamwork",
    questionText: "Describe a time you noticed an overlooked bug or flaw in a coworker's work. How did you communicate this to them?",
    source: "Twitter Engineering",
    prompts: [
      "What was the flaw, and why had it passed standard linting/reviews?",
      "How did you bring this to their attention privately (e.g., writing a supportive bug-case, pair debugging) to protect their confidence?",
      "How did they respond, and how did it affect your code standards?"
    ]
  },
  {
    id: "bq47",
    category: "Conflict",
    questionText: "Tell me about a time a project critique or code review was unusually harsh. How did you keep your composure and learn from it?",
    source: "Twitter, Reddit",
    prompts: [
      "What was the scenario, and what was the tone of the critique?",
      "What steps did you take to calm yourself, focus on the core value, and decline personal attacks?",
      "What action items did you execute to refine the codebase?"
    ]
  },
  {
    id: "bq48",
    category: "Failure & Challenge",
    questionText: "Describe a situation where you had to abandon a project you had worked on for months. How did you handle the disappointment?",
    source: "Google, Glassdoor",
    prompts: [
      "Why was the project cancelled (e.g., market changes, shifting priorities)?",
      "How did you catalog and document the components or routines so they could be reused in future setups?",
      "How did you transition your skills to the next task?"
    ]
  },
  {
    id: "bq49",
    category: "Leadership",
    questionText: "Describe a time you volunteered to do work that was highly tedious but absolutely critical for your team's success.",
    source: "Reddit, Ambition Box",
    prompts: [
      "What was this tedious manual task (e.g., cleaning up database records, configuring CI tests)?",
      "Why had everyone else avoided doing it?",
      "How did carrying this out strengthen your team's throughput or workflow stability?"
    ]
  },
  {
    id: "bq50",
    category: "Success & Impact",
    questionText: "Tell me about a time you noticed a customer or user pattern that no one else was paying attention to, leading to a product improvement.",
    source: "Ambition Box, Google",
    prompts: [
      "What was the subtle pattern you discovered (e.g., users consistently abandoning a signup step)?",
      "How did you prove this pattern was real using data or screenshots?",
      "What product improvement was created, and what was the outcome?"
    ]
  }
];
