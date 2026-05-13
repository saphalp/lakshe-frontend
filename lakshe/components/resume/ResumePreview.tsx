"use client";

import React from "react";
import type { ResumeData } from "./types";
import { formatResumeDate } from "./types";

// A4 at 96 dpi
const A4_W = 794;
const A4_H = 1123;
// Mirror the LaTeX 0.5 in side margins + 0.5 in top/bottom reduction
const PAD_X = 52;
const PAD_Y = 36;

// Split a description into individual bullet strings (newline-delimited)
function toBullets(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

// ── Section heading — mimics \scshape + \titlerule ──────────────────────────
function SectionHead({ title }: { title: string }) {
  return (
    <div style={{ marginTop: 14, marginBottom: 5 }}>
      <p
        style={{
          fontSize: 14.5,
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "#111",
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {title}
      </p>
      {/* \titlerule */}
      <div style={{ height: 1, background: "#111", marginTop: 2 }} />
    </div>
  );
}

// ── Two-row entry header — mimics \resumeSubheading tabular ─────────────────
// Row 1: bold left  |  plain right
// Row 2: italic left  |  italic right  (optional)
function EntryHead({
  r1Left,
  r1Right,
  r2Left,
  r2Right,
}: {
  r1Left: string;
  r1Right: string;
  r2Left?: string;
  r2Right?: string;
}) {
  return (
    <div style={{ marginBottom: 2 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{r1Left}</span>
        <span style={{ fontSize: 13, color: "#333", flexShrink: 0 }}>{r1Right}</span>
      </div>
      {(r2Left || r2Right) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontStyle: "italic", fontSize: 13, color: "#444" }}>{r2Left ?? ""}</span>
          <span style={{ fontStyle: "italic", fontSize: 13, color: "#444", flexShrink: 0 }}>{r2Right ?? ""}</span>
        </div>
      )}
    </div>
  );
}

// ── \resumeItemListStart … \resumeItemListEnd ────────────────────────────────
function BulletList({ description }: { description: string }) {
  const bullets = toBullets(description);
  if (!bullets.length) return null;
  return (
    <ul
      style={{
        margin: "3px 0 6px 0",
        paddingLeft: 18,
        listStyleType: "disc",
      }}
    >
      {bullets.map((b, i) => (
        <li
          key={i}
          style={{ fontSize: 13, color: "#222", lineHeight: 1.45, marginBottom: 1 }}
        >
          {b}
        </li>
      ))}
    </ul>
  );
}

// ── Contact pipe separator ───────────────────────────────────────────────────
function Pipe() {
  return <span style={{ margin: "0 5px", color: "#555" }}>|</span>;
}

// ────────────────────────────────────────────────────────────────────────────

export const ResumePreview = React.forwardRef<HTMLDivElement, { data: ResumeData }>(
  function ResumePreview({ data }, ref) {
    const contactParts: { text: string; underline: boolean }[] = [
      data.phone    ? { text: data.phone,    underline: false } : null,
      data.email    ? { text: data.email,    underline: true  } : null,
      data.linkedin ? { text: data.linkedin, underline: true  } : null,
      data.github   ? { text: data.github,   underline: true  } : null,
      data.location ? { text: data.location, underline: false } : null,
    ].filter((x): x is { text: string; underline: boolean } => x !== null);

    return (
      <div
        ref={ref}
        style={{
          width: A4_W,
          minHeight: A4_H,
          background: "#fff",
          color: "#111",
          fontFamily: 'Georgia, "Times New Roman", Times, serif',
          boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
          // Page-break guide line every A4 page
          backgroundImage: [
            `linear-gradient(`,
            `  transparent calc(${A4_H}px - 2px),`,
            `  #cbd5e1 ${A4_H}px,`,
            `  #cbd5e1 calc(${A4_H}px + 1px),`,
            `  transparent calc(${A4_H}px + 3px)`,
            `)`,
          ].join(""),
          backgroundSize: `100% ${A4_H}px`,
          backgroundRepeat: "repeat-y",
        }}
      >
        <div style={{ padding: `${PAD_Y}px ${PAD_X}px` }}>

          {/* ── HEADING ── */}
          <div style={{ textAlign: "center", marginBottom: 6 }}>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                margin: 0,
                color: "#111",
              }}
            >
              {data.name || "Your Name"}
            </h1>
            {contactParts.length > 0 && (
              <p style={{ fontSize: 12.5, color: "#333", marginTop: 4, lineHeight: 1.5 }}>
                {contactParts.map((c, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <Pipe />}
                    <span style={c.underline ? { textDecoration: "underline" } : {}}>
                      {c.text}
                    </span>
                  </React.Fragment>
                ))}
              </p>
            )}
          </div>

          {/* ── EDUCATION ── */}
          {data.education.length > 0 && (
            <>
              <SectionHead title="Education" />
              {data.education.map((edu, i) => (
                <EntryHead
                  key={i}
                  r1Left={edu.institution}
                  r1Right=""
                  r2Left={`${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`}
                  r2Right={`${edu.startYear} – ${edu.endYear}`}
                />
              ))}
            </>
          )}

          {/* ── EXPERIENCE ── */}
          {data.experiences.length > 0 && (
            <>
              <SectionHead title="Experience" />
              {data.experiences.map((exp, i) => (
                <div key={i}>
                  <EntryHead
                    r1Left={exp.company}
                    r1Right={`${formatResumeDate(exp.startDate)} – ${formatResumeDate(exp.endDate)}`}
                    r2Left={exp.role}
                  />
                  {exp.description && <BulletList description={exp.description} />}
                </div>
              ))}
            </>
          )}

          {/* ── TECHNICAL SKILLS ── */}
          {data.skills.length > 0 && (
            <>
              <SectionHead title="Technical Skills" />
              <ul style={{ margin: "2px 0 0 0", padding: 0, listStyle: "none" }}>
                <li style={{ fontSize: 13, color: "#222", lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700 }}>Skills: </span>
                  {data.skills.join(", ")}
                </li>
              </ul>
            </>
          )}

        </div>
      </div>
    );
  }
);

ResumePreview.displayName = "ResumePreview";
