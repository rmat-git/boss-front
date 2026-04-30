export const YOUTUBE_VIDEO_ID = "UDLKp0DqoFU";

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "New Permit", href: "#how-it-works" },
  { label: "Renewal", href: "#renewal" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#contact-us" },
];

export const MOBILE_BREAKPOINT = 900;

export const PHASES = [
  {
    number: "01",
    title: "Register & Apply",
    color: "#ff9c43",
    icon: "📋",
    desc: "Provide a valid email and upload required documents — DTI, SEC, or CDA registration, Owner's ID, and Lease Contract if your place is rented.",
  },
  {
    number: "02",
    title: "BPLO Review & Clearances",
    color: "#3b82f6",
    icon: "🏛️",
    desc: "Your application is simultaneously routed to all required departments — BFP, Zoning, CHO, OBO, BENRO, and more — for concurrent approval.",
  },
  {
    number: "03",
    title: "Assessment & Payment",
    color: "#10b981",
    icon: "💳",
    desc: "Receive your billing statement and pay online via GCash, PayMaya, DBP Visa, or Landbank — or settle over the counter at the Treasury Office.",
  },
  {
    number: "04",
    title: "Receive Your Permit",
    color: "#8b5cf6",
    icon: "📜",
    desc: "Your digital Mayor's Permit is emailed automatically with an embedded QR code for verification. Pick up a hard copy at BPLO if preferred.",
  },
];

export const AGENCIES = [
  "BPLO", "Bureau of Fire Protection", "Zoning Division", "City Health Office",
  "Office of the Building Official", "CENRO", "BTTMD", "City Administrator",
  "City Veterinarian", "City Agriculture", "Tourism Office",
];

export const PERMIT_DATA = {
  new: {
    label: "New Business Permit",
    office: "City Mayor's Office - Permits and License Division",
    classification: "Simple",
    transaction: "G2B - Government to Business Entity",
    whoMayAvail: "All Business Owners",
    totalTime: "2 hours and 30 minutes",
    encodingDocs: [
      { title: "Duly Filled-Up & Signed Application Form", notes: null },
      {
        title: "Business Registration Certificate",
        notes: [
          "DTI for Single Proprietorship (original & photocopy)",
          "SEC Registration with Articles of Inc. for Corporation/Association/Partnership/OPC (original & photocopy) — include updated GIS from SEC if registration is not recent",
          "CDA Registration for Cooperatives (original & photocopy)",
        ],
      },
      {
        title: "Proof of Business Location",
        notes: [
          "If renting: Notarized Contract of Lease",
          "If not renting: Notarized Affidavit of Non-rental (sole prop) / Secretary's Certificate (corp.) / Proof of ownership",
        ],
      },
      {
        title: "Franchise / Tradename Documents (if applicable)",
        notes: [
          "Franchise Agreement / Certificate of Dealership / IPO Registration if the business will use another tradename rather than its own",
        ],
      },
      {
        title: "Required Clearances",
        notes: [
          "BARANGAY",
          "ZONING",
          "CITY HEALTH OFFICE Clearance / Sanitary Permit to Operate (original & photocopy)",
          "ENRO",
          "OBO",
        ],
      },
      {
        title: "Special Clearances (as applicable by business type)",
        notes: [
          "Agri Products / Agriculture related → City Agriculture Office",
          "Cooperatives → City Cooperatives and Livelihood Development Office",
          "Meat and Poultry products → City Veterinary Office",
          "Tourism Related → City Tourism Office",
          "3 Major Markets & Manukan Country → City Ad Clearance",
          "EGAMES, Cockfighting and the like → valid Resolution of No Objection (RONO) from SP",
        ],
      },
      { title: "Owner's Valid ID with Specimen Signature (clear photocopy)", notes: null },
    ],
    proxyNote: {
      toProcess: ["Authorization letter", "ID of grantor and Authorized Representative"],
      toSign: [
        "Sole Prop: Recent Notarized Special Power of Attorney (SPA) + Valid ID of grantor and authorized representative",
        "Corporation: Recent Notarized Secretary's Certificate",
        "Corp/Companies: Company ID with designation of Grantor and Authorized Representative (in the absence of company ID with designation, any valid ID must be supported with recent General Information Sheet or GIS)",
      ],
    },
    receivingDocs: [
      "Submit business application form with attached documentary requirements",
      "Assessment Form with Official Receipt (Original)",
      "VALID Fire Safety Inspection Certificate (FSIC) from the Bureau of Fire Protection (BFP) — original & photocopy",
    ],
    whereToSecure: "CMO Permits & Licensing Office",
    steps: [
      {
        client: "Secure Business Application Form from BPLO and process the necessary requirements and clearances.",
        agency: "BPLO Frontliner accepts application and evaluates completeness of documents submitted for encoding and instructs the client to process the necessary requirements/clearances.",
        fees: "None",
        time: "1 hour",
        responsible: [
          "Reah Marie P. Rom — License Inspector II",
          "Winnie C. Pabalinas — Licensing Officer I",
          "Mary Ann D. Eder — Clerk III",
        ],
      },
      {
        client: "Proceed to City Treasurer's Office–License Division for assessment and payment, then return to CMO–Permits and License Division to present the Official Receipt as proof of payment.",
        agency: "BPLO receives and reviews all submitted documents prior to printing of Mayor's Permit and verification by the BPLO Head.",
        fees: "c/o CTO",
        time: "30 minutes",
        responsible: ["CTO Assessment Officer", "CTO Cashier"],
      },
      {
        client: "Receive the Mayor's Permit.",
        agency: "3.1 BPLO Head approves the Mayor's Permit.\n3.2 BPLO Frontliner releases the approved Mayor's Permit.",
        fees: "None",
        time: "30 minutes – 1 hour",
        responsible: [
          "Printing: Virman T. Akol — Clerk III",
          "Recommending Approval: Stela Rose J. Rayos — Licensing Officer IV",
          "Release: BPLO Frontliners",
        ],
      },
    ],
  },
  renewal: {
    label: "Renewal of Business Permit",
    office: "City Mayor's Office - Permits and License Division",
    classification: "Simple",
    transaction: "G2B - Government to Business Entity",
    whoMayAvail: "All Business Owners",
    totalTime: "4 hours",
    encodingDocs: [
      {
        title: "Previous Year's Mayor's Permit",
        notes: "Present Original or Photocopy — with Valid ID (if owner) or Authorization Letter / SPA with ID of owner and ID of the representative (if authorized representative)",
      },
    ],
    proxyNote: {
      toProcess: ["Authorization letter", "ID of grantor and Authorized Representative"],
      toSign: [
        "Sole Prop: Recent Notarized Special Power of Attorney (SPA) + Valid ID of grantor and authorized representative",
        "Corporation: Recent Notarized Secretary's Certificate",
        "Corp/Companies: Company ID with designation of Grantor and Authorized Representative (in the absence of company ID with designation, any valid ID must be supported with recent General Information Sheet or GIS)",
      ],
    },
    receivingDocs: [
      {
        groupLabel: null,
        items: [
          {
            title: "Duly Signed Pre-printed Application Form with Clearances",
            notes: ["BARANGAY", "ZONING", "CITY HEALTH OFFICE Clearance / Sanitary Permit to Operate (original & photocopy)", "ENRO", "OBO"],
          },
          {
            title: "VALID Fire Safety Inspection Certificate (FSIC)",
            notes: "From Bureau of Fire Protection (BFP) — original & photocopy",
          },
          {
            title: "Assessment Form with Official Receipt",
            notes: null,
          },
        ],
      },
      {
        groupLabel: "Special Clearances (as applicable by business type)",
        items: [
          { title: "Agri Products / Agriculture related", notes: "City Agriculture Office" },
          { title: "Cooperatives", notes: "City Cooperatives and Livelihood Development Office" },
          { title: "Meat and Poultry Products", notes: "City Veterinary Office" },
          { title: "Tourism Related", notes: "City Tourism Office" },
          { title: "3 Major Markets & Manukan Country", notes: "City Ad Clearance" },
        ],
      },
      {
        groupLabel: "Other Supporting Documents (as applicable)",
        items: [
          { title: "Security Agencies", notes: "Valid License to Operate from Camp Crame NCR" },
          { title: "Firearms and Ammunitions", notes: "Valid License to Operate from Camp Crame" },
          { title: "Recruitment Agencies (Abroad)", notes: "Valid License to Operate from POEA" },
          { title: "Manpower Services (Local)", notes: "Valid Certificate of Registration from DOLE" },
          { title: "Pawnshops, Money Service Businesses, Remittance & Transfer Company, Money Changers and Foreign Exchange", notes: "Valid Certificate of Registration from Bangko Sentral ng Pilipinas (BSP)" },
          { title: "EGAMES, Cockfighting and the like", notes: "Valid Resolution of No Objection (RONO) from SP" },
        ],
      },
    ],
    whereToSecure: "CMO - Permits & Licensing Office",
    steps: [
      {
        client: "Secure Business Application Form from BPLO.",
        agency: "1.1 BPLO Frontliner accepts application and evaluates completeness of documents submitted for encoding.\n1.2 Advise the client to either proceed to Assessment and pay, or process the necessary requirements and clearances.",
        fees: "c/o CTO–License Division",
        time: "1–2 hours",
        responsible: "Reah Marie P. Rom — License Inspector II · Winnie C. Pabalinas — Licensing Officer I · Mary Ann D. Eder — Clerk III · c/o CTO–License Division",
      },
      {
        client: "Submit the application form with attached complete requirements and Assessment Form or Official Receipt as proof of payment.",
        agency: "BPLO receives and reviews all submitted documents prior to printing of Mayor's Permit and verification by the Head.",
        fees: "—",
        time: "—",
        responsible: "BPLO Review Staff",
      },
      {
        client: "Receive the Mayor's Permit.",
        agency: "3.1 BPLO Head approves the Mayor's Permit.\n3.2 BPLO Frontliner releases the approved Mayor's Permit.",
        fees: "None",
        time: "1 hour",
        responsible: "Printing: Virman T. Akol — Clerk III · Recommending Approval: Stela Rose J. Rayos — Licensing Officer IV · Release: BPLO Frontliners",
      },
    ],
  },
};