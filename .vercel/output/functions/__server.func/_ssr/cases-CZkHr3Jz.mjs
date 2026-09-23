import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CASE_LABEL, i as useProtection, u as cn } from "./router-BMJ-HAAq.mjs";
import { t as StatusChip } from "./status-chip-BbXZHsS4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cases-CZkHr3Jz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "waiting",
		label: "Needs you"
	},
	{
		id: "progress",
		label: "In progress"
	},
	{
		id: "resolved",
		label: "Resolved"
	}
];
function CasesPage() {
	const { client } = useProtection();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const list = filter === "all" ? client.cases : client.cases.filter((c) => c.status === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "cs-eyebrow",
					children: "Cases"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-3xl font-semibold tracking-tight",
					children: "What we found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm leading-relaxed text-muted",
					children: "Only reviewed findings. Low-value directory noise stays with CyberSpide unless it turns into impersonation or a leak you must act on."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(item.id),
					className: cn("h-11 rounded-full border px-4 text-sm transition-colors", filter === item.id ? "border-brand bg-brand/15 text-fg" : "border-line text-muted hover:border-line-strong hover:text-fg"),
					children: item.label
				}, item.id))
			}),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "cs-panel rounded-xl p-8 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Nothing in this view."
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: list.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/cases/$caseId",
					params: { caseId: item.id },
					className: "cs-panel flex flex-col gap-3 rounded-xl p-4 transition-[border-color] hover:border-line-strong sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									CASE_LABEL[item.type],
									" · ",
									item.id
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 truncate text-sm font-medium sm:text-base",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: item.foundAt
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: item.status })]
				}) }, item.id))
			})
		]
	});
}
//#endregion
export { CasesPage as component };
