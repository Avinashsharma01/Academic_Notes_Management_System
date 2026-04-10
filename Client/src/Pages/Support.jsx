import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLifeRing, FaArrowRight } from "react-icons/fa";

const helpTopics = [
  {
    title: "Login and Access Issues",
    points: [
      "Verify the correct role login (Student/Admin/SuperAdmin).",
      "Check if your account is verified and active.",
      "Retry after clearing stale browser cookies if session errors persist.",
    ],
  },
  {
    title: "Notes Not Showing",
    points: [
      "Follow the full path: Dashboard -> Courses -> Branches -> Semesters -> Subjects -> Notes.",
      "Confirm session, course, branch, semester, and subject filters.",
      "If still missing, contact admin support with exact filter values.",
    ],
  },
  {
    title: "Admin Upload Problems",
    points: [
      "Ensure your assigned course matches the target note metadata.",
      "Check file type and required note fields before upload.",
      "Retry with smaller file size if upload seems stalled.",
    ],
  },
];

const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_10%,#2563eb33,transparent_32%),radial-gradient(circle_at_85%_10%,#14b8a633,transparent_30%),linear-gradient(135deg,#0f172a,#111827_40%,#020617)] text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-4 py-2 text-emerald-200">
            <FaLifeRing />
            <span className="text-sm font-medium">Support Center</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">How Can We Help?</h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            Get quick guidance for common platform issues and contact the Hellomates team with your exact problem details.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {helpTopics.map((topic) => (
            <section key={topic.title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <h2 className="text-xl font-semibold text-emerald-200">{topic.title}</h2>
              <ul className="mt-4 space-y-2 text-slate-300">
                {topic.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <FaArrowRight className="mt-1 text-xs text-emerald-300" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-6">
            <h3 className="text-xl font-semibold text-emerald-100">Direct Contact</h3>
            <div className="mt-4 space-y-3 text-slate-200">
              <p className="flex items-center gap-3"><FaEnvelope /> Avinashsharma31384@gmail.com</p>
              <p className="flex items-center gap-3"><FaPhone /> +91 6201693634</p>
              <p className="flex items-center gap-3"><FaMapMarkerAlt /> Meerut Uttar Pradesh, India</p>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-6">
            <h3 className="text-xl font-semibold text-cyan-100">Fastest Self-Service Paths</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <NavLink to="/assistant" className="rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white hover:bg-cyan-500">
                Ask Assistant
              </NavLink>
              <NavLink to="/contact" className="rounded-lg bg-slate-700 px-4 py-2 font-medium text-white hover:bg-slate-600">
                Open Contact Page
              </NavLink>
              <NavLink to="/dashboard" className="rounded-lg bg-slate-700 px-4 py-2 font-medium text-white hover:bg-slate-600">
                Go to Dashboard
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
