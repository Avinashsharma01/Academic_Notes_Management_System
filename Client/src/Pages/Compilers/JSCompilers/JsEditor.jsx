import { useState } from "react";
import Editor from "@monaco-editor/react";

function JsEditor() {
    const [code, setCode] = useState(`
console.log("Hello, JavaScript!");

const name = "Avinash Sharma";
console.log("Welcome, " + name + "!");
`);
    const [output, setOutput] = useState("");

    const handleRun = () => {
        // Step 1: Prepare to capture console output
        const logs = [];
        const originalLog = console.log;
        const originalError = console.error;

        // Step 2: Override console.log to capture output
        console.log = (...args) => {
            logs.push(
                args
                    .map((a) =>
                        typeof a === "object"
                            ? JSON.stringify(a, null, 2)
                            : String(a),
                    )
                    .join(" "),
            );
        };
        console.error = (...args) => {
            logs.push("❌ " + args.map(String).join(" "));
        };

        try {
            // Step 3: Create and run the user's code
            const fn = new Function(code);
            fn();
        } catch (err) {
            // Step 4: Catch any runtime errors
            logs.push(`❌ Error: ${err.message}`);
        } finally {
            // Step 5: Restore original console (important!)
            console.log = originalLog;
            console.error = originalError;
        }

        // Step 6: Display output
        setOutput(
            logs.join("\n") || "No output. Use console.log() to see results.",
        );
    };
    const handleClear = () => {
        setOutput("");
    };

    return (
        <section
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #111827, #0f172a 40%, #3f3f46)",
                padding: "20px",
            }}
        >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <header style={{ marginBottom: "14px", color: "#f8fafc" }}>
                    <h1 style={{ margin: 0, fontSize: "28px" }}>JavaScript Playground</h1>
                    <p style={{ margin: "6px 0 0", color: "#cbd5e1" }}>
                        Run JavaScript instantly in-browser with captured console output.
                    </p>
                </header>

                <div
                    style={{
                        border: "1px solid #334155",
                        borderRadius: "14px",
                        overflow: "hidden",
                        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35)",
                    }}
                >
                    <Editor
                        height="58vh"
                        defaultLanguage="javascript"
                        value={code}
                        onChange={(value) => setCode(value ?? "")}
                        theme="vs-dark"
                        options={{
                            minimap: { enabled: false },
                            fontSize: 16,
                            wordWrap: "on",
                            automaticLayout: true,
                            bracketPairColorization: { enabled: true },
                            quickSuggestions: true,
                        }}
                    />
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "12px" }}>
                    <button
                        onClick={handleRun}
                        style={{
                            padding: "10px 18px",
                            backgroundColor: "#facc15",
                            color: "#111827",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "15px",
                        }}
                    >
                        Run
                    </button>
                    <button
                        onClick={handleClear}
                        style={{
                            padding: "10px 18px",
                            backgroundColor: "#334155",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "15px",
                            fontWeight: 600,
                        }}
                    >
                        Clear Output
                    </button>
                </div>

                <div
                    style={{
                        marginTop: "12px",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        backgroundColor: "#020617",
                        overflow: "hidden",
                    }}
                >
                    <div style={{ padding: "10px 14px", borderBottom: "1px solid #334155", color: "#e2e8f0", fontWeight: 700 }}>
                        Output Console
                    </div>
                    <pre
                        style={{
                            height: "190px",
                            color: "#cbd5e1",
                            padding: "14px",
                            margin: 0,
                            overflow: "auto",
                            fontFamily: "Consolas, monospace",
                            fontSize: "14px",
                        }}
                    >
                        {output || "Output will appear here..."}
                    </pre>
                </div>
            </div>
        </section>
    );
}

export default JsEditor;
