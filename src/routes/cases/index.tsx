import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { StatusChip } from "@/components/status-chip";
import { CASE_LABEL, type CaseStatus } from "@/lib/protection";
import { useProtection } from "@/lib/protection-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cases/")({ component: CasesPage });

const FILTERS: { id: "all" | CaseStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "waiting", label: "Needs you" },
  { id: "progress", label: "In progress" },
  { id: "resolved", label: "Resolved" },
];

function CasesPage() {
  const { client } = useProtection();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const list =
    filter === "all" ? client.cases : client.cases.filter((c) => c.status === filter);

  return (
    <div className="space-y-6">
      <header>
        <p className="cs-eyebrow">Cases</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">What we found</h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          Only reviewed findings. Low-value directory noise stays with CyberSpide unless it turns
          into impersonation or a leak you must act on.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={cn(
              "h-11 rounded-full border px-4 text-sm transition-colors",
              filter === item.id
                ? "border-brand bg-brand/15 text-fg"
                : "border-line text-muted hover:border-line-strong hover:text-fg",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="cs-panel rounded-xl p-8 text-center">
          <p className="text-sm text-muted">Nothing in this view.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {list.map((item) => (
            <li key={item.id}>
              <Link
                to="/cases/$caseId"
                params={{ caseId: item.id }}
                className="cs-panel flex flex-col gap-3 rounded-xl p-4 transition-[border-color] hover:border-line-strong sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-xs text-muted">
                    {CASE_LABEL[item.type]} · {item.id}
                  </p>
                  <p className="mt-1 truncate text-sm font-medium sm:text-base">{item.title}</p>
                  <p className="mt-1 text-xs text-muted">{item.foundAt}</p>
                </div>
                <StatusChip status={item.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
