import { b as require_jsx_runtime, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowLeft, l as Globe, n as UserRound, p as CircleCheck, s as KeyRound } from "./_libs/lucide-react.mjs";
import { a as CASE_LABEL, i as useProtection, l as Button, r as Route$2 } from "./_ssr/router-BMJ-HAAq.mjs";
import { t as StatusChip } from "./_ssr/status-chip-BbXZHsS4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_caseId-CC2ZIj_7.js
var import_jsx_runtime = require_jsx_runtime();
function EvidenceCard({ evidence }) {
	const Icon = evidence.kind === "profile" ? UserRound : evidence.kind === "leak" ? KeyRound : Globe;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-lg border border-line bg-bg-deep/70 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-11 shrink-0 items-center justify-center rounded-md bg-surface-2 text-brand",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-fg",
						children: evidence.headline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: evidence.meta
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: evidence.note
					})
				]
			})]
		})
	});
}
function CaseDetail() {
	const { caseId } = Route$2.useParams();
	const { caseById, confirmClientAction } = useProtection();
	const item = caseById(caseId);
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cs-panel rounded-xl p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "This case is not in the current example client."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/cases",
			className: "mt-4 inline-flex text-sm text-brand hover:underline",
			children: "Back to cases"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/cases",
				className: "inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "All cases"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: item.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted",
							children: [
								CASE_LABEL[item.type],
								" · ",
								item.id
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold tracking-tight",
						children: item.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Found ",
							item.foundAt,
							item.foundOn ? ` · ${item.foundOn}` : ""
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "cs-panel space-y-3 rounded-xl p-5 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium uppercase tracking-[0.12em] text-muted",
					children: "What we found"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-fg sm:text-base",
					children: item.summary
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "cs-panel space-y-3 rounded-xl p-5 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium uppercase tracking-[0.12em] text-muted",
					children: "Why it matters"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted sm:text-base",
					children: item.why
				})]
			}),
			item.evidence ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium uppercase tracking-[0.12em] text-muted",
					children: "Evidence"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceCard, { evidence: item.evidence })]
			}) : null,
			item.clientAction ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "cs-panel space-y-4 rounded-xl border-warning/30 p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium uppercase tracking-[0.12em] text-warning",
						children: "What you should do"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed sm:text-base",
						children: item.clientAction
					}),
					item.status === "waiting" && !item.clientActionDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => confirmClientAction(item.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "I have reset this"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center gap-2 text-sm text-success",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), "You confirmed this was done."]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "cs-panel rounded-xl p-5 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium uppercase tracking-[0.12em] text-muted",
					children: "What you should do"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: "Nothing from you on this one. Do not message the fake profile. CyberSpide is handling the removal request."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "cs-panel rounded-xl p-5 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium uppercase tracking-[0.12em] text-muted",
					children: "What CyberSpide did"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-5 space-y-4",
					children: item.timeline.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[12px_1fr] gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-2.5 rounded-full bg-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: event.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs tabular-nums text-muted",
								children: event.at
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted",
								children: event.detail
							})
						] })]
					}, `${event.at}-${event.title}`))
				})]
			})
		]
	});
}
//#endregion
export { CaseDetail as component };
