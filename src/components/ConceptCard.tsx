import { useState } from "react";
import { Concept } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";

const difficultyColors: Record<string, string> = {
  beginner: "bg-success/10 text-success",
  intermediate: "bg-warning/10 text-warning",
  advanced: "bg-destructive/10 text-destructive",
};

export default function ConceptCard({ concept }: { concept: Concept }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card transition-shadow hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-foreground">{concept.topic}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{concept.domain}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${difficultyColors[concept.difficulty]}`}
        >
          {concept.difficulty}
        </span>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="mt-3 flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        {open ? "Hide" : "Show"} explanation
        {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>

      {open && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground animate-fade-in-up">
          {concept.explanation}
        </p>
      )}
    </div>
  );
}
