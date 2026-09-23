import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Image, m as Check } from "../_libs/lucide-react.mjs";
import { c as maskEmail, i as useProtection } from "./router-BMJ-HAAq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watching-YbHIaayA.js
var import_jsx_runtime = require_jsx_runtime();
function WatchingPage() {
	const { client } = useProtection();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "cs-eyebrow",
					children: "Watch list"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-3xl font-semibold tracking-tight",
					children: "What CyberSpide is watching"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: [
						"This is the identity profile you submitted. We only collect what is needed to spot misuse. Last reviewed ",
						client.lastReviewed,
						"."
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "cs-panel rounded-xl p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Names"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2 text-sm",
						children: client.aliases.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-md bg-bg-deep/60 px-3 py-2.5",
							children: name
						}, name))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "cs-panel rounded-xl p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Contact points"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-2 text-sm",
						children: [client.emails.map((email) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-md bg-bg-deep/60 px-3 py-2.5",
							children: maskEmail(email)
						}, email)), client.phones.map((phone) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-md bg-bg-deep/60 px-3 py-2.5",
							children: phone
						}, phone))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "cs-panel rounded-xl p-5 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-medium",
							children: "Real profiles"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Used to tell your accounts apart from fakes. We do not post from these."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2",
							children: client.profiles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between rounded-md bg-bg-deep/60 px-3 py-2.5 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: p.network
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.handle })]
							}, `${p.network}-${p.handle}`))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "cs-panel rounded-xl p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Permissions on file"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "mt-0.5 size-4 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Official photo on file — used only to match impersonation, including AI-generated faces." })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Removal authorised — CyberSpide can request takedown of fake profiles without waiting for a reply." })]
						})]
					})]
				})
			]
		})]
	});
}
//#endregion
export { WatchingPage as component };
