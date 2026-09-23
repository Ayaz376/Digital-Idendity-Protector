import { createFileRoute } from "@tanstack/react-router";
import { Check, Image as ImageIcon } from "lucide-react";
import { maskEmail } from "@/lib/protection";
import { useProtection } from "@/lib/protection-store";

export const Route = createFileRoute("/watching")({ component: WatchingPage });

function WatchingPage() {
  const { client } = useProtection();

  return (
    <div className="space-y-6">
      <header className="max-w-2xl">
        <p className="cs-eyebrow">Watch list</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
          What CyberSpide is watching
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          This is the identity profile you submitted. We only collect what is needed to spot
          misuse. Last reviewed {client.lastReviewed}.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="cs-panel rounded-xl p-5 sm:p-6">
          <h2 className="text-lg font-medium">Names</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {client.aliases.map((name) => (
              <li key={name} className="rounded-md bg-bg-deep/60 px-3 py-2.5">
                {name}
              </li>
            ))}
          </ul>
        </section>

        <section className="cs-panel rounded-xl p-5 sm:p-6">
          <h2 className="text-lg font-medium">Contact points</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {client.emails.map((email) => (
              <li key={email} className="rounded-md bg-bg-deep/60 px-3 py-2.5">
                {maskEmail(email)}
              </li>
            ))}
            {client.phones.map((phone) => (
              <li key={phone} className="rounded-md bg-bg-deep/60 px-3 py-2.5">
                {phone}
              </li>
            ))}
          </ul>
        </section>

        <section className="cs-panel rounded-xl p-5 sm:p-6">
          <h2 className="text-lg font-medium">Real profiles</h2>
          <p className="mt-1 text-sm text-muted">
            Used to tell your accounts apart from fakes. We do not post from these.
          </p>
          <ul className="mt-4 space-y-2">
            {client.profiles.map((p) => (
              <li
                key={`${p.network}-${p.handle}`}
                className="flex items-center justify-between rounded-md bg-bg-deep/60 px-3 py-2.5 text-sm"
              >
                <span className="text-muted">{p.network}</span>
                <span>{p.handle}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="cs-panel rounded-xl p-5 sm:p-6">
          <h2 className="text-lg font-medium">Permissions on file</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <ImageIcon className="mt-0.5 size-4 text-brand" />
              <span>
                Official photo on file — used only to match impersonation, including AI-generated
                faces.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 text-success" />
              <span>
                Removal authorised — CyberSpide can request takedown of fake profiles without
                waiting for a reply.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
