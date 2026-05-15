"use client";
import { useState } from "react";

export default function ResumeModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-6 py-3 rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/15"
      >
        View Resume
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-[#0b0b17] p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/15"
            >
              Close
            </button>

            <div className="mb-4 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">Resume preview</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Full Resume</h3>
            </div>

            <div className="h-[65vh] overflow-hidden rounded-3xl border border-white/10 bg-black">
              <iframe
                src="/resume.pdf"
                className="h-full w-full"
                title="Resume Preview"
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/20"
              >
                Open PDF
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
