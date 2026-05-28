import { useState } from "react"
import Editor from "@monaco-editor/react"

function HtmlCssPlayground() {
  const [html, setHtml] = useState(`<div class="container">
  <h1>Hello, Playground!</h1>
  <p>Edit this HTML and see it render live.</p>
  <button class="btn">Click Me</button>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</div>`)

  const [css, setCss] = useState(`.container {
  font-family: 'Segoe UI', sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #2196F3;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.btn {
  background: #4CAF50;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn:hover {
  background: #45a049;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 8px;
  margin: 4px 0;
  background: #f5f5f5;
  border-radius: 4px;
}`)

  const previewDoc = `
    <!DOCTYPE html>
    <html>
      <head><style>${css}</style></head>
      <body>${html}</body>
    </html>
  `

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* Editors Row */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* HTML Editor */}
        <div style={{ flex: 1, borderRight: "2px solid #333", display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{
            padding: "8px 16px",
            backgroundColor: "#e44d26",
            color: "white",
            fontWeight: "bold",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            HTML
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <Editor
              height="100%"
              defaultLanguage="html"
              value={html}
              onChange={(value) => setHtml(value ?? "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
                automaticLayout: true,
                bracketPairColorization: { enabled: true },
                tabSize: 2,
              }}
            />
          </div>
        </div>

        {/* CSS Editor */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{
            padding: "8px 16px",
            backgroundColor: "#264de4",
            color: "white",
            fontWeight: "bold",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            CSS
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <Editor
              height="100%"
              defaultLanguage="css"
              value={css}
              onChange={(value) => setCss(value ?? "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
                automaticLayout: true,
                bracketPairColorization: { enabled: true },
                tabSize: 2,
              }}
            />
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div style={{ flex: 1, borderTop: "2px solid #333", display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div style={{
          padding: "8px 16px",
          backgroundColor: "#333",
          color: "#4CAF50",
          fontWeight: "bold",
          fontSize: "14px",
          display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
          Live Preview
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <iframe
            title="preview"
            srcDoc={previewDoc}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              backgroundColor: "white",
            }}
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  )
}

export default HtmlCssPlayground