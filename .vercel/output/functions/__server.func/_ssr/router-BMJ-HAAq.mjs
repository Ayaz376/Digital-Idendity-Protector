import { i as __toESM } from "../_runtime.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as require_jsx_runtime, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Menu, d as Eye, h as Bell, i as Shield, o as LayoutDashboard, r as TriangleAlert, t as X, u as FileText } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-C_uf36nf.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BMJ-HAAq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-warning",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,background-color,color,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-brand text-bg hover:bg-brand/90",
			mint: "bg-brand-strong text-bg hover:bg-brand-strong/90",
			outline: "border border-line bg-transparent text-fg hover:border-line-strong hover:bg-surface-2",
			ghost: "text-muted hover:bg-surface-2 hover:text-fg",
			warning: "bg-warning text-bg hover:bg-warning/90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = (0, import_react.forwardRef)(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var CASE_LABEL = {
	"fake-profile": "Fake profile",
	"exposed-login": "Exposed login",
	"exposed-card": "Exposed card",
	"personal-details": "Personal details found"
};
var STATUS_LABEL = {
	waiting: "Needs you",
	progress: "In progress",
	resolved: "Resolved"
};
var clients = [{
	id: "aarav",
	name: "Aarav Shah",
	started: "12 Aug 2026",
	lastReviewed: "23 Sep 2026, 08:14 IST",
	emails: ["aarav.shah@email.com", "hello@aaravstudio.in"],
	phones: ["+91 98•• ••2410"],
	aliases: ["Aarav Shah", "A. Shah"],
	photoOnFile: true,
	removalAuthority: true,
	profiles: [
		{
			network: "Instagram",
			handle: "@aaravshah"
		},
		{
			network: "X",
			handle: "@aaravshah"
		},
		{
			network: "LinkedIn",
			handle: "Aarav Shah"
		},
		{
			network: "YouTube",
			handle: "Aarav Shah"
		}
	],
	cases: [
		{
			id: "CS-2409-04",
			type: "fake-profile",
			title: "Instagram account using your name and photo",
			summary: "A new Instagram profile copied your photo and a close version of your name. It is not one of the accounts you asked us to treat as real.",
			why: "People who search for you can be sent to the fake account. It is often used to message your contacts or run a scam in your name.",
			foundOn: "instagram.com/aaravshah_officialx",
			foundAt: "22 Sep 2026, 19:41 IST",
			status: "progress",
			evidence: {
				kind: "profile",
				headline: "Aarav Shah",
				meta: "instagram.com/aaravshah_officialx · created this week",
				note: "Photo match against the image on file. This is not your listed Instagram."
			},
			timeline: [
				{
					at: "22 Sep 2026, 19:41",
					title: "Found",
					detail: "CyberSpide reviewed the profile and confirmed it is not yours."
				},
				{
					at: "22 Sep 2026, 20:06",
					title: "Removal requested",
					detail: "A takedown request was submitted using your signed authorisation."
				},
				{
					at: "23 Sep 2026, 08:14",
					title: "Still in progress",
					detail: "The profile is still up. We are following the request until it is removed or closed."
				}
			]
		},
		{
			id: "CS-2409-03",
			type: "exposed-login",
			title: "Login for aarav.shah@email.com appeared in a leak",
			summary: "A password tied to aarav.shah@email.com showed up in a known exposure set. We cannot reset this for you — only you can.",
			why: "Anyone with that password can try your email and any other account that reused it. This is the finding that needs you today.",
			foundOn: "Exposure set reviewed by CyberSpide",
			foundAt: "21 Sep 2026, 11:02 IST",
			status: "waiting",
			clientAction: "Reset the password for aarav.shah@email.com, sign out other sessions, and turn on two-factor authentication. Do not reuse that password anywhere else.",
			clientActionDone: false,
			evidence: {
				kind: "leak",
				headline: "aarav.shah@email.com",
				meta: "Password exposed · source withheld",
				note: "The full password is not shown here. Treat the account as compromised until you reset it."
			},
			timeline: [{
				at: "21 Sep 2026, 11:02",
				title: "Found",
				detail: "CyberSpide confirmed the address is one we are watching for you."
			}, {
				at: "21 Sep 2026, 11:18",
				title: "You were notified",
				detail: "Waiting for you to reset the password and confirm here or by email."
			}]
		},
		{
			id: "CS-2409-02",
			type: "personal-details",
			title: "Phone and address listed on a people-search page",
			summary: "A public listing combined your name with a phone number and city. It was not a fake account and did not include a password.",
			why: "These pages feed scam calls and message spoofing. Removal is useful, but it is not the same urgency as a fake profile or a leaked login.",
			foundOn: "Public people-search listing",
			foundAt: "18 Sep 2026, 09:20 IST",
			status: "resolved",
			evidence: {
				kind: "listing",
				headline: "Aarav Shah · Mumbai",
				meta: "People-search directory",
				note: "Opt-out submitted. The listing was taken down or suppressed."
			},
			timeline: [
				{
					at: "18 Sep 2026, 09:20",
					title: "Found",
					detail: "Reviewed and treated as a directory listing, not impersonation."
				},
				{
					at: "18 Sep 2026, 10:04",
					title: "Opt-out sent",
					detail: "CyberSpide requested removal of the listing."
				},
				{
					at: "20 Sep 2026, 16:40",
					title: "Resolved",
					detail: "The listing is no longer publicly available."
				}
			]
		},
		{
			id: "CS-2409-01",
			type: "fake-profile",
			title: "Facebook profile using your photo",
			summary: "A Facebook profile used your photo and a similar name. You had already authorised removal, so we did not wait for a reply.",
			why: "A cloned Facebook account is commonly used to contact friends, family, or customers as if it were you.",
			foundOn: "facebook.com/aarav.shah.studio",
			foundAt: "14 Sep 2026, 13:11 IST",
			status: "resolved",
			evidence: {
				kind: "profile",
				headline: "Aarav Shah Studio",
				meta: "facebook.com/aarav.shah.studio",
				note: "Removed after the platform accepted the request."
			},
			timeline: [
				{
					at: "14 Sep 2026, 13:11",
					title: "Found",
					detail: "Confirmed against your real Facebook presence."
				},
				{
					at: "14 Sep 2026, 13:22",
					title: "Removal requested",
					detail: "Submitted with your signed authorisation."
				},
				{
					at: "15 Sep 2026, 08:55",
					title: "Resolved",
					detail: "The profile is no longer available."
				}
			]
		},
		{
			id: "CS-2408-12",
			type: "exposed-card",
			title: "Payment card details appeared in an exposure set",
			summary: "A card related to you appeared in an exposure set. You froze the card with the bank the same day.",
			why: "Exposed card data can be used for unauthorised payments or to make scam calls that sound like your bank.",
			foundOn: "Exposure set reviewed by CyberSpide",
			foundAt: "29 Aug 2026, 17:48 IST",
			status: "resolved",
			evidence: {
				kind: "leak",
				headline: "Card ending ••410",
				meta: "BIN match · full number not shown",
				note: "You confirmed the card was frozen and replaced."
			},
			timeline: [
				{
					at: "29 Aug 2026, 17:48",
					title: "Found",
					detail: "CyberSpide withheld the full card number and asked you to call the bank."
				},
				{
					at: "29 Aug 2026, 18:30",
					title: "You acted",
					detail: "Card frozen and replaced."
				},
				{
					at: "30 Aug 2026, 09:10",
					title: "Resolved",
					detail: "No repeat exposure of the replacement card so far."
				}
			]
		}
	],
	reports: [{
		id: "rep-2026-09",
		period: "September 2026",
		reviewed: 6,
		acted: 4,
		resolved: 3,
		waiting: 1,
		note: "One fake Instagram profile is still in removal. One login reset is waiting on you."
	}, {
		id: "rep-2026-08",
		period: "August 2026",
		reviewed: 4,
		acted: 2,
		resolved: 2,
		waiting: 0,
		note: "Monitoring started mid-month. Card exposure was found and closed the same day."
	}]
}, {
	id: "meera",
	name: "Meera Iyer",
	started: "3 Jul 2026",
	lastReviewed: "22 Sep 2026, 18:02 IST",
	emails: ["meera@iyerandco.in"],
	phones: ["+91 99•• ••7731"],
	aliases: ["Meera Iyer"],
	photoOnFile: true,
	removalAuthority: true,
	profiles: [{
		network: "LinkedIn",
		handle: "Meera Iyer"
	}, {
		network: "Instagram",
		handle: "@meeraiyer"
	}],
	cases: [{
		id: "CS-2408-09",
		type: "personal-details",
		title: "Work email on an old breach list",
		summary: "meera@iyerandco.in appeared in an older breach compilation. There was no sign of a fresh dump or a fake profile.",
		why: "Old lists still get reused for password-spraying. A reset and 2FA close the useful window.",
		foundOn: "Historical exposure list",
		foundAt: "12 Aug 2026, 10:15 IST",
		status: "resolved",
		evidence: {
			kind: "leak",
			headline: "meera@iyerandco.in",
			meta: "Historical compilation",
			note: "You confirmed the password had already been changed."
		},
		timeline: [{
			at: "12 Aug 2026, 10:15",
			title: "Found",
			detail: "Reviewed as historical, not a new impersonation."
		}, {
			at: "12 Aug 2026, 11:40",
			title: "Resolved",
			detail: "You confirmed the account was already on a unique password with 2FA."
		}]
	}],
	reports: [{
		id: "rep-m-2026-09",
		period: "September 2026",
		reviewed: 2,
		acted: 0,
		resolved: 0,
		waiting: 0,
		note: "Quiet month. Nothing needed your attention."
	}, {
		id: "rep-m-2026-08",
		period: "August 2026",
		reviewed: 3,
		acted: 1,
		resolved: 1,
		waiting: 0,
		note: "One historical email listing was reviewed and closed."
	}]
}];
function maskEmail(email) {
	const [user, domain] = email.split("@");
	if (!user || !domain) return email;
	return `${user.slice(0, 2)}•••@${domain}`;
}
function caseCounts(cases) {
	return {
		open: cases.filter((c) => c.status !== "resolved").length,
		waiting: cases.filter((c) => c.status === "waiting").length,
		progress: cases.filter((c) => c.status === "progress").length,
		resolved: cases.filter((c) => c.status === "resolved").length
	};
}
function cloneClient(id) {
	const found = clients.find((c) => c.id === id) ?? clients[0];
	return structuredClone(found);
}
var useProtection = create((set, get) => ({
	clientId: clients[0].id,
	client: cloneClient(clients[0].id),
	setClientId: (id) => set({
		clientId: id,
		client: cloneClient(id)
	}),
	confirmClientAction: (caseId) => {
		const { client } = get();
		const nextCases = client.cases.map((item) => {
			if (item.id !== caseId) return item;
			return {
				...item,
				status: "resolved",
				clientActionDone: true,
				timeline: [...item.timeline, {
					at: "23 Sep 2026, 09:48",
					title: "You confirmed",
					detail: "You marked the password reset as done in this dashboard."
				}]
			};
		});
		set({ client: {
			...client,
			cases: nextCases
		} });
	},
	caseById: (id) => get().client.cases.find((item) => item.id === id)
}));
var NAV = [
	{
		to: "/",
		label: "Overview",
		icon: LayoutDashboard
	},
	{
		to: "/cases",
		label: "Cases",
		icon: Shield
	},
	{
		to: "/watching",
		label: "What's watched",
		icon: Eye
	},
	{
		to: "/reports",
		label: "Reports",
		icon: FileText
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { client, clientId, setClientId } = useProtection();
	const counts = caseCounts(client.cases);
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cs-shell relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cs-grid-mask" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 mx-auto flex min-h-screen max-w-[1280px] flex-col lg:flex-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between gap-3 border-b border-line px-4 py-3 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						onClick: () => setOpen(true),
						"aria-label": "Open menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					})]
				}),
				open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fixed inset-0 z-40 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "absolute inset-0 bg-bg-deep/70",
						"aria-label": "Close menu",
						onClick: () => setOpen(false)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "absolute inset-y-0 left-0 flex w-[min(20rem,86vw)] flex-col border-r border-line bg-bg p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => setOpen(false),
									"aria-label": "Close",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, {
								pathname,
								waiting: counts.waiting,
								onNavigate: () => setOpen(false)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientSwitch, {
								clientId,
								onChange: setClientId
							})
						]
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "hidden w-64 shrink-0 flex-col border-r border-line px-4 py-6 lg:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 px-1 text-xs leading-relaxed text-muted",
							children: "Digital Identity Protection"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, {
								pathname,
								waiting: counts.waiting
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientSwitch, {
							clientId,
							onChange: setClientId
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.14em] text-muted",
							children: "Client view"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-fg",
							children: client.name
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hidden size-1.5 rounded-full bg-brand-strong sm:inline-block" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Monitoring active"
								}),
								counts.waiting > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full bg-warning/15 px-2.5 py-1 text-warning",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-3.5" }),
										counts.waiting,
										" to do"
									]
								}) : null
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8",
						children
					})]
				})
			]
		})]
	});
}
function Brand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/cyberspide-mark.png",
			alt: "",
			width: 36,
			height: 30,
			className: "h-8 w-auto"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-base font-semibold tracking-tight text-fg",
			children: "CyberSpide"
		})]
	});
}
function NavList({ pathname, waiting, onNavigate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-1",
		children: NAV.map((item) => {
			const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
			const Icon = item.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: onNavigate,
				className: cn("flex min-h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150", active ? "bg-brand/12 text-fg" : "text-muted hover:bg-surface-2 hover:text-fg"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1",
						children: item.label
					}),
					item.to === "/cases" && waiting > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-warning/20 px-2 py-0.5 text-[11px] text-warning",
						children: waiting
					}) : null
				]
			}, item.to);
		})
	});
}
function ClientSwitch({ clientId, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 rounded-lg border border-line bg-surface/80 p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-[0.14em] text-muted",
				children: "Example client"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-2 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Switch example client"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: clientId,
					onChange: (e) => onChange(e.target.value),
					className: "h-11 w-full rounded-md border border-line bg-bg-deep px-3 text-sm text-fg",
					children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.name
					}, c.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs leading-relaxed text-muted",
				children: "Sample data for a client portal. Nothing here is from a live vendor console."
			})
		]
	});
}
var styles_default = "/assets/styles-BTmbEb_J.css";
var APP_NAME = "CyberSpide Identity Protection";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#040916"
			},
			{
				name: "description",
				content: "CyberSpide client dashboard for Digital Identity Protection — status, cases, and what needs your action."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$5 = () => import("./routes-1GT905fk.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./watching-YbHIaayA.mjs");
var Route$4 = createFileRoute("/watching")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./cases-CZkHr3Jz.mjs");
var Route$3 = createFileRoute("/cases/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("../_caseId-CC2ZIj_7.mjs");
var Route$2 = createFileRoute("/cases/$caseId")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./reports-DbmeKGqu.mjs");
var Route$1 = createFileRoute("/reports/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("../_reportId-CG7zTiIx.mjs");
var Route = createFileRoute("/reports/$reportId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var WatchingRoute = Route$4.update({
	id: "/watching",
	path: "/watching",
	getParentRoute: () => Route$6
});
var CasesIndexRoute = Route$3.update({
	id: "/cases/",
	path: "/cases/",
	getParentRoute: () => Route$6
});
var CasesCaseIdRoute = Route$2.update({
	id: "/cases/$caseId",
	path: "/cases/$caseId",
	getParentRoute: () => Route$6
});
var ReportsIndexRoute = Route$1.update({
	id: "/reports/",
	path: "/reports/",
	getParentRoute: () => Route$6
});
var rootRouteChildren = {
	IndexRoute,
	WatchingRoute,
	CasesCaseIdRoute,
	ReportsReportIdRoute: Route.update({
		id: "/reports/$reportId",
		path: "/reports/$reportId",
		getParentRoute: () => Route$6
	}),
	CasesIndexRoute,
	ReportsIndexRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { CASE_LABEL as a, maskEmail as c, useProtection as i, Button as l, Route as n, STATUS_LABEL as o, Route$2 as r, caseCounts as s, router_exports as t, cn as u };
