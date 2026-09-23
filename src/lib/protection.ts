export type CaseStatus = "waiting" | "progress" | "resolved";
export type CaseType = "fake-profile" | "exposed-login" | "exposed-card" | "personal-details";

export type TimelineEvent = {
  at: string;
  title: string;
  detail: string;
};

export type ProtectionCase = {
  id: string;
  type: CaseType;
  title: string;
  summary: string;
  why: string;
  foundOn: string;
  foundAt: string;
  status: CaseStatus;
  clientAction?: string;
  clientActionDone?: boolean;
  evidence?: {
    kind: "profile" | "listing" | "leak";
    headline: string;
    meta: string;
    note: string;
  };
  timeline: TimelineEvent[];
};

export type WatchedProfile = {
  network: string;
  handle: string;
};

export type MonthlyReport = {
  id: string;
  period: string;
  reviewed: number;
  acted: number;
  resolved: number;
  waiting: number;
  note: string;
};

export type ClientIdentity = {
  id: string;
  name: string;
  started: string;
  lastReviewed: string;
  emails: string[];
  phones: string[];
  aliases: string[];
  photoOnFile: boolean;
  removalAuthority: boolean;
  profiles: WatchedProfile[];
  cases: ProtectionCase[];
  reports: MonthlyReport[];
};

export const CASE_LABEL: Record<CaseType, string> = {
  "fake-profile": "Fake profile",
  "exposed-login": "Exposed login",
  "exposed-card": "Exposed card",
  "personal-details": "Personal details found",
};

export const STATUS_LABEL: Record<CaseStatus, string> = {
  waiting: "Needs you",
  progress: "In progress",
  resolved: "Resolved",
};

export const clients: ClientIdentity[] = [
  {
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
      { network: "Instagram", handle: "@aaravshah" },
      { network: "X", handle: "@aaravshah" },
      { network: "LinkedIn", handle: "Aarav Shah" },
      { network: "YouTube", handle: "Aarav Shah" },
    ],
    cases: [
      {
        id: "CS-2409-04",
        type: "fake-profile",
        title: "Instagram account using your name and photo",
        summary:
          "A new Instagram profile copied your photo and a close version of your name. It is not one of the accounts you asked us to treat as real.",
        why: "People who search for you can be sent to the fake account. It is often used to message your contacts or run a scam in your name.",
        foundOn: "instagram.com/aaravshah_officialx",
        foundAt: "22 Sep 2026, 19:41 IST",
        status: "progress",
        evidence: {
          kind: "profile",
          headline: "Aarav Shah",
          meta: "instagram.com/aaravshah_officialx · created this week",
          note: "Photo match against the image on file. This is not your listed Instagram.",
        },
        timeline: [
          {
            at: "22 Sep 2026, 19:41",
            title: "Found",
            detail: "CyberSpide reviewed the profile and confirmed it is not yours.",
          },
          {
            at: "22 Sep 2026, 20:06",
            title: "Removal requested",
            detail: "A takedown request was submitted using your signed authorisation.",
          },
          {
            at: "23 Sep 2026, 08:14",
            title: "Still in progress",
            detail: "The profile is still up. We are following the request until it is removed or closed.",
          },
        ],
      },
      {
        id: "CS-2409-03",
        type: "exposed-login",
        title: "Login for aarav.shah@email.com appeared in a leak",
        summary:
          "A password tied to aarav.shah@email.com showed up in a known exposure set. We cannot reset this for you — only you can.",
        why: "Anyone with that password can try your email and any other account that reused it. This is the finding that needs you today.",
        foundOn: "Exposure set reviewed by CyberSpide",
        foundAt: "21 Sep 2026, 11:02 IST",
        status: "waiting",
        clientAction:
          "Reset the password for aarav.shah@email.com, sign out other sessions, and turn on two-factor authentication. Do not reuse that password anywhere else.",
        clientActionDone: false,
        evidence: {
          kind: "leak",
          headline: "aarav.shah@email.com",
          meta: "Password exposed · source withheld",
          note: "The full password is not shown here. Treat the account as compromised until you reset it.",
        },
        timeline: [
          {
            at: "21 Sep 2026, 11:02",
            title: "Found",
            detail: "CyberSpide confirmed the address is one we are watching for you.",
          },
          {
            at: "21 Sep 2026, 11:18",
            title: "You were notified",
            detail: "Waiting for you to reset the password and confirm here or by email.",
          },
        ],
      },
      {
        id: "CS-2409-02",
        type: "personal-details",
        title: "Phone and address listed on a people-search page",
        summary:
          "A public listing combined your name with a phone number and city. It was not a fake account and did not include a password.",
        why: "These pages feed scam calls and message spoofing. Removal is useful, but it is not the same urgency as a fake profile or a leaked login.",
        foundOn: "Public people-search listing",
        foundAt: "18 Sep 2026, 09:20 IST",
        status: "resolved",
        evidence: {
          kind: "listing",
          headline: "Aarav Shah · Mumbai",
          meta: "People-search directory",
          note: "Opt-out submitted. The listing was taken down or suppressed.",
        },
        timeline: [
          {
            at: "18 Sep 2026, 09:20",
            title: "Found",
            detail: "Reviewed and treated as a directory listing, not impersonation.",
          },
          {
            at: "18 Sep 2026, 10:04",
            title: "Opt-out sent",
            detail: "CyberSpide requested removal of the listing.",
          },
          {
            at: "20 Sep 2026, 16:40",
            title: "Resolved",
            detail: "The listing is no longer publicly available.",
          },
        ],
      },
      {
        id: "CS-2409-01",
        type: "fake-profile",
        title: "Facebook profile using your photo",
        summary:
          "A Facebook profile used your photo and a similar name. You had already authorised removal, so we did not wait for a reply.",
        why: "A cloned Facebook account is commonly used to contact friends, family, or customers as if it were you.",
        foundOn: "facebook.com/aarav.shah.studio",
        foundAt: "14 Sep 2026, 13:11 IST",
        status: "resolved",
        evidence: {
          kind: "profile",
          headline: "Aarav Shah Studio",
          meta: "facebook.com/aarav.shah.studio",
          note: "Removed after the platform accepted the request.",
        },
        timeline: [
          {
            at: "14 Sep 2026, 13:11",
            title: "Found",
            detail: "Confirmed against your real Facebook presence.",
          },
          {
            at: "14 Sep 2026, 13:22",
            title: "Removal requested",
            detail: "Submitted with your signed authorisation.",
          },
          {
            at: "15 Sep 2026, 08:55",
            title: "Resolved",
            detail: "The profile is no longer available.",
          },
        ],
      },
      {
        id: "CS-2408-12",
        type: "exposed-card",
        title: "Payment card details appeared in an exposure set",
        summary:
          "A card related to you appeared in an exposure set. You froze the card with the bank the same day.",
        why: "Exposed card data can be used for unauthorised payments or to make scam calls that sound like your bank.",
        foundOn: "Exposure set reviewed by CyberSpide",
        foundAt: "29 Aug 2026, 17:48 IST",
        status: "resolved",
        evidence: {
          kind: "leak",
          headline: "Card ending ••410",
          meta: "BIN match · full number not shown",
          note: "You confirmed the card was frozen and replaced.",
        },
        timeline: [
          {
            at: "29 Aug 2026, 17:48",
            title: "Found",
            detail: "CyberSpide withheld the full card number and asked you to call the bank.",
          },
          {
            at: "29 Aug 2026, 18:30",
            title: "You acted",
            detail: "Card frozen and replaced.",
          },
          {
            at: "30 Aug 2026, 09:10",
            title: "Resolved",
            detail: "No repeat exposure of the replacement card so far.",
          },
        ],
      },
    ],
    reports: [
      {
        id: "rep-2026-09",
        period: "September 2026",
        reviewed: 6,
        acted: 4,
        resolved: 3,
        waiting: 1,
        note: "One fake Instagram profile is still in removal. One login reset is waiting on you.",
      },
      {
        id: "rep-2026-08",
        period: "August 2026",
        reviewed: 4,
        acted: 2,
        resolved: 2,
        waiting: 0,
        note: "Monitoring started mid-month. Card exposure was found and closed the same day.",
      },
    ],
  },
  {
    id: "meera",
    name: "Meera Iyer",
    started: "3 Jul 2026",
    lastReviewed: "22 Sep 2026, 18:02 IST",
    emails: ["meera@iyerandco.in"],
    phones: ["+91 99•• ••7731"],
    aliases: ["Meera Iyer"],
    photoOnFile: true,
    removalAuthority: true,
    profiles: [
      { network: "LinkedIn", handle: "Meera Iyer" },
      { network: "Instagram", handle: "@meeraiyer" },
    ],
    cases: [
      {
        id: "CS-2408-09",
        type: "personal-details",
        title: "Work email on an old breach list",
        summary:
          "meera@iyerandco.in appeared in an older breach compilation. There was no sign of a fresh dump or a fake profile.",
        why: "Old lists still get reused for password-spraying. A reset and 2FA close the useful window.",
        foundOn: "Historical exposure list",
        foundAt: "12 Aug 2026, 10:15 IST",
        status: "resolved",
        evidence: {
          kind: "leak",
          headline: "meera@iyerandco.in",
          meta: "Historical compilation",
          note: "You confirmed the password had already been changed.",
        },
        timeline: [
          {
            at: "12 Aug 2026, 10:15",
            title: "Found",
            detail: "Reviewed as historical, not a new impersonation.",
          },
          {
            at: "12 Aug 2026, 11:40",
            title: "Resolved",
            detail: "You confirmed the account was already on a unique password with 2FA.",
          },
        ],
      },
    ],
    reports: [
      {
        id: "rep-m-2026-09",
        period: "September 2026",
        reviewed: 2,
        acted: 0,
        resolved: 0,
        waiting: 0,
        note: "Quiet month. Nothing needed your attention.",
      },
      {
        id: "rep-m-2026-08",
        period: "August 2026",
        reviewed: 3,
        acted: 1,
        resolved: 1,
        waiting: 0,
        note: "One historical email listing was reviewed and closed.",
      },
    ],
  },
];

export function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  const keep = user.slice(0, 2);
  return `${keep}•••@${domain}`;
}

export function caseCounts(cases: ProtectionCase[]) {
  return {
    open: cases.filter((c) => c.status !== "resolved").length,
    waiting: cases.filter((c) => c.status === "waiting").length,
    progress: cases.filter((c) => c.status === "progress").length,
    resolved: cases.filter((c) => c.status === "resolved").length,
  };
}
