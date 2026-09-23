import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Clock3, g as ArrowRight, i as Shield, n as UserRound, p as CircleCheck } from "../_libs/lucide-react.mjs";
import { a as CASE_LABEL, i as useProtection, l as Button, s as caseCounts } from "./router-BMJ-HAAq.mjs";
import { t as StatusChip } from "./status-chip-BbXZHsS4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-1GT905fk.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { client } = useProtection();
	const counts = caseCounts(client.cases);
	const waiting = client.cases.filter((c) => c.status === "waiting");
	const recent = [...client.cases].sort((a, b) => b.foundAt.localeCompare(a.foundAt)).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "cs-eyebrow",
						children: "Digital Identity Protection"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl",
						children: counts.waiting > 0 ? "One item needs you. Everything else is in our hands." : "Nothing needs your attention right now."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base",
						children: "CyberSpide watches for impersonation, leaked logins, exposed cards, and personal details used without your say. Findings are reviewed before they appear here."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Protection",
						value: "Active",
						hint: `Since ${client.started}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Open items",
						value: String(counts.open),
						hint: "Not yet closed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Waiting on you",
						value: String(counts.waiting),
						hint: "Password or bank action"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Resolved",
						value: String(counts.resolved),
						hint: "Closed in this record"
					})
				]
			}),
			waiting.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "cs-panel rounded-xl p-5 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.14em] text-warning",
					children: "Needs you"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-4",
					children: waiting.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4 rounded-lg border border-warning/25 bg-bg-deep/50 p-4 sm:flex-row sm:items-center sm:justify-between",
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 text-lg font-medium tracking-tight",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-xl text-sm leading-relaxed text-muted",
									children: item.clientAction
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cases/$caseId",
								params: { caseId: item.id },
								children: ["Open case", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						})]
					}, item.id))
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "cs-panel rounded-xl p-5 sm:p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 size-5 text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "All clear on your side"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xl text-sm leading-relaxed text-muted",
						children: "Monitoring is on. If a fake profile appears, CyberSpide can request removal with the authorisation you already signed. You will see it here if we need you."
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-w-0 gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "cs-panel min-w-0 rounded-xl p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-medium",
							children: "Recent activity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cases",
							className: "text-sm text-brand hover:underline",
							children: "All cases"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-line",
						children: recent.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cases/$caseId",
							params: { caseId: item.id },
							className: "flex min-w-0 items-start justify-between gap-3 py-3.5 transition-colors hover:text-brand",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium text-fg",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted",
									children: [
										CASE_LABEL[item.type],
										" · ",
										item.foundAt
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: item.status })]
						}) }, item.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "cs-panel min-w-0 rounded-xl p-5 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-medium",
							children: "What's being watched"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: ["Last reviewed ", client.lastReviewed]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2 text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "mt-0.5 size-4 text-brand" }), client.aliases.join(", ")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2 text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "mt-0.5 size-4 text-brand" }), "Photo on file · removal authorised"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2 text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "mt-0.5 size-4 text-brand" }),
										client.profiles.length,
										" real profiles listed"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							className: "mt-5 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/watching",
								children: "View the full watch list"
							})
						})
					]
				})]
			})
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "cs-panel rounded-xl p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.14em] text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-2xl font-semibold tabular-nums tracking-tight",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: hint
			})
		]
	});
}
//#endregion
export { Home as component };
