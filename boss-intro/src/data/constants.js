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
          {text: "Issued by asdf for all kinds of Corporations, Associations and Partnership", indent: false},
          { text: "Issued by DTI for Sole / Single Proprietorship", indent: false},
          { text: "Issued by the Cooperative Development Authority for Cooperatives", indent: false},
          {text: "Other Requirements if applicable:", indent: false}, 
          {text: "Franchise Agreement, Intellectual Property Office (IPO) registration, etc.", indent: true},
        ],
      },
      {
        title: "Proof of Right of Applicant to use location as business address",
        notes: [
          { text: "If owned:", indent: false },
          { text: "Proof of ownership – Tax Declaration / Land Tax Receipt or Building Permit", indent: true },
          { text: "If not owned by the applicant:", indent: false },
          { text: "Contract of Lease / Memorandum of Agreement / Affidavit of Consent or Conformity from the property owner supported by Proof of ownership or CENTENARIO", indent: true },
        ],
      },
      {
        title: "List of Valid Identification (ID) Card",
        notes: [
          "ID Card of the Owner",
          { text: "If applicable:", indent: false },
          { text: "ID of Authorized Representative with supporting SPA or Secretary Certificate", indent: true },
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
        client: {
          intro: "Fill in the Online Application and email the required documents:",
          link: "https://ebpls.bacolodcity.gov.ph/",
          email: "bplo_register@bacolodcity.gov.ph",
          subject: "REQUIREMENTS FOR NEW BUSINESS SUBMISSION",
        },
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
        client: "Pay your fees and check the email provided for the soft copy of your application and the link for tracking clearance status.",
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
        client: {
          intro: "Fill in the Online Renewal Application and email the required documents:",
          link: "https://ebpls.bacolodcity.gov.ph/",
          email: "bplo_register@bacolodcity.gov.ph",
          subject: "REQUIREMENTS FOR BUSINESS RENEWAL SUBMISSION",
        },
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

// ─── Document Registry ────────────────────────────────────────────────────────
//
// Drives the DocumentViewer panel in PermitUI.
// Keys must match the key scheme used by PermitSection:
//   encodingDocs (non-clearance) → req_0, req_1, req_2 …
//   required clearances          → req_clearance_0 … req_clearance_5
//   special clearances           → req_special_0  … req_special_5
//   new permit steps             → new_step_0, new_step_1, new_step_2
//   renewal steps                → renewal_step_0, renewal_step_1, renewal_step_2

export const DOC_REGISTRY = {

  // ── Encoding docs (non-clearance) ─────────────────────────────────────────
  req_0: {
    title: "Proof of Registration",
    icon: "📋",
    link: "https://ebpls.bacolodcity.gov.ph/",
    notes: [
      {text: "For Sole Proprietorship - DTI", indent: false},
      {text: "Link: dti.link.placeholders", indent: true},

      {text: "For Corporations, Associations and Partnership - SEC", indent: false},
      {text: "Link: sec.link.placeholders", indent: true},
      {text: "For Cooperatives - CDA", indent: false},
      {text: "Link: cda.link.placeholders", indent: true},
      {text: "Other Requirements if applicable:", indent: false}, 
      {text: "Franchise Agreement, Intellectual Property Office (IPO) registration, etc.", indent: true},
      
    ],
    files: [
      { name: "Business Application Form (PDF)", tag: "Required", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
      { name: "Instructions for Filling Out the Form", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_1: {
    title: "Proof of Right to Use Location",
    icon: "📍",
    link: "https://placeholder.gov.ph/req_1",
    notes: [
      { text: "If owned, proof of ownership:", indent: false },
      { text: "Tax Declaration / Land Tax Receipt", indent: true },
      { text: "Building Permit", indent: true },
      { text: "If not owned by the applicant:", indent: false },
      { text: "Contract of Lease", indent: true },
      { text: "Memorandum of Agreement", indent: true },
      { text: "Affidavit of Consent or Conformity from the property owner supported by Proof of ownership of the CONSENTOR", indent: true },
    ],
    files: [
      { name: "Notarized Lease Contract Template", tag: "Template", tagColor: "#8b5cf6", href: "/downloads/reference.pdf" },
      { name: "Affidavit of Non-rental (Sole Prop)", tag: "Template", tagColor: "#8b5cf6", href: "/downloads/reference.pdf" },
      { name: "Secretary's Certificate Template (Corp)", tag: "Template", tagColor: "#8b5cf6", href: "/downloads/reference.pdf" },
    ],
  },
  req_2: {
    title: "Valid Identification (ID) Card",
    icon: "🪪",
    link: "https://placeholder.gov.ph/req_2",
    notes: [
      {text: "Valid IDs:", indent: false},
      {text: "National ID", indent: true},
      {text: "Driver's License", indent: true},
      {text: "SSS", indent: true},
      {text: "PRC", indent: true},
      {text: "UMID", indent: true},
      {text: "GSIS ID", indent: true},
      {text: "PhilHealth ID", indent: true},
      {text: "If applicable:", indent: false },
      {text: "ID of Authorized Representative (with supporting SPA or Secretary Certificate)", indent: true },
    ],
    files: [
      {   name: "Accepted Valid IDs List", tag: "Info", tagColor: "#64748b", href: "/downloads/reference.pdf" },
    ],
  },

  // ── Required Clearances ───────────────────────────────────────────────────
  req_clearance_0: {
    title: "Barangay Clearance",
    icon: "🏘️",
    link: "https://placeholder.gov.ph/req_clearance_0",
    where: "Barangay Hall",
    files: [
      { name: "Barangay Clearance Application Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_clearance_1: {
    title: "Fire Safety Inspection Certificate (FSIC)",
    icon: "🔥",
    link: "https://placeholder.gov.ph/req_clearance_1",
    where: "Bureau of Fire Protection (BFP)",
    files: [
      { name: "BFP FSIC Requirements Checklist", tag: "Checklist", tagColor: "#10b981", href: "/downloads/reference.pdf" },
      { name: "Fire Safety Inspection Form", tag: "Form", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
    ],
  },
  req_clearance_2: {
    title: "Zoning Clearance",
    icon: "🗺️",
    link: "https://placeholder.gov.ph/req_clearance_2",
    where: "Zoning Division",
    files: [
      { name: "Zoning Clearance Application Form", tag: "Form", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
      { name: "Zoning Requirements Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_clearance_3: {
    title: "City Health Office Clearance / Sanitary Permit to Operate",
    icon: "🏥",
    link: "https://placeholder.gov.ph/req_clearance_3",
    where: "City Health Office",
    files: [
      { name: "Sanitary Permit Application Form", tag: "Form", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
      { name: "City Health Clearance Requirements", tag: "Checklist", tagColor: "#10b981", href: "/downloads/reference.pdf" },
    ],
  },
  req_clearance_4: {
    title: "Office of the Building Official (OBO) Clearance",
    icon: "🏗️",
    link: "https://placeholder.gov.ph/req_clearance_4",
    where: "Office of the Building Official",
    files: [
      { name: "OBO Clearance Application Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_clearance_5: {
    title: "BENRO Clearance",
    icon: "🌿",
    link: "https://placeholder.gov.ph/req_clearance_5",
    where: "BENRO",
    files: [
      { name: "BENRO Clearance Requirements", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },

  // ── Special Clearances ────────────────────────────────────────────────────
  req_special_0: {
    title: "City Agriculture Office Clearance",
    icon: "🌾",
    link: "https://placeholder.gov.ph/req_special_0",
    where: "City Agriculture Office",
    applicableTo: "Agri Products / Agriculture related businesses",
    files: [
      { name: "City Agriculture Clearance Form", tag: "Form", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
    ],
  },
  req_special_1: {
    title: "City Veterinary Office Clearance",
    icon: "🐄",
    link: "https://placeholder.gov.ph/req_special_1",
    where: "City Veterinary Office",
    applicableTo: "Meat and Poultry products",
    files: [
      { name: "Veterinary Clearance Requirements", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_special_2: {
    title: "City Tourism Office Clearance",
    icon: "🏖️",
    link: "https://placeholder.gov.ph/req_special_2",
    where: "City Tourism Office",
    applicableTo: "Tourism Related businesses",
    files: [
      { name: "Tourism Clearance Application Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_special_3: {
    title: "City Administrator Clearance",
    icon: "🏛️",
    link: "https://placeholder.gov.ph/req_special_3",
    where: "Office of the City Administrator",
    applicableTo: "3 Major Markets & Manukan Country",
    files: [
      { name: "City Administrator Clearance Form", tag: "Form", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
    ],
  },
  req_special_4: {
    title: "BTTMD Clearance",
    icon: "🚌",
    link: "https://placeholder.gov.ph/req_special_4",
    where: "BTTMD",
    applicableTo: "BTTMD-regulated businesses",
    files: [
      { name: "BTTMD Clearance Requirements", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_special_5: {
    title: "Resolution of No Objection (RONO)",
    icon: "📜",
    link: "https://placeholder.gov.ph/req_special_5",
    where: "Sangguniang Panlungsod (SP)",
    applicableTo: "EGAMES, Cockfighting and the like",
    files: [
      { name: "RONO Application Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
      { name: "RONO Sample Form", tag: "Sample", tagColor: "#f59e0b", href: "/downloads/reference.pdf" },
    ],
  },

  // ── New Permit Steps ──────────────────────────────────────────────────────
  new_step_0: {
    title: "Step 1 — Application & Encoding (New)",
    icon: "📝",
    files: [
      { name: "Business Application Form (PDF)", tag: "Required", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
      { name: "Requirements Checklist (New Permit)", tag: "Checklist", tagColor: "#10b981", href: "/downloads/reference.pdf" },
      { name: "BPLO Counter Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  new_step_1: {
    title: "Step 2 — Assessment & Payment (New)",
    icon: "💳",
    files: [
      { name: "CTO Assessment Form", tag: "Required", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
      { name: "Fee Schedule 2025", tag: "Reference", tagColor: "#8b5cf6", href: "/downloads/reference.pdf" },
      { name: "Online Payment Guide (GCash / PayMaya)", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  new_step_2: {
    title: "Step 3 — Receive Mayor's Permit (New)",
    icon: "📜",
    files: [
      { name: "Mayor's Permit Sample (for reference)", tag: "Sample", tagColor: "#f59e0b", href: "/downloads/reference.pdf" },
      { name: "QR Verification Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
      { name: "Hard Copy Pickup Instructions", tag: "Info", tagColor: "#64748b", href: "/downloads/reference.pdf" },
    ],
  },

  // ── Renewal Steps ─────────────────────────────────────────────────────────
  renewal_step_0: {
    title: "Step 1 — Application & Encoding (Renewal)",
    icon: "📝",
    files: [
      { name: "Pre-printed Application Form (PDF)", tag: "Required", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
      { name: "Requirements Checklist (Renewal)", tag: "Checklist", tagColor: "#10b981", href: "/downloads/reference.pdf" },
      { name: "BPLO Counter Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  renewal_step_1: {
    title: "Step 2 — Submit & Review (Renewal)",
    icon: "📂",
    files: [
      { name: "Document Submission Checklist", tag: "Checklist", tagColor: "#10b981", href: "/downloads/reference.pdf" },
      { name: "Assessment Form", tag: "Required", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
    ],
  },
  renewal_step_2: {
    title: "Step 3 — Receive Mayor's Permit (Renewal)",
    icon: "📜",
    files: [
      { name: "Mayor's Permit Sample (for reference)", tag: "Sample", tagColor: "#f59e0b", href: "/downloads/reference.pdf" },
      { name: "QR Verification Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
      { name: "Hard Copy Pickup Instructions", tag: "Info", tagColor: "#64748b", href: "/downloads/reference.pdf" },
    ],
  },
};