import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useProtection } from "@/lib/protection-store";

export const Route = createFileRoute("/reports/$reportId")({ component: ReportDetail });

function ReportDetail() {
  const { reportId } = Route.useParams();
  const { client } = useProtection();
  const report = client.reports.find((r) => r.id === reportId);

  if (!report) {
    return (
      <div className="cs-panel rounded-xl p-8">
        <p className="text-sm text-muted">This summary is not in the current example client.</p>
        <Link to="/reports" className="mt-4 inline-flex text-sm text-brand hover:underline">
          Back to reports
        </Link>
      </div>
    );
  }

  const periodCases = client.cases.filter((c) =>
    report.period.startsWith("September")
      ? c.foundAt.includes("Sep 2026")
      : c.foundAt.includes("Aug 2026"),
  );

  return (
    <article className="mx-auto max-w-2xl space-y-6">
      <Link
        to="/reports"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        All reports
      </Link>

      <div className="cs-panel rounded-xl p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-brand">CyberSpide</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
          Identity Protection summary
        </h1>
        <p className="mt-1 text-sm text-muted">
          {client.name} · {report.period}
        </p>

        <p className="mt-6 text-sm leading-relaxed text-muted">{report.note}</p>

        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Cell n={report.reviewed} label="Findings reviewed" />
          <Cell n={report.acted} label="Actions taken" />
          <Cell n={report.resolved} label="Resolved" />
          <Cell n={report.waiting} label="Waiting on you" />
        </dl>

        <h2 className="mt-10 text-sm font-medium uppercase tracking-[0.12em] text-muted">
          Cases in this period
        </h2>
        {periodCases.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No client-facing cases in this month.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line">
            {periodCases.map((c) => (
              <li key={c.id} className="flex items-start justify-between gap-3 py-3 text-sm">
                <span>{c.title}</span>
                <span className="shrink-0 text-muted">{c.id}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10 text-xs leading-relaxed text-muted">
          Prepared by CyberSpide. Monitoring is continuous. This page is a record, not the live
          alert channel. Contact contact@cyberspide.com if a line looks wrong.
        </p>
      </div>
    </article>
  );
}

function Cell({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-lg bg-bg-deep/70 px-3 py-4">
      <p className="font-display text-2xl font-semibold tabular-nums">{n}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}
