import { b as require_jsx_runtime, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowLeft } from "./_libs/lucide-react.mjs";
import { i as useProtection, n as Route } from "./_ssr/router-BMJ-HAAq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_reportId-CG7zTiIx.js
var import_jsx_runtime = require_jsx_runtime();
function ReportDetail() {
	const { reportId } = Route.useParams();
	const { client } = useProtection();
	const report = client.reports.find((r) => r.id === reportId);
	if (!report) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cs-panel rounded-xl p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "This summary is not in the current example client."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/reports",
			className: "mt-4 inline-flex text-sm text-brand hover:underline",
			children: "Back to reports"
		})]
	});
	const periodCases = client.cases.filter((c) => report.period.startsWith("September") ? c.foundAt.includes("Sep 2026") : c.foundAt.includes("Aug 2026"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/reports",
			className: "inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "All reports"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "cs-panel rounded-xl p-6 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.16em] text-brand",
					children: "CyberSpide"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-3xl font-semibold tracking-tight",
					children: "Identity Protection summary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						client.name,
						" · ",
						report.period
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm leading-relaxed text-muted",
					children: report.note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
							n: report.reviewed,
							label: "Findings reviewed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
							n: report.acted,
							label: "Actions taken"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
							n: report.resolved,
							label: "Resolved"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
							n: report.waiting,
							label: "Waiting on you"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-10 text-sm font-medium uppercase tracking-[0.12em] text-muted",
					children: "Cases in this period"
				}),
				periodCases.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "No client-facing cases in this month."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-line",
					children: periodCases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start justify-between gap-3 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-muted",
							children: c.id
						})]
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 text-xs leading-relaxed text-muted",
					children: "Prepared by CyberSpide. Monitoring is continuous. This page is a record, not the live alert channel. Contact contact@cyberspide.com if a line looks wrong."
				})
			]
		})]
	});
}
function Cell({ n, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-bg-deep/70 px-3 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl font-semibold tabular-nums",
			children: n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted",
			children: label
		})]
	});
}
//#endregion
export { ReportDetail as component };
