import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock3, Shield, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/status-chip";
import { CASE_LABEL, caseCounts } from "@/lib/protection";
import { useProtection } from "@/lib/protection-store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { client } = useProtection();
  const counts = caseCounts(client.cases);
  const waiting = client.cases.filter((c) => c.status === "waiting");
  const recent = [...client.cases].sort((a, b) => b.foundAt.localeCompare(a.foundAt)).slice(0, 4);

  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <p className="cs-eyebrow">Digital Identity Protection</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          {counts.waiting > 0
            ? "One item needs you. Everything else is in our hands."
            : "Nothing needs your attention right now."}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          CyberSpide watches for impersonation, leaked logins, exposed cards, and personal details
          used without your say. Findings are reviewed before they appear here.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Protection" value="Active" hint={`Since ${client.started}`} />
        <Stat label="Open items" value={String(counts.open)} hint="Not yet closed" />
        <Stat label="Waiting on you" value={String(counts.waiting)} hint="Password or bank action" />
        <Stat label="Resolved" value={String(counts.resolved)} hint="Closed in this record" />
      </section>

      {waiting.length > 0 ? (
        <section className="cs-panel rounded-xl p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-warning">Needs you</p>
          <div className="mt-4 space-y-4">
            {waiting.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-lg border border-warning/25 bg-bg-deep/50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-xs text-muted">{CASE_LABEL[item.type]} · {item.id}</p>
                  <h2 className="mt-1 text-lg font-medium tracking-tight">{item.title}</h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{item.clientAction}</p>
                </div>
                <Button asChild>
                  <Link to="/cases/$caseId" params={{ caseId: item.id }}>
                    Open case
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="cs-panel rounded-xl p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 text-success" />
            <div>
              <h2 className="text-lg font-medium">All clear on your side</h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
                Monitoring is on. If a fake profile appears, CyberSpide can request removal with the
                authorisation you already signed. You will see it here if we need you.
              </p>
            </div>
          </div>
        </section>
      )}

      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <section className="cs-panel min-w-0 rounded-xl p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-medium">Recent activity</h2>
            <Link to="/cases" className="text-sm text-brand hover:underline">
              All cases
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-line">
            {recent.map((item) => (
              <li key={item.id}>
                <Link
                  to="/cases/$caseId"
                  params={{ caseId: item.id }}
                  className="flex min-w-0 items-start justify-between gap-3 py-3.5 transition-colors hover:text-brand"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-fg">{item.title}</p>
                    <p className="mt-1 text-xs text-muted">
                      {CASE_LABEL[item.type]} · {item.foundAt}
                    </p>
                  </div>
                  <StatusChip status={item.status} />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="cs-panel min-w-0 rounded-xl p-5 sm:p-6">
          <h2 className="text-lg font-medium">What's being watched</h2>
          <p className="mt-1 text-sm text-muted">Last reviewed {client.lastReviewed}</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2 text-muted">
              <UserRound className="mt-0.5 size-4 text-brand" />
              {client.aliases.join(", ")}
            </li>
            <li className="flex gap-2 text-muted">
              <Shield className="mt-0.5 size-4 text-brand" />
              Photo on file · removal authorised
            </li>
            <li className="flex gap-2 text-muted">
              <Clock3 className="mt-0.5 size-4 text-brand" />
              {client.profiles.length} real profiles listed
            </li>
          </ul>
          <Button asChild variant="outline" className="mt-5 w-full">
            <Link to="/watching">View the full watch list</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <article className="cs-panel rounded-xl p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold tabular-nums tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </article>
  );
}
