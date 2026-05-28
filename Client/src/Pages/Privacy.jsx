import { useEffect } from "react";
import { FaLock, FaDatabase, FaCookieBite, FaUserShield } from "react-icons/fa";

const privacyItems = [
  {
    icon: <FaDatabase className="text-cyan-300" />,
    title: "Data We Store",
    text: "Account profile details, role information, authentication tokens (secure cookies), and educational interaction metadata needed for core platform functionality.",
  },
  {
    icon: <FaLock className="text-cyan-300" />,
    title: "How We Protect Data",
    text: "We use role-based authorization, secure server-side validation, and controlled API access patterns to protect user and platform data.",
  },
  {
    icon: <FaCookieBite className="text-cyan-300" />,
    title: "Cookies and Sessions",
    text: "Authentication is managed through secure cookies for login continuity and protected route access across student, admin, and superadmin flows.",
  },
  {
    icon: <FaUserShield className="text-cyan-300" />,
    title: "Your Controls",
    text: "You can request profile updates, report issues, and contact support if you suspect unauthorized account activity or privacy concerns.",
  },
];

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_15%,#22d3ee22,transparent_30%),radial-gradient(circle_at_85%_10%,#38bdf822,transparent_35%),linear-gradient(140deg,#0b1220,#111827_45%,#020617)] text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            Privacy at Hellomates focuses on secure identity management, controlled access by role, and responsible use of educational platform data.
          </p>
          <p className="mt-3 text-sm text-slate-400">Last updated: April 8, 2026</p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {privacyItems.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-cyan-400/20 bg-slate-900/50 p-6 shadow-lg shadow-black/20"
            >
              <div className="mb-3 text-2xl">{item.icon}</div>
              <h2 className="text-xl font-semibold text-cyan-100">{item.title}</h2>
              <p className="mt-3 leading-relaxed text-slate-300">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-6">
          <h3 className="text-lg font-semibold text-cyan-100">Need Data Help?</h3>
          <p className="mt-2 text-slate-200">
            For privacy-related requests, use the Contact page or the Support page so the team can verify and respond with the right account context.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
