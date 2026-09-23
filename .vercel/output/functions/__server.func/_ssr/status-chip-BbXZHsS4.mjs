import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as STATUS_LABEL, u as cn } from "./router-BMJ-HAAq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-chip-BbXZHsS4.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "neutral", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap", tone === "neutral" && "bg-surface-2 text-muted", tone === "brand" && "bg-brand/15 text-brand", tone === "success" && "bg-success/12 text-success", tone === "warning" && "bg-warning/15 text-warning", tone === "waiting" && "bg-warning/15 text-warning", className),
		...props
	});
}
var tone = {
	waiting: "waiting",
	progress: "brand",
	resolved: "success"
};
function StatusChip({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: tone[status],
		children: STATUS_LABEL[status]
	});
}
//#endregion
export { StatusChip as t };
