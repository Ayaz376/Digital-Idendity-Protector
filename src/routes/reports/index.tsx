import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useProtection } from "@/lib/protection-store";

export const Route = createFileRoute("/reports/")({ component: ReportsPage });

function ReportsPage() {
  const { client } = useProtection();

  return (
    <div className="space-y-6">
      <header className="max-w-2xl">
        <p className="cs-eyebrow">Reports</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
          A written record of the month
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Live alerts still land as cases. These pages are the quiet summary you can keep or
          forward — what was watched, what we did, and what is still open.
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {client.reports.map((report) => (
          <li key={report.id}>
            <Link
              to="/reports/$reportId"
              params={{ reportId: report.id }}
              className="cs-panel flex h-full flex-col rounded-xl p-5 transition-[border-color] hover:border-line-strong"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-muted">Monthly summary</p>
              <h2 className="mt-2 text-xl font-medium tracking-tight">{report.period}</h2>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
                <Metric n={report.reviewed} label="Reviewed" />
                <Metric n={report.acted} label="Acted on" />
                <Metric n={report.resolved} label="Resolved" />
              </dl>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{report.note}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-brand">
                Open summary
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Metric({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-md bg-bg-deep/60 px-2 py-3">
      <p className="font-display text-xl font-semibold tabular-nums">{n}</p>
      <p className="text-[11px] text-muted">{label}</p>
    </div>
  );
}
