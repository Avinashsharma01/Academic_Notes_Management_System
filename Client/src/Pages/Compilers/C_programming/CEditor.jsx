import { useState } from "react";
import Editor from "@monaco-editor/react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function CEditor() {
    const DefaultCode = `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`;
    const [code, setCode] = useState(DefaultCode);
    const [output, setOutput] = useState("");

    const handleCompile = async () => {
        setOutput("⏳ Compiling...");

        try {
            const res = await fetch(`${API_BASE_URL}/compile/c`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            });

            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`);
            }

            const data = await res.json();
            setOutput(data.output);
        } catch (err) {
            setOutput("❌ Could not connect to server: " + err.message);
        }
    };

    const handleClear = () => {
        setOutput("");
    };

    return (
        <section
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0f172a, #111827 40%, #052e16)",
                padding: "20px",
            }}
        >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <header style={{ marginBottom: "14px", color: "#f8fafc" }}>
                    <h1 style={{ margin: 0, fontSize: "28px" }}>C Compiler</h1>
                    <p style={{ margin: "6px 0 0", color: "#cbd5e1" }}>
                        Write C code, compile instantly, and inspect output below.
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
                        defaultLanguage="c"
                        value={code}
                        onChange={(value) => setCode(value ?? "")}
                        theme="vs-dark"
                        options={{
                            minimap: { enabled: false },
                            fontSize: 16,
                            wordWrap: "on",
                            automaticLayout: true,
                            suggestOnTriggerCharacters: true,
                            bracketPairColorization: { enabled: true },
                            lineNumbers: "on",
                            tabSize: 4,
                        }}
                    />
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "12px" }}>
                    <button
                        onClick={handleCompile}
                        style={{
                            padding: "10px 18px",
                            backgroundColor: "#16a34a",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "15px",
                            fontWeight: 700,
                        }}
                    >
                        Compile & Run
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
                        {output || "Click 'Compile & Run' to see output here..."}
                    </pre>
                </div>
            </div>
        </section>
    );
}

export default CEditor;
