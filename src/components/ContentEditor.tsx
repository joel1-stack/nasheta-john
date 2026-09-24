"use client"

import { useRef } from "react"

interface ContentEditorProps {
  value: string
  onChange: (value: string) => void
}

const toolbarBtn = "px-2.5 py-1.5 rounded-md text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white transition cursor-pointer border border-transparent hover:border-white/10"

export default function ContentEditor({ value, onChange }: ContentEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  const wrapSelection = (before: string, after: string, placeholder = "") => {
    const ta = ref.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = value.slice(start, end) || placeholder
    const next = value.slice(0, start) + before + selected + after + value.slice(end)
    onChange(next)
    requestAnimationFrame(() => {
      ta.focus()
      const selStart = start + before.length
      ta.setSelectionRange(selStart, selStart + selected.length)
    })
  }

  const insertBlock = (tag: string, placeholder = "Heading text") => {
    const ta = ref.current
    if (!ta) return
    const start = ta.selectionStart
    const lineStart = value.lastIndexOf("\n", start - 1) + 1
    const lineEnd = value.indexOf("\n", start)
    const end = lineEnd === -1 ? value.length : lineEnd
    const currentLine = value.slice(lineStart, end)
    const stripped = currentLine.replace(/<\/?(h[1-6]|p|strong|em|b|i|a)[^>]*>/gi, "").trim()
    const text = stripped || placeholder
    const replacement = `<${tag}>${text}</${tag}>`
    const needsNewline = lineStart > 0 && value[lineStart - 1] !== "\n" ? "" : ""
    const next = value.slice(0, lineStart) + needsNewline + replacement + value.slice(end)
    onChange(next)
    requestAnimationFrame(() => {
      ta.focus()
      const caret = lineStart + replacement.length
      ta.setSelectionRange(caret, caret)
    })
  }

  const insertParagraph = () => {
    const ta = ref.current
    if (!ta) return
    const pos = ta.selectionStart
    const insert = value && !value.endsWith("\n\n") ? "\n\n" : "\n"
    const next = value.slice(0, pos) + insert + value.slice(pos)
    onChange(next)
    requestAnimationFrame(() => {
      ta.focus()
      const caret = pos + insert.length
      ta.setSelectionRange(caret, caret)
    })
  }

  const insertLink = () => {
    const url = prompt("Enter link URL:")
    if (!url) return
    wrapSelection(`<a href="${url}" target="_blank" rel="noopener">`, "</a>", "link text")
  }

  const insertList = (ordered: boolean) => {
    const ta = ref.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = value.slice(start, end) || "List item"
    const lines = selected.split("\n").filter(Boolean)
    const html = ordered
      ? `<ol>${lines.map((l) => `<li>${l.replace(/<[^>]+>/g, "")}</li>`).join("")}</ol>`
      : `<ul>${lines.map((l) => `<li>${l.replace(/<[^>]+>/g, "")}</li>`).join("")}</ul>`
    const next = value.slice(0, start) + html + value.slice(end)
    onChange(next)
    requestAnimationFrame(() => {
      ta.focus()
      const caret = start + html.length
      ta.setSelectionRange(caret, caret)
    })
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 px-2 py-2 border-b border-white/10 bg-[#0F0A1A]/60">
        <button type="button" className={toolbarBtn} onClick={() => insertBlock("h1", "Main heading")} title="Heading 1">
          H1
        </button>
        <button type="button" className={toolbarBtn} onClick={() => insertBlock("h2", "Section heading")} title="Heading 2">
          H2
        </button>
        <button type="button" className={toolbarBtn} onClick={() => insertBlock("h3", "Sub heading")} title="Heading 3">
          H3
        </button>
        <span className="w-px h-5 bg-white/10 mx-1" />
        <button type="button" className={toolbarBtn} onClick={() => wrapSelection("<strong>", "</strong>", "bold text")} title="Bold">
          <strong>B</strong>
        </button>
        <button type="button" className={toolbarBtn} onClick={() => wrapSelection("<em>", "</em>", "italic text")} title="Italic">
          <em>I</em>
        </button>
        <button type="button" className={toolbarBtn} onClick={() => wrapSelection("<u>", "</u>", "underlined")} title="Underline">
          <u>U</u>
        </button>
        <span className="w-px h-5 bg-white/10 mx-1" />
        <button type="button" className={toolbarBtn} onClick={insertParagraph} title="Paragraph break">
          ¶ Para
        </button>
        <button type="button" className={toolbarBtn} onClick={() => insertList(false)} title="Bullet list">
          • List
        </button>
        <button type="button" className={toolbarBtn} onClick={() => insertList(true)} title="Numbered list">
          1. List
        </button>
        <span className="w-px h-5 bg-white/10 mx-1" />
        <button type="button" className={toolbarBtn} onClick={insertLink} title="Insert link">
          🔗 Link
        </button>
        <button type="button" className={toolbarBtn} onClick={() => wrapSelection("<blockquote>", "</blockquote>", "quote")} title="Quote">
          ❝ Quote
        </button>
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={16}
        placeholder="Write your article here. Use H1 / H2 / H3 buttons for headings, B for bold, etc."
        className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-500 text-sm leading-relaxed focus:outline-none resize-y font-mono"
        required
      />
      <div className="px-3 py-1.5 border-t border-white/10 text-[10px] text-gray-500 bg-[#0F0A1A]/40">
        Select text then click H1/H2/H3, <strong>B</strong>, <em>I</em>, or 🔗 — no HTML needed
      </div>
    </div>
  )
}
