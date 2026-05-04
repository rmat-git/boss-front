export const YOUTUBE_VIDEO_ID = "UDLKp0DqoFU";

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "New Permit", href: "#how-it-works" },
  { label: "Renewal", href: "#renewal" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#contact-us" },
];

export const MOBILE_BREAKPOINT = 900;

export const AGENCIES = [
  "BPLO", "Bureau of Fire Protection", "Zoning Division", "City Health Office",
  "Office of the Building Official", "BENRO", "BTTMD", "City Administrator",
  "City Veterinarian", "City Agriculture", "Tourism Office",
];

// ─── BPLO Contact Info ────────────────────────────────────────────────────────

export const BPLO_CONTACT = {
  email: "bplo_register@bacolodcity.gov.ph",
  tel: "4352606",
  portal: "https://ebpls.bacolodcity.gov.ph/",
  office: "Office of the City Mayor - Permits and License Division",
};

// ─── Permit Data ──────────────────────────────────────────────────────────────

export const PERMIT_DATA = {

  // ── New Business Permit (Online Application) ────────────────────────────────
  new: {
    label: "New Business Permit",
    office: "Office of the City Mayor - Permits and License Division",
    classification: "Simple",
    transaction: "G2B - Government to Business Entity",
    whoMayAvail: "All Business Owners",
    totalTime: "TBD", // placeholder — no processing time stated in online reference

    // Documents required at encoding/submission — grouped by category
    encodingDocs: [
      {
        title: "Proof of Registration",
        notes: [
          "Issued by SEC for all kinds of Corporations, Associations and Partnership",
          "Issued by DTI for Sole / Single Proprietor",
          "Issued by the Cooperative Development Authority for Cooperatives",
          "Other Requirements if applicable: Franchise Agreement, Intellectual Property Office (IPO) registration, etc.",
        ],
      },
      {
        title: "Proof of Right of Applicant to use location as business address",
        notes: [
          "If owned: Proof of ownership – Tax Declaration / Land Tax Receipt or Building Permit",
          "If not owned by the applicant: Contract of Lease / Memorandum of Agreement / Affidavit of Consent or Conformity from the property owner supported by Proof of ownership or CENTENARIO",
        ],
      },
      {
        title: "Valid Identification (ID) Card",
        notes: [
          "ID Card of the Owner",
          "If applicable: ID of Authorized Representative with supporting SPA or Secretary Certificate",
        ],
      },
      {
        title: "Required Clearances",
        type: "clearance_group",
        items: [
          { title: "Barangay Clearance", office: "Barangay Hall", key: "req_clearance_0" },
          { title: "Fire Safety Inspection Certificate (FSIC)", office: "Bureau of Fire Protection (BFP)", key: "req_clearance_1" },
          { title: "Zoning Clearance", office: "Zoning Division", key: "req_clearance_2" },
          { title: "City Health Office Clearance / Sanitary Permit to Operate", office: "City Health Office", key: "req_clearance_3" },
          { title: "Office of the Building Official (OBO) Clearance", office: "Office of the Building Official", key: "req_clearance_4" },
          { title: "BENRO Clearance", office: "BENRO", key: "req_clearance_5" },
        ],
      },
      {
        title: "Special Clearances",
        type: "clearance_group",
        subtitle: "As applicable by business type",
        items: [
          { title: "City Agriculture Office Clearance", office: "Agriculture related", key: "req_special_0" },
          { title: "City Veterinary Office Clearance", office: "Meat and Poultry products", key: "req_special_1" },
          { title: "City Tourism Office Clearance", office: "Tourism Related", key: "req_special_2" },
          { title: "City Administrator Clearance", office: "Manukan Country", key: "req_special_3" },
          { title: "BTTMD Clearance", office: "BTTMD-regulated businesses", key: "req_special_4" },
          { title: "Resolution of No Objection (RONO)", office: "EGAMES, Cockfighting", key: "req_special_5" },
        ],
      },
    ],

    // Proxy / authorized representative requirements — kept from walk-in reference
    proxyNote: {
      toProcess: ["Authorization letter", "ID of grantor and Authorized Representative"],
      toSign: [
        "Sole Prop: Recent Notarized Special Power of Attorney (SPA) + Valid ID of grantor and authorized representative",
        "Corporation: Recent Notarized Secretary's Certificate",
        "Corp/Companies: Company ID with designation of Grantor and Authorized Representative (in the absence of company ID with designation, any valid ID must be supported with recent General Information Sheet or GIS)",
      ],
    },

    // Online submission note — replaces walk-in receiving docs
    submissionNote: {
      email: BPLO_CONTACT.email,
      subject: "REQUIREMENTS FOR NEW BUSINESS SUBMISSION",
      reference: "ARTA DTI DIL G DICT Joint Memorandum Circular No. 1 Series of 2021",
    },

    whereToSecure: "CMO - Permits & Licensing Office / Online via ebpls.bacolodcity.gov.ph",

    steps: [
      {
        client: "Fill in the Online Application at https://ebpls.bacolodcity.gov.ph/ and email the required documents to bplo_register@bacolodcity.gov.ph with the subject 'REQUIREMENTS FOR NEW BUSINESS SUBMISSION'.",
        agency: "BPLO receives and evaluates the online application and emailed documentary requirements for completeness.",
        fees: "None",
        time: "—",
        responsible: [
          "Reah Marie P. Rom — License Inspector II",
          "Winnie C. Pabalinas — Licensing Officer I",
          "Mary Ann D. Eder — Clerk III",
        ],
      },
      {
        client: "Check the email provided for the soft copy of your application and the link for tracking clearance status.",
        agency: "BPLO sends the applicant a soft copy of the application along with instructions and a tracking link for clearances.",
        fees: "—",
        time: "—",
        responsible: [
          "Reah Marie P. Rom — License Inspector II",
          "Winnie C. Pabalinas — Licensing Officer I",
          "Mary Ann D. Eder — Clerk III",
        ],
      },
      {
        client: "Monitor clearance tracking link. Complete all pending clearances and payment. Receive the e-copy of the Mayor's Permit via email, or claim the hard copy at the Permits and Licensing Division office.",
        agency: "BPLO issues the e-copy of the Mayor's Permit upon completion of all clearances and full payment. Hard copy may be claimed at the office.",
        fees: "c/o CTO",
        time: "—",
        responsible: [
          "Printing: Virman T. Akol — Clerk III",
          "Recommending Approval: Stela Rose J. Rayos — Licensing Officer IV",
          "Release: BPLO Frontliners",
        ],
      },
    ],
  },

  // ── Renewal of Business Permit (Online Application) ─────────────────────────
  renewal: {
    label: "Renewal of Business Permit",
    office: "Office of the City Mayor - Permits and License Division",
    classification: "Simple",
    transaction: "G2B - Government to Business Entity",
    whoMayAvail: "All Business Owners",
    totalTime: "TBD", // placeholder — online renewal time TBD

    // Only the previous year's Mayor's Permit needed to start — kept simple
    encodingDocs: [
      {
        title: "Previous Year's Mayor's Permit",
        notes: [
          "Present Original or Photocopy",
          "With Valid ID (if owner) or Authorization Letter / SPA with ID of owner and ID of the representative (if authorized representative)",
        ],
      },
      {
        title: "Required Clearances (for all businesses)",
        notes: [
          "Barangay Clearance",
          "Fire Safety Inspection Certificate (FSIC) — Bureau of Fire Protection (BFP)",
          "Zoning Clearance — Zoning Division",
          "City Health Office Clearance / Sanitary Permit to Operate",
          "Office of the Building Official (OBO) Clearance",
          "BENRO Clearance",
        ],
      },
      {
        title: "Special Clearances (as applicable by business type)",
        notes: [
          "Agriculture related → City Agriculture Office",
          "Meat and Poultry products → City Veterinary Office",
          "Tourism Related → City Tourism Office",
          "Manukan Country → City Administrator Clearance",
          "BTTMD-regulated businesses → BTTMD Clearance",
          "EGAMES, Cockfighting → valid Resolution of No Objection (RONO) from SP",
        ],
      },
      {
        title: "Other Supporting Documents (as applicable)",
        notes: [
          "Security Agencies → Valid License to Operate from Camp Crame NCR",
          "Firearms and Ammunitions → Valid License to Operate from Camp Crame",
          "Recruitment Agencies (Abroad) → Valid License to Operate from POEA",
          "Manpower Services (Local) → Valid Certificate of Registration from DOLE",
          "Pawnshops, Money Service Businesses, Remittance & Transfer Company, Money Changers and Foreign Exchange → Valid Certificate of Registration from Bangko Sentral ng Pilipinas (BSP)",
        ],
      },
    ],

    // Proxy / authorized representative requirements — same as new
    proxyNote: {
      toProcess: ["Authorization letter", "ID of grantor and Authorized Representative"],
      toSign: [
        "Sole Prop: Recent Notarized Special Power of Attorney (SPA) + Valid ID of grantor and authorized representative",
        "Corporation: Recent Notarized Secretary's Certificate",
        "Corp/Companies: Company ID with designation of Grantor and Authorized Representative (in the absence of company ID with designation, any valid ID must be supported with recent General Information Sheet or GIS)",
      ],
    },

    // Online submission note — mirrors new application
    submissionNote: {
      email: BPLO_CONTACT.email,
      subject: "REQUIREMENTS FOR BUSINESS RENEWAL SUBMISSION",
      reference: "ARTA DTI DIL G DICT Joint Memorandum Circular No. 1 Series of 2021",
    },

    whereToSecure: "CMO - Permits & Licensing Office / Online via ebpls.bacolodcity.gov.ph",

    steps: [
      {
        client: "Fill in the Online Renewal Application at https://ebpls.bacolodcity.gov.ph/ and email the required documents to bplo_register@bacolodcity.gov.ph with the subject 'REQUIREMENTS FOR BUSINESS RENEWAL SUBMISSION'.",
        agency: "BPLO receives and evaluates the online renewal application and emailed documentary requirements for completeness.",
        fees: "None",
        time: "—",
        responsible: [
          "Reah Marie P. Rom — License Inspector II",
          "Winnie C. Pabalinas — Licensing Officer I",
          "Mary Ann D. Eder — Clerk III",
          "c/o CTO — License Division",
        ],
      },
      {
        client: "Check the email provided for the soft copy of your application and the link for tracking clearance status.",
        agency: "BPLO sends the applicant a soft copy of the renewal application along with instructions and a tracking link for clearances.",
        fees: "—",
        time: "—",
        responsible: [
          "Reah Marie P. Rom — License Inspector II",
          "Winnie C. Pabalinas — Licensing Officer I",
          "Mary Ann D. Eder — Clerk III",
        ],
      },
      {
        client: "Monitor clearance tracking link. Complete all pending clearances and payment. Receive the e-copy of the renewed Mayor's Permit via email, or claim the hard copy at the Permits and Licensing Division office.",
        agency: "BPLO issues the e-copy of the renewed Mayor's Permit upon completion of all clearances and full payment. Hard copy may be claimed at the office.",
        fees: "c/o CTO",
        time: "—",
        responsible: [
          "Printing: Virman T. Akol — Clerk III",
          "Recommending Approval: Stela Rose J. Rayos — Licensing Officer IV",
          "Release: BPLO Frontliners",
        ],
      },
    ],
  },
};