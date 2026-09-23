import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as ArrowRight } from "../_libs/lucide-react.mjs";
import { i as useProtection } from "./router-BMJ-HAAq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-DbmeKGqu.js
var import_jsx_runtime = require_jsx_runtime();
function ReportsPage() {
	const { client } = useProtection();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "cs-eyebrow",
					children: "Reports"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-3xl font-semibold tracking-tight",
					children: "A written record of the month"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: "Live alerts still land as cases. These pages are the quiet summary you can keep or forward — what was watched, what we did, and what is still open."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-3 sm:grid-cols-2",
			children: client.reports.map((report) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/reports/$reportId",
				params: { reportId: report.id },
				className: "cs-panel flex h-full flex-col rounded-xl p-5 transition-[border-color] hover:border-line-strong",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.14em] text-muted",
						children: "Monthly summary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-xl font-medium tracking-tight",
						children: report.period
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-3 gap-2 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								n: report.reviewed,
								label: "Reviewed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								n: report.acted,
								label: "Acted on"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								n: report.resolved,
								label: "Resolved"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 flex-1 text-sm leading-relaxed text-muted",
						children: report.note
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-4 inline-flex items-center gap-1 text-sm text-brand",
						children: ["Open summary", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				]
			}) }, report.id))
		})]
	});
}
function Metric({ n, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-bg-deep/60 px-2 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl font-semibold tabular-nums",
			children: n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] text-muted",
			children: label
		})]
	});
}
//#endregion
export { ReportsPage as component };
