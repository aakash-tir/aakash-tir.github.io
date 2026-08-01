/* ============ Certifications data ============
   Add a certification = add one object here.

   name:    full credential name as it appears on the certificate.
   issuer:  who grants it (Microsoft, DataCamp, AWS, …).
   status:  'earned' | 'in-progress'.
   date:    display label — year earned, or "Expected YYYY" while in progress.
   pinned:  true = always visible; false = shown only after "Show all",
            grouped under its first topic's heading.
   topics:  keys into TOPICS below; the first one is the grouping topic.
   url:     optional verification link (Credly, DataCamp statement, …).
   note:    optional one-liner shown on the card (e.g. how you're preparing).
*/

// Grouping topics for the "Show all" list. Add a key here before using it.
export const TOPICS = {
  "power-bi": "Power BI & Data Visualization",
  sql: "SQL & Databases",
  python: "Python",
  "data-analysis": "Data Analysis",
  "ai-ml": "AI & Machine Learning",
  cloud: "Cloud",
};

export const CERTIFICATIONS = [
  {
    name: "PL-300: Microsoft Power BI Data Analyst",
    issuer: "Microsoft",
    status: "in-progress",
    date: "Expected 2026",
    pinned: true,
    topics: ["power-bi", "data-analysis"],
    note: "Preparing via DataCamp's Data Analyst in Power BI track.",
  },
];
