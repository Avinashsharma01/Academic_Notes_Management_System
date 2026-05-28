/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

const DEFAULT_SQL = `
-- Avinash Sharma's SQL Sandbox
SELECT first_name, age
FROM customers;`;

const TABLE_SCHEMA = [
    {
        name: "Customers",
        columns: [
            "customer_id [int]",
            "first_name [varchar(100)]",
            "last_name [varchar(100)]",
            "age [int]",
            "country [varchar(100)]",
        ],
    },
    {
        name: "Orders",
        columns: ["order_id [integer]", "item [varchar(100)]", "amount [integer]", "customer_id [int]"],
    },
    {
        name: "Shippings",
        columns: ["shipping_id [integer]", "status [integer]", "customer [integer]"],
    },
];

const previewTitleMap = {
    customers: "Customers",
    orders: "Orders",
    shippings: "Shippings",
};

function DataTable({ rows }) {
    if (!rows || rows.length === 0) {
        return <p className="text-xs text-slate-400">No rows found.</p>;
    }

    const columns = Object.keys(rows[0]);

    return (
        <div className="overflow-auto rounded-md border border-slate-700/80">
            <table className="min-w-full text-left text-sm text-slate-200">
                <thead className="bg-slate-900/80 text-slate-100">
                    <tr>
                        {columns.map((column) => (
                            <th key={column} className="whitespace-nowrap border-b border-slate-700 px-3 py-2 font-semibold">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="odd:bg-slate-900/20 even:bg-slate-900/50">
                            {columns.map((column) => (
                                <td key={`${rowIndex}-${column}`} className="whitespace-nowrap border-b border-slate-800 px-3 py-2">
                                    {row[column] === null ? "NULL" : String(row[column])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function PostgresEditor() {
    const [sql, setSql] = useState(DEFAULT_SQL);
    const [isRunning, setIsRunning] = useState(false);
    const [outputRows, setOutputRows] = useState([]);
    const [error, setError] = useState("");
    const [previewTables, setPreviewTables] = useState({});
    const [showTablesAside, setShowTablesAside] = useState(true);

    const loadPreview = async () => {
        try {
            const response = await fetch("/api/query/sandbox/preview");
            const data = await response.json();
            setPreviewTables(data?.tables || {});
        } catch {
            setPreviewTables({});
        }
    };

    useEffect(() => {
        loadPreview();
    }, []);

    const handleExecute = useCallback(async () => {
        if (!sql.trim()) {
            setError("Query cannot be empty");
            return;
        }

        setIsRunning(true);
        setError("");
        setOutputRows([]);

        try {
            const response = await fetch("/api/query/sandbox", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: sql }),
            });

            const responseText = await response.text();
            let data = {};

            if (responseText) {
                try {
                    data = JSON.parse(responseText);
                } catch {
                    data = { message: responseText };
                }
            }

            if (!response.ok) {
                throw new Error(data?.message || "Failed to execute SQL query");
            }

            setOutputRows(Array.isArray(data?.rows) ? data.rows : []);
            await loadPreview();
        } catch (runError) {
            setError(runError instanceof Error ? runError.message : "Unknown error while executing query");
        } finally {
            setIsRunning(false);
        }
    }, [sql]);

    useEffect(() => {
        const onKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                event.preventDefault();
                handleExecute();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [handleExecute]);

    return (
        <section className="min-h-screen bg-[#12141c] text-slate-100">
            {/* <header className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
                <h1>Avinash Sharma</h1>
            </header> */}

            <div className="grid min-h-[calc(100vh-73px)] grid-cols-12">
                <aside className="col-span-2 border-r border-slate-700 px-4 py-5">
                    {TABLE_SCHEMA.map((table) => (
                        <div key={table.name} className="mb-6">
                            <h2 className="mb-2 text-base font-semibold text-slate-100">{table.name} [-]</h2>
                            <ul className="space-y-1 border-l border-slate-500 pl-4 text-sm text-cyan-300">
                                {table.columns.map((column) => (
                                    <li key={column}>{column}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </aside>

                <main className={`${showTablesAside ? "col-span-6 border-r border-slate-700" : "col-span-10"}`}>
                    <div className="border-b border-slate-700 px-4 py-3">
                        <div className="mb-2 flex items-center gap-3">
                            <span className="font-semibold">Input</span>
                            <button
                                onClick={handleExecute}
                                disabled={isRunning}
                                type="button"
                                className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-600"
                            >
                                {isRunning ? "Running..." : "Run SQL"}
                            </button>
                            <button
                                onClick={() => setShowTablesAside((prev) => !prev)}
                                type="button"
                                className="rounded border border-slate-600 px-4 py-2 text-sm font-semibold transition hover:bg-slate-800"
                            >
                                {showTablesAside ? "Hide Tables" : "Show Tables"}
                            </button>
                        </div>
                        <div className="h-[360px] overflow-hidden rounded border border-slate-700">
                            <Editor
                                height="100%"
                                defaultLanguage="sql"
                                value={sql}
                                onChange={(value) => setSql(value ?? "")}
                                theme="vs-dark"
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 15,
                                    wordWrap: "on",
                                    automaticLayout: true,
                                    quickSuggestions: true,
                                    suggestOnTriggerCharacters: true,
                                }}
                            />
                        </div>
                    </div>

                    <div className="px-4 py-3">
                        <h3 className="mb-2 text-base font-semibold">Output</h3>
                        {error ? (
                            <div className="rounded border border-red-500/30 bg-red-950/40 px-3 py-2 text-sm text-red-300">{error}</div>
                        ) : (
                            <DataTable rows={outputRows} />
                        )}
                    </div>
                </main>

                {showTablesAside && <aside className="col-span-4 px-4 py-4">
                    <h2 className="mb-3 text-xl font-semibold">Available Tables</h2>
                    <div className="space-y-6">
                        {Object.entries(previewTables).map(([key, rows]) => (
                            <div key={key}>
                                <h3 className="mb-2 text-lg font-semibold text-slate-100">{previewTitleMap[key] || key}</h3>
                                <DataTable rows={rows} />
                            </div>
                        ))}
                        {Object.keys(previewTables).length === 0 && (
                            <p className="text-sm text-slate-400">Loading sandbox sample data...</p>
                        )}
                    </div>
                </aside>}
            </div>
        </section>
    );
}

export default PostgresEditor;
