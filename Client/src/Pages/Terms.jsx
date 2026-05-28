import { useEffect } from "react";
import { FaFileContract, FaShieldAlt, FaUserCheck } from "react-icons/fa";

const sections = [
  {
    title: "1. Platform Usage",
    text: "Hellomates provides academic content discovery, notes access, and student support features. You agree to use the platform only for lawful academic purposes.",
  },
  {
    title: "2. Account Responsibility",
    text: "You are responsible for maintaining the confidentiality of your login credentials and all activity performed through your account.",
  },
  {
    title: "3. Notes and Content",
    text: "Uploaded notes and resources must respect copyright, institutional policy, and community standards. Content may be moderated or removed when required.",
  },
  {
    title: "4. Role-Based Access",
    text: "Certain capabilities are role-based: students can consume content, admins can manage notes, and superadmins can manage academic structure and governance.",
  },
  {
    title: "5. Service Availability",
    text: "We continuously improve the platform and may update features, limits, and policies to maintain security, quality, and stability.",
  },
  {
    title: "6. Policy Updates",
    text: "These terms may be revised periodically. Continued use of Hellomates after updates indicates acceptance of the revised terms.",
  },
];

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,#1e40af22,transparent_30%),radial-gradient(circle_at_85%_15%,#0ea5e922,transparent_30%),linear-gradient(135deg,#0f172a,#111827_45%,#0b1220)] text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-cyan-200">
            <FaFileContract />
            <span className="text-sm font-medium">Legal Framework</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Terms of Service</h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            These terms define how Hellomates should be used by students, admins, and superadmins to keep the academic ecosystem safe, fair, and reliable.
          </p>
          <p className="mt-3 text-sm text-slate-400">Last updated: April 8, 2026</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20"
            >
              <h2 className="text-xl font-semibold text-cyan-200">{section.title}</h2>
              <p className="mt-3 leading-relaxed text-slate-300">{section.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl border border-cyan-200/20 bg-cyan-400/10 p-6 md:grid-cols-3">
          <div className="flex items-center gap-3 text-cyan-100">
            <FaUserCheck />
            <span>Role-based access controls</span>
          </div>
          <div className="flex items-center gap-3 text-cyan-100">
            <FaShieldAlt />
            <span>Platform safety and moderation</span>
          </div>
          <div className="text-cyan-100">Questions about these terms? Contact support from the footer Support page.</div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
