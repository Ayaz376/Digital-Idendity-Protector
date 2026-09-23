import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { EvidenceCard } from "@/components/evidence-card";
import { StatusChip } from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { CASE_LABEL } from "@/lib/protection";
import { useProtection } from "@/lib/protection-store";

export const Route = createFileRoute("/cases/$caseId")({ component: CaseDetail });

function CaseDetail() {
  const { caseId } = Route.useParams();
  const { caseById, confirmClientAction } = useProtection();
  const item = caseById(caseId);

  if (!item) {
    return (
      <div className="cs-panel rounded-xl p-8">
        <p className="text-sm text-muted">This case is not in the current example client.</p>
        <Link to="/cases" className="mt-4 inline-flex text-sm text-brand hover:underline">
          Back to cases
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        to="/cases"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        All cases
      </Link>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip status={item.status} />
          <span className="text-xs text-muted">
            {CASE_LABEL[item.type]} · {item.id}
          </span>
        </div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">{item.title}</h1>
        <p className="text-sm text-muted">
          Found {item.foundAt}
          {item.foundOn ? ` · ${item.foundOn}` : ""}
        </p>
      </header>

      <section className="cs-panel space-y-3 rounded-xl p-5 sm:p-6">
        <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-muted">What we found</h2>
        <p className="text-sm leading-relaxed text-fg sm:text-base">{item.summary}</p>
      </section>

      <section className="cs-panel space-y-3 rounded-xl p-5 sm:p-6">
        <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-muted">Why it matters</h2>
        <p className="text-sm leading-relaxed text-muted sm:text-base">{item.why}</p>
      </section>

      {item.evidence ? (
        <section className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-muted">Evidence</h2>
          <EvidenceCard evidence={item.evidence} />
        </section>
      ) : null}

      {item.clientAction ? (
        <section className="cs-panel space-y-4 rounded-xl border-warning/30 p-5 sm:p-6">
          <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-warning">
            What you should do
          </h2>
          <p className="text-sm leading-relaxed sm:text-base">{item.clientAction}</p>
          {item.status === "waiting" && !item.clientActionDone ? (
            <Button onClick={() => confirmClientAction(item.id)}>
              <CheckCircle2 />
              I have reset this
            </Button>
          ) : (
            <p className="inline-flex items-center gap-2 text-sm text-success">
              <CheckCircle2 className="size-4" />
              You confirmed this was done.
            </p>
          )}
        </section>
      ) : (
        <section className="cs-panel rounded-xl p-5 sm:p-6">
          <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-muted">
            What you should do
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Nothing from you on this one. Do not message the fake profile. CyberSpide is handling
            the removal request.
          </p>
        </section>
      )}

      <section className="cs-panel rounded-xl p-5 sm:p-6">
        <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-muted">
          What CyberSpide did
        </h2>
        <ol className="mt-5 space-y-4">
          {item.timeline.map((event) => (
            <li key={`${event.at}-${event.title}`} className="grid grid-cols-[12px_1fr] gap-3">
              <span className="mt-1.5 size-2.5 rounded-full bg-brand" />
              <div>
                <p className="text-sm font-medium">{event.title}</p>
                <p className="mt-0.5 text-xs tabular-nums text-muted">{event.at}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{event.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
