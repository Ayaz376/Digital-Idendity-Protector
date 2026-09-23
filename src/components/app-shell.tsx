import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Eye,
  FileText,
  LayoutDashboard,
  Menu,
  Shield,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { clients } from "@/lib/protection";
import { caseCounts } from "@/lib/protection";
import { useProtection } from "@/lib/protection-store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/cases", label: "Cases", icon: Shield },
  { to: "/watching", label: "What's watched", icon: Eye },
  { to: "/reports", label: "Reports", icon: FileText },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { client, clientId, setClientId } = useProtection();
  const counts = caseCounts(client.cases);
  const [open, setOpen] = useState(false);

  return (
    <div className="cs-shell relative">
      <div className="cs-grid-mask" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1280px] flex-col lg:flex-row">
        <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 lg:hidden">
          <Brand />
          <Button variant="outline" size="icon" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu />
          </Button>
        </header>

        {open ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              className="absolute inset-0 bg-bg-deep/70"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <aside className="absolute inset-y-0 left-0 flex w-[min(20rem,86vw)] flex-col border-r border-line bg-bg p-4">
              <div className="mb-6 flex items-center justify-between">
                <Brand />
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
                  <X />
                </Button>
              </div>
              <NavList pathname={pathname} waiting={counts.waiting} onNavigate={() => setOpen(false)} />
              <ClientSwitch clientId={clientId} onChange={setClientId} />
            </aside>
          </div>
        ) : null}

        <aside className="hidden w-64 shrink-0 flex-col border-r border-line px-4 py-6 lg:flex">
          <Brand />
          <p className="mt-3 px-1 text-xs leading-relaxed text-muted">
            Digital Identity Protection
          </p>
          <div className="mt-8 flex-1">
            <NavList pathname={pathname} waiting={counts.waiting} />
          </div>
          <ClientSwitch clientId={clientId} onChange={setClientId} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted">Client view</p>
              <p className="text-sm font-medium text-fg">{client.name}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="hidden size-1.5 rounded-full bg-brand-strong sm:inline-block" />
              <span className="hidden sm:inline">Monitoring active</span>
              {counts.waiting > 0 ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2.5 py-1 text-warning">
                  <Bell className="size-3.5" />
                  {counts.waiting} to do
                </span>
              ) : null}
            </div>
          </div>
          <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src="/cyberspide-mark.png"
        alt=""
        width={36}
        height={30}
        className="h-8 w-auto"
      />
      <span className="font-display text-base font-semibold tracking-tight text-fg">
        CyberSpide
      </span>
    </div>
  );
}

function NavList({
  pathname,
  waiting,
  onNavigate,
}: {
  pathname: string;
  waiting: number;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active =
          item.to === "/"
            ? pathname === "/"
            : pathname === item.to || pathname.startsWith(`${item.to}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150",
              active
                ? "bg-brand/12 text-fg"
                : "text-muted hover:bg-surface-2 hover:text-fg",
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.to === "/cases" && waiting > 0 ? (
              <span className="rounded-full bg-warning/20 px-2 py-0.5 text-[11px] text-warning">
                {waiting}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

function ClientSwitch({
  clientId,
  onChange,
}: {
  clientId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mt-6 rounded-lg border border-line bg-surface/80 p-3">
      <p className="text-[11px] uppercase tracking-[0.14em] text-muted">Example client</p>
      <label className="mt-2 block">
        <span className="sr-only">Switch example client</span>
        <select
          value={clientId}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-md border border-line bg-bg-deep px-3 text-sm text-fg"
        >
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <p className="mt-2 text-xs leading-relaxed text-muted">
        Sample data for a client portal. Nothing here is from a live vendor console.
      </p>
    </div>
  );
}
