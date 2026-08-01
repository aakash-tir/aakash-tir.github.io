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
  "data-engineering": "Data Engineering",
  "ai-ml": "AI & Machine Learning",
  cloud: "Cloud",
};

const DC = "https://www.datacamp.com/statement-of-accomplishment/course/";

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
  {
    name: "Introduction to Power BI",
    issuer: "DataCamp",
    status: "earned",
    date: "Jul 2026",
    pinned: false,
    topics: ["power-bi"],
    url: `${DC}fa1054e81e65f454cfed59dbca974696dafd13f6`,
  },
  {
    name: "Data Preparation in Power BI",
    issuer: "DataCamp",
    status: "earned",
    date: "Jul 2026",
    pinned: false,
    topics: ["power-bi"],
    url: `${DC}3d3bd04c24ce68f1bbf41421264da4b2e1de95c1`,
  },
  {
    name: "Data Visualization in Power BI",
    issuer: "DataCamp",
    status: "earned",
    date: "Jul 2026",
    pinned: false,
    topics: ["power-bi"],
    url: `${DC}7bd8292a3cd0cddddf02d9e4bc709ae1278113f9`,
  },
  {
    name: "Introduction to DAX in Power BI",
    issuer: "DataCamp",
    status: "earned",
    date: "Jul 2026",
    pinned: false,
    topics: ["power-bi"],
    url: `${DC}07b9a82f546dc8ba51f168b1a954cf5e9e565109`,
  },
  {
    name: "Case Study: Analyzing Customer Churn in Power BI",
    issuer: "DataCamp",
    status: "earned",
    date: "Jul 2026",
    pinned: false,
    topics: ["power-bi", "data-analysis"],
    url: `${DC}ab0493dcbfc95337a3dd775152a0effd7caab2e5`,
  },
  {
    name: "Introduction to Apache Airflow in Python",
    issuer: "DataCamp",
    status: "earned",
    date: "Jul 2026",
    pinned: false,
    topics: ["data-engineering", "python"],
    url: `${DC}7b5c6d9a51664cbc05d032b41c62e0127b435009`,
  },
];
