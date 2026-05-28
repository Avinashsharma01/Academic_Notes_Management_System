import { useNavigate } from "react-router-dom";


const coreCodingTools = [
  {
    name: "PostgreSQL Editor",
    type: "Database",
    level: "Beginner to Advanced",
    path: "/compilers/postgres",
    description:
      "Practice SQL queries, joins, views, and indexing with an interactive PostgreSQL workspace.",
  },
  {
    name: "Java Compiler",
    type: "Compiler",
    level: "Beginner to Advanced",
    path: "/compilers/java",
    description:
      "Write and run Java programs for OOP, collections, and DSA practice.",
  },
  {
    name: "JavaScript Compiler",
    type: "Compiler",
    level: "Beginner to Advanced",
    path: "/compilers/javascript",
    description:
      "Execute JavaScript code snippets quickly for logic building and interview prep.",
  },
  {
    name: "C++ Compiler",
    type: "Compiler",
    level: "Intermediate to Advanced",
    path: "/compilers/cpp",
    description:
      "Compile C++ programs for STL, algorithms, and competitive coding practice.",
  },
  {
    name: "C Compiler",
    type: "Compiler",
    level: "Beginner to Intermediate",
    path: "/compilers/c",
    description:
      "Build strong fundamentals with pointers, structures, and low-level concepts.",
  },
  {
    name: "Python Compiler",
    type: "Compiler",
    level: "Beginner to Advanced",
    path: "/compilers/python",
    description:
      "Run Python programs for scripting, automation, and problem solving.",
  },
  {
    name: "HTML/CSS Playground",
    type: "Frontend",
    level: "Beginner to Intermediate",
    path: "/compilers/html-css",
    description:
      "Design and preview web pages live while learning layout and responsive UI.",
  },
  {
    name: "Git Practice Lab",
    type: "Dev Tool",
    level: "Beginner to Intermediate",
    path: "/practice/git",
    description:
      "Learn Git commands, branching, merging, and conflict resolution safely.",
  },
  {
    name: "Regex Tester",
    type: "Utility",
    level: "Intermediate",
    path: "/compilers/regex",
    description:
      "Test and debug regular expressions with instant match highlighting.",
  },
  {
    name: "JSON Formatter",
    type: "Utility",
    level: "All Levels",
    path: "/compilers/json-formatter",  
    description:
      "Format, validate, and beautify JSON data for API and project workflows.",
  },
  {
    name: "Markdown Notes Pad",
    type: "Productivity",
    level: "All Levels",
    path: "/compilers/markdown-notes",
    description:
      "Create structured class notes with headings, code blocks, and checklists.",
  },
  {
    name: "DSA Visualizer",
    type: "Learning",
    level: "Beginner to Advanced",
    path: "/compilers/dsa-visualizer",  
    description:
      "Visualize sorting, searching, and data structures to understand concepts faster.",
  },
];

const advancedLearningTools = [
  {
    name: "API Tester",
    type: "Advanced",
    level: "Intermediate to Advanced",
    path: "/compilers/api-tester",
    description:
      "Send GET, POST, PUT, and DELETE requests with headers and payload support.",
  },
  {
    name: "Linux Terminal Simulator",
    type: "Advanced",
    level: "Beginner to Intermediate",
    path: "/compilers/linux-terminal",
    description:
      "Practice shell commands, file operations, and basic scripting in a safe sandbox.",
  },
  {
    name: "ER Diagram Builder",
    type: "Database",
    level: "Beginner to Intermediate",
    path: "/compilers/er-diagram",  
    description:
      "Design database relationships visually for academic projects and assignments.",
  },
  {
    name: "MCQ Practice Engine",
    type: "Assessment",
    level: "All Levels",
    path: "/compilers/mcq-practice",
    description:
      "Attempt topic-wise quizzes with instant feedback and explanations.",
  },
  {
    name: "Quiz + Progress Tracker",
    type: "Assessment",
    level: "All Levels",
    path: "/compilers/quiz-progress",
    description:
      "Track your score history, weak areas, and weekly learning progress.",
  },
];

const accentStyles = [
  {
    badge: "bg-blue-100 text-blue-700",
    button: "bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-300",
    border: "border-t-blue-500",
  },
  {
    badge: "bg-green-100 text-green-700",
    button: "bg-green-600 hover:bg-green-700 focus-visible:ring-green-300",
    border: "border-t-green-500",
  },
  {
    badge: "bg-purple-100 text-purple-700",
    button: "bg-purple-600 hover:bg-purple-700 focus-visible:ring-purple-300",
    border: "border-t-purple-500",
  },
  {
    badge: "bg-red-100 text-red-700",
    button: "bg-red-600 hover:bg-red-700 focus-visible:ring-red-300",
    border: "border-t-red-500",
  },
];

const renderToolGrid = (tools, onOpenTool) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {tools.map((tool, index) => {
        const accent = accentStyles[index % accentStyles.length];

        return (
        <article
          key={tool.name}
          className={`rounded-xl border border-gray-200 border-t-4 ${accent.border} bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900">{tool.name}</h2>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${accent.badge}`}>
              {tool.type}
            </span>
          </div>

          <p className="mb-4 text-sm leading-6 text-gray-600">{tool.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {tool.level}
            </span>
            <button
                onClick={() => onOpenTool(tool.path)}
              type="button"
              className={`rounded-md px-3 py-2 text-xs font-semibold text-white transition focus-visible:outline-hidden focus-visible:ring-2 ${accent.button}`}
            >
              Open Tool
            </button>
          </div>
        </article>
      )})}
    </div>
  );
};

const CompilersHome = () => {
  const navigate = useNavigate();

  const handleOpenTool = (path) => {
    navigate(path);
  };

  return (
    <section className="min-h-screen w-full bg-linear-to-br from-gray-50 to-white px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-2xl bg-white p-6 shadow-md sm:p-8 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Student Tools Hub</h1>
          <p className="mt-2 max-w-4xl text-sm text-gray-600 sm:text-base">
            Access compilers, editors, and productivity tools to practice programming and
            improve your workflow.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2 className="text-2xl font-bold text-gray-900">Core Coding Tools</h2>
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {coreCodingTools.length} tools
              </span>
            </div>
            {renderToolGrid(coreCodingTools, handleOpenTool)}
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2 className="text-2xl font-bold text-gray-900">Advanced Learning Tools</h2>
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {advancedLearningTools.length} tools
              </span>
            </div>
            {renderToolGrid(advancedLearningTools, handleOpenTool)}
          </section>
        </div>
      </div>
    </section>
  );
};

export default CompilersHome;