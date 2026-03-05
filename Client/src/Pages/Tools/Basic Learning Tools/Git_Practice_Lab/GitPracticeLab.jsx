import { useState, useRef, useEffect } from "react"

function GitPracticeLab() {
  const [history, setHistory] = useState([
    { type: "system", text: "Welcome to Git Practice Lab! 🧪" },
    { type: "system", text: "Type 'help' to see available commands." },
    { type: "system", text: "Type 'lesson' to start the guided tutorial." },
    { type: "system", text: "" },
  ])
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [cwd, setCwd] = useState("/project")
  const [gitState, setGitState] = useState({
    initialized: false,
    branch: "main",
    branches: ["main"],
    workingDir: {},        // filename → content
    stagingArea: [],       // filenames staged
    commits: [],           // { message, files, branch, timestamp }
    stash: [],
    remotes: [],
  })
  const terminalRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const addOutput = (text, type = "output") => {
    setHistory((prev) => [...prev, { type, text }])
  }

  const prompt = `${"student"}@git-lab:${cwd}${gitState.initialized ? ` (${gitState.branch})` : ""}$`

  const addCommandOutput = (commandText) => {
    addOutput(`${prompt} ${commandText}`, "command")
  }

  const resolvePath = (targetPath) => {
    if (!targetPath || targetPath === "~") return "/project"
    if (targetPath === ".") return cwd

    if (targetPath === "..") {
      if (cwd === "/project") return "/project"
      const parts = cwd.split("/").filter(Boolean)
      parts.pop()
      return `/${parts.join("/")}`
    }

    if (targetPath.startsWith("/")) return targetPath
    return `${cwd}/${targetPath}`.replace(/\/+/g, "/")
  }

  const toRepoRelativeFile = (name) => {
    if (!name) return ""
    if (name.startsWith("/project/")) return name.replace(/^\/project\//, "")
    if (name.startsWith("/")) return name.slice(1)

    const current = cwd.replace(/^\/project\/?/, "")
    if (!current) return name
    return `${current}/${name}`
  }

  const getFilesInCurrentDir = () => {
    const prefix = cwd === "/project" ? "" : `${cwd.replace(/^\/project\/?/, "")}/`
    return Object.keys(gitState.workingDir)
      .filter((f) => f.startsWith(prefix))
      .map((f) => f.slice(prefix.length))
      .filter((f) => f && !f.includes("/"))
  }

  const processCommand = (cmd) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    addCommandOutput(trimmed)

    const parts = trimmed.split(/\s+/)
    const base = parts[0]

    if (base === "help") {
      showHelp()
    } else if (base === "lesson") {
      showLesson()
    } else if (base === "clear") {
      setHistory([])
    } else if (base === "git") {
      handleGitCommand(parts.slice(1))
    } else if (base === "pwd") {
      addOutput(cwd)
    } else if (base === "cd") {
      const nextPath = resolvePath(parts[1])
      setCwd(nextPath)
    } else if (base === "whoami") {
      addOutput("student")
    } else if (base === "date") {
      addOutput(new Date().toString())
    } else if (base === "touch") {
      const fileName = toRepoRelativeFile(parts[1])
      if (!fileName) {
        addOutput("touch: missing file operand")
      } else {
        setGitState((prev) => ({
          ...prev,
          workingDir: { ...prev.workingDir, [fileName]: "" },
        }))
      }
    } else if (base === "ls") {
      const files = getFilesInCurrentDir()
      addOutput(files.length > 0 ? files.join("  ") : "")
    } else if (base === "cat") {
      const fileName = toRepoRelativeFile(parts[1])
      if (!fileName) {
        addOutput("cat: missing file operand")
      } else if (gitState.workingDir[fileName] === undefined) {
        addOutput(`cat: ${parts[1]}: No such file or directory`)
      } else {
        addOutput(gitState.workingDir[fileName] || "")
      }
    } else if (base === "echo" && trimmed.includes(">")) {
      const match = trimmed.match(/echo\s+"?(.+?)"?\s*>\s*(\S+)/)
      if (!match) {
        addOutput("bash: invalid echo redirection syntax")
      } else {
        const [, content, fileName] = match
        const resolved = toRepoRelativeFile(fileName)
        setGitState((prev) => ({
          ...prev,
          workingDir: { ...prev.workingDir, [resolved]: content },
        }))
      }
    } else {
      addOutput(`bash: ${base}: command not found`)
    }
  }

  const showHelp = () => {
    addOutput(`
Available Commands:
  git init              Initialize a new repository
  git status            Show working tree status
  git add <file>        Stage a file for commit
  git add .             Stage all files
  git commit -m "msg"   Commit staged changes
  git log               Show commit history
  git branch            List branches
  git branch <name>     Create a new branch
  git checkout <branch> Switch to a branch
  git merge <branch>    Merge a branch into current
  git stash             Stash working changes
  git stash pop         Restore stashed changes
  git diff              Show unstaged changes
  pwd                   Print current directory
  cd <path>             Change current directory
  cat <file>            Print file content
  whoami                Show current user
  date                  Show current system date/time
  touch <file>          Create a new file
  echo "text" > file    Write to a file
  ls                    List files
  clear                 Clear terminal
  help                  Show this help
  lesson                Start guided tutorial
`)
  }

  const showLesson = () => {
    addOutput(`
📚 Git Practice Lab — Guided Tutorial
════════════════════════════════════════

Step 1: Initialize a repo
  → Type: git init

Step 2: Create a file
  → Type: touch hello.txt

Step 3: Check what changed
  → Type: git status

Step 4: Stage the file
  → Type: git add hello.txt

Step 5: Commit the change
  → Type: git commit -m "Add hello.txt"

Step 6: Create a branch
  → Type: git branch feature

Step 7: Switch to it
  → Type: git checkout feature

Step 8: Make and commit a change
  → Type: touch feature.txt
  → Type: git add .
  → Type: git commit -m "Add feature"

Step 9: Switch back and merge
  → Type: git checkout main
  → Type: git merge feature

Step 10: See the full history
  → Type: git log

Try each step! Type 'help' for all commands.
`, "system")
  }

  const handleGitCommand = (args) => {
    const subcommand = args[0]

    switch (subcommand) {
      case "init":
        if (gitState.initialized) {
          addOutput("Reinitialized existing Git repository.")
        } else {
          setGitState((prev) => ({ ...prev, initialized: true }))
          addOutput("Initialized empty Git repository in /project/.git/")
        }
        break

      case "status":
        handleGitStatus()
        break

      case "add":
        handleGitAdd(args[1])
        break

      case "commit":
        handleGitCommit(args)
        break

      case "log":
        handleGitLog()
        break

      case "branch":
        handleGitBranch(args[1])
        break

      case "checkout":
        handleGitCheckout(args[1])
        break

      case "merge":
        handleGitMerge(args[1])
        break

      case "stash":
        handleGitStash(args[1])
        break

      case "diff":
        handleGitDiff()
        break

      default:
        addOutput(`git: '${subcommand}' is not a git command. See 'help'.`)
    }
  }

  const handleGitStatus = () => {
    if (!gitState.initialized) {
      addOutput("fatal: not a git repository (or any of the parent directories): .git")
      return
    }

    const files = Object.keys(gitState.workingDir)
    const staged = gitState.stagingArea
    const unstaged = files.filter((f) => !staged.includes(f))

    let output = `On branch ${gitState.branch}\n`

    if (gitState.commits.length === 0 && staged.length === 0 && files.length === 0) {
      output += "\nNo commits yet\n\nnothing to commit (create/copy files and use \"git add\" to track them)"
    } else {
      if (staged.length > 0) {
        output += "\nChanges to be committed:\n"
        staged.forEach((f) => { output += `  (staged)    new file:   ${f}\n` })
      }
      if (unstaged.length > 0) {
        output += "\nUntracked files:\n"
        unstaged.forEach((f) => { output += `  (untracked) ${f}\n` })
      }
      if (staged.length === 0 && unstaged.length === 0) {
        output += "\nnothing to commit, working tree clean"
      }
    }

    addOutput(output)
  }

  const handleGitAdd = (file) => {
    if (!gitState.initialized) {
      addOutput("fatal: not a git repository")
      return
    }
    if (!file) {
      addOutput("Nothing specified, nothing added.")
      return
    }

    if (file === ".") {
      const allFiles = Object.keys(gitState.workingDir)
      setGitState((prev) => ({ ...prev, stagingArea: [...allFiles] }))
      addOutput(`Added all files to staging area.`)
    } else if (gitState.workingDir[file] !== undefined) {
      setGitState((prev) => ({
        ...prev,
        stagingArea: [...new Set([...prev.stagingArea, file])],
      }))
      addOutput(`Added '${file}' to staging area.`)
    } else {
      addOutput(`fatal: pathspec '${file}' did not match any files`)
    }
  }

  const handleGitCommit = (args) => {
    if (!gitState.initialized) {
      addOutput("fatal: not a git repository")
      return
    }
    if (gitState.stagingArea.length === 0) {
      addOutput("nothing to commit (use \"git add\" to stage files)")
      return
    }

    const msgIndex = args.indexOf("-m")
    const message = msgIndex !== -1 ? args.slice(msgIndex + 1).join(" ").replace(/"/g, "") : "No message"

    const commit = {
      hash: Math.random().toString(16).slice(2, 9),
      message,
      files: [...gitState.stagingArea],
      branch: gitState.branch,
      timestamp: new Date().toLocaleString(),
    }

    setGitState((prev) => ({
      ...prev,
      commits: [...prev.commits, commit],
      stagingArea: [],
    }))

    addOutput(`[${gitState.branch} ${commit.hash}] ${message}\n ${commit.files.length} file(s) changed`)
  }

  const handleGitLog = () => {
    if (gitState.commits.length === 0) {
      addOutput("fatal: your current branch does not have any commits yet")
      return
    }

    let output = ""
    ;[...gitState.commits].reverse().forEach((c) => {
      output += `commit ${c.hash} (${c.branch})\n`
      output += `Date:   ${c.timestamp}\n`
      output += `\n    ${c.message}\n\n`
    })

    addOutput(output)
  }

  const handleGitBranch = (name) => {
    if (!name) {
      let output = ""
      gitState.branches.forEach((b) => {
        output += b === gitState.branch ? `* ${b}\n` : `  ${b}\n`
      })
      addOutput(output)
      return
    }

    if (gitState.branches.includes(name)) {
      addOutput(`fatal: A branch named '${name}' already exists.`)
    } else {
      setGitState((prev) => ({
        ...prev,
        branches: [...prev.branches, name],
      }))
      addOutput(`Created branch '${name}'`)
    }
  }

  const handleGitCheckout = (branch) => {
    if (!branch) {
      addOutput("error: please specify a branch name")
      return
    }
    if (!gitState.branches.includes(branch)) {
      addOutput(`error: pathspec '${branch}' did not match any branch known to git`)
      return
    }
    setGitState((prev) => ({ ...prev, branch }))
    addOutput(`Switched to branch '${branch}'`)
  }

  const handleGitMerge = (branch) => {
    if (!branch) {
      addOutput("error: please specify a branch to merge")
      return
    }
    if (!gitState.branches.includes(branch)) {
      addOutput(`merge: ${branch} - not something we can merge`)
      return
    }
    if (branch === gitState.branch) {
      addOutput("Already up to date.")
      return
    }

    const branchCommits = gitState.commits.filter((c) => c.branch === branch)
    if (branchCommits.length === 0) {
      addOutput("Already up to date.")
      return
    }

    const mergeCommit = {
      hash: Math.random().toString(16).slice(2, 9),
      message: `Merge branch '${branch}' into ${gitState.branch}`,
      files: [],
      branch: gitState.branch,
      timestamp: new Date().toLocaleString(),
    }

    setGitState((prev) => ({
      ...prev,
      commits: [...prev.commits, mergeCommit],
    }))

    addOutput(`Merge made by the 'recursive' strategy.\nBranch '${branch}' merged into '${gitState.branch}'.`)
  }

  const handleGitStash = (action) => {
    if (action === "pop") {
      if (gitState.stash.length === 0) {
        addOutput("No stash entries found.")
        return
      }
      const restored = gitState.stash[gitState.stash.length - 1]
      setGitState((prev) => ({
        ...prev,
        workingDir: { ...prev.workingDir, ...restored },
        stash: prev.stash.slice(0, -1),
      }))
      addOutput("Dropped refs/stash@{0} — restored working directory")
    } else {
      const unsaved = Object.keys(gitState.workingDir).filter(
        (f) => !gitState.stagingArea.includes(f)
      )
      if (unsaved.length === 0) {
        addOutput("No local changes to save")
        return
      }
      setGitState((prev) => ({
        ...prev,
        stash: [...prev.stash, { ...prev.workingDir }],
      }))
      addOutput("Saved working directory and index state WIP on " + gitState.branch)
    }
  }

  const handleGitDiff = () => {
    const unstaged = Object.keys(gitState.workingDir).filter(
      (f) => !gitState.stagingArea.includes(f)
    )
    if (unstaged.length === 0) {
      addOutput("No changes detected.")
    } else {
      let output = ""
      unstaged.forEach((f) => {
        output += `diff --git a/${f} b/${f}\n`
        output += `--- /dev/null\n+++ b/${f}\n`
        output += `+${gitState.workingDir[f] || "(empty file)"}\n\n`
      })
      addOutput(output)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const cmd = input.trim()
    if (!cmd) return

    processCommand(cmd)
    setCommandHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)
    setInput("")
  }

  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length === 0) return

      const nextIndex = historyIndex === -1
        ? commandHistory.length - 1
        : Math.max(0, historyIndex - 1)

      setHistoryIndex(nextIndex)
      setInput(commandHistory[nextIndex])
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (commandHistory.length === 0 || historyIndex === -1) return

      const nextIndex = historyIndex + 1
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1)
        setInput("")
      } else {
        setHistoryIndex(nextIndex)
        setInput(commandHistory[nextIndex])
      }
    }
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "90vh",
      background: "radial-gradient(circle at top right, #1f2937 0%, #0f172a 45%, #020617 100%)",
      fontFamily: "'Cascadia Code', 'Fira Code', Consolas, monospace",
      padding: "18px",
      boxSizing: "border-box",
    }}>
      <div style={{
        padding: "8px 14px",
        backgroundColor: "#0b1220",
        border: "1px solid #2b364b",
        borderBottom: "none",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "999px", background: "#ff5f56", display: "inline-block" }} />
          <span style={{ width: "12px", height: "12px", borderRadius: "999px", background: "#ffbd2e", display: "inline-block" }} />
          <span style={{ width: "12px", height: "12px", borderRadius: "999px", background: "#27c93f", display: "inline-block" }} />
        </div>
        <span style={{ color: "#9ca3af", fontSize: "12px" }}>
          git-practice-lab • {gitState.branch} • {gitState.commits.length} commit(s)
        </span>
      </div>

      <div
        ref={terminalRef}
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          padding: "16px",
          color: "#d1fae5",
          fontSize: "14px",
          lineHeight: "1.6",
          backgroundColor: "#030712",
          border: "1px solid #2b364b",
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, i) => (
          <div
            key={i}
            style={{
              color:
                entry.type === "command" ? "#93c5fd"
                : entry.type === "system" ? "#34d399"
                : "#d1fae5",
              whiteSpace: "pre-wrap",
            }}
          >
            {entry.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          border: "1px solid #2b364b",
          borderTop: "none",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
          backgroundColor: "#030712",
        }}
      >
        <span style={{ padding: "12px", color: "#22c55e", fontWeight: "bold" }}>
          {prompt}
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          style={{
            flex: 1,
            padding: "12px",
            backgroundColor: "#030712",
            color: "#d1fae5",
            border: "none",
            outline: "none",
            fontSize: "14px",
            fontFamily: "inherit",
          }}
          placeholder="Type a command (use ArrowUp/ArrowDown for history)..."
          autoFocus
        />
      </form>
    </div>
  )
}

export default GitPracticeLab