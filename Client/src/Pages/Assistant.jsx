import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import API from "../Api/axiosInstance";

const starterMessage = {
  role: "assistant",
  content:
    "Hi, I am your College Assistant. Ask me about courses, branches, semesters, notes workflow, or account issues.",
};

const Assistant = () => {
  const [messages, setMessages] = useState([starterMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const historyPayload = useMemo(
    () => messages.filter((m) => m.role === "user" || m.role === "assistant"),
    [messages]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await API.post("/chatbot/message", {
        message: text,
        history: historyPayload,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data?.reply || "No response received." },
      ]);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Assistant is unavailable right now. Please try again in a moment.";

      setMessages((prev) => [...prev, { role: "assistant", content: message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-150px)] bg-slate-50 px-4 py-6 sm:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h1 className="text-xl font-semibold text-slate-900">AI Student Assistant</h1>
          <p className="mt-1 text-sm text-slate-600">
            Ask academic, notes, and platform usage questions.
          </p>
        </div>

        <div className="h-[60vh] overflow-y-auto px-5 py-4">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%] ${
                    msg.role === "user"
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-slate-100 text-slate-800"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none prose-headings:mb-2 prose-headings:mt-3 prose-p:my-2 prose-li:my-1 prose-pre:my-3 prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:p-3 prose-pre:text-slate-100 prose-code:rounded prose-code:bg-slate-200 prose-code:px-1 prose-code:py-0.5 prose-code:text-slate-900 prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({ inline, children, ...props }) {
                            if (inline) {
                              return (
                                <code {...props}>{children}</code>
                              );
                            }

                            return (
                              <pre>
                                <code {...props}>{children}</code>
                              </pre>
                            );
                          },
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-600">
                  Assistant is typing...
                </div>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="border-t border-slate-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-0 focus:border-slate-500"
              maxLength={2000}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Assistant;