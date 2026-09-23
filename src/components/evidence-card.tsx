import { Globe, KeyRound, UserRound } from "lucide-react";
import type { ProtectionCase } from "@/lib/protection";

export function EvidenceCard({ evidence }: { evidence: NonNullable<ProtectionCase["evidence"]> }) {
  const Icon = evidence.kind === "profile" ? UserRound : evidence.kind === "leak" ? KeyRound : Globe;

  return (
    <div className="rounded-lg border border-line bg-bg-deep/70 p-4">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-surface-2 text-brand">
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-fg">{evidence.headline}</p>
          <p className="mt-1 text-xs text-muted">{evidence.meta}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{evidence.note}</p>
        </div>
      </div>
    </div>
  );
}
