import { create } from "zustand";
import { clients, type ClientIdentity, type ProtectionCase } from "@/lib/protection";

type ProtectionState = {
  clientId: string;
  client: ClientIdentity;
  setClientId: (id: string) => void;
  confirmClientAction: (caseId: string) => void;
  caseById: (id: string) => ProtectionCase | undefined;
};

function cloneClient(id: string): ClientIdentity {
  const found = clients.find((c) => c.id === id) ?? clients[0];
  return structuredClone(found);
}

export const useProtection = create<ProtectionState>((set, get) => ({
  clientId: clients[0].id,
  client: cloneClient(clients[0].id),
  setClientId: (id) => set({ clientId: id, client: cloneClient(id) }),
  confirmClientAction: (caseId) => {
    const { client } = get();
    const nextCases = client.cases.map((item) => {
      if (item.id !== caseId) return item;
      return {
        ...item,
        status: "resolved" as const,
        clientActionDone: true,
        timeline: [
          ...item.timeline,
          {
            at: "23 Sep 2026, 09:48",
            title: "You confirmed",
            detail: "You marked the password reset as done in this dashboard.",
          },
        ],
      };
    });
    set({ client: { ...client, cases: nextCases } });
  },
  caseById: (id) => get().client.cases.find((item) => item.id === id),
}));
