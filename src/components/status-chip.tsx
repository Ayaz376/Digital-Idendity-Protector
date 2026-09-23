import { Badge } from "@/components/ui/badge";
import { STATUS_LABEL, type CaseStatus } from "@/lib/protection";

const tone: Record<CaseStatus, "waiting" | "brand" | "success"> = {
  waiting: "waiting",
  progress: "brand",
  resolved: "success",
};

export function StatusChip({ status }: { status: CaseStatus }) {
  return <Badge tone={tone[status]}>{STATUS_LABEL[status]}</Badge>;
}
