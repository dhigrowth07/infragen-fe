// ── Gemini Tool / Function Declarations ──────────────────────────────────────
// Uses SchemaType enum from @google/generative-ai for proper type compatibility.

import type { Tool } from "@google/generative-ai";
import { SchemaType } from "@google/generative-ai";

export const chatTools: Tool[] = [
  {
    functionDeclarations: [
      {
        name: "searchProperties",
        description:
          "Search and filter Vizhi Infragen's property listings. Use when the user asks to see properties, plots, villas, or land with specific type, location, or budget filters.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            propertyType: {
              type: SchemaType.STRING,
              description:
                "Type of property. One of: 'PLOTS & SITES', 'VILLAS & HOMES', 'COMMERCIAL SITES', 'AGRICULTURAL'",
            },
            location: {
              type: SchemaType.STRING,
              description:
                "Location in Coimbatore e.g. Sulur, Kalapatti, Neelambur, Sathy Road, Avinashi Road, Pattanam, Saravanampatti",
            },
            budgetLabel: {
              type: SchemaType.STRING,
              description:
                "Budget range label e.g. 'Under ₹30L', '₹30L–₹60L', '₹60L–₹1.2Cr', 'Above ₹1.2Cr'",
            },
          },
          required: [],
        },
      },
      {
        name: "getCompanyInfo",
        description:
          "Search the Vizhi Infragen knowledge base for company information, service details, legal FAQs, buying/selling guides, area information, contact details, NRI guides, or documentation requirements.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            topic: {
              type: SchemaType.STRING,
              description:
                "The topic to search e.g. 'DTCP approval', 'encumbrance certificate', 'NRI property management', 'buying guide', 'company vision', 'contact details'",
            },
          },
          required: ["topic"],
        },
      },
      {
        name: "bookSiteVisit",
        description:
          "Trigger the site visit booking form for the user. Use when the user wants to book or schedule a site visit, property visit, or appointment.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            propertyTitle: {
              type: SchemaType.STRING,
              description: "Title of the property if specified",
            },
            location: {
              type: SchemaType.STRING,
              description: "Location of the property",
            },
          },
          required: [],
        },
      },
      {
        name: "saveLead",
        description:
          "Trigger the lead capture form for the user. Use when the user wants to sell a property, get a valuation, or request a callback from our team.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            purpose: {
              type: SchemaType.STRING,
              description: "Purpose e.g. 'sell property', 'get valuation', 'general enquiry'",
            },
          },
          required: [],
        },
      },
      {
        name: "contactAgent",
        description:
          "Show the human handoff options (WhatsApp, call, email). Use when the user wants to talk to a human agent, advisor, or needs direct assistance.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {},
          required: [],
        },
      },
      {
        name: "findNearbyAreas",
        description:
          "Get information about a specific area in Coimbatore including growth potential and property suitability.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            location: {
              type: SchemaType.STRING,
              description: "Name of the area in Coimbatore",
            },
          },
          required: ["location"],
        },
      },
      {
        name: "getServiceDetails",
        description:
          "Get detailed information about a specific Vizhi Infragen service.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            serviceName: {
              type: SchemaType.STRING,
              description:
                "Service name e.g. 'NRI Property Management', 'Land Approvals', 'Building Construction', 'Rental Services', 'Land Sales'",
            },
          },
          required: ["serviceName"],
        },
      },
    ],
  },
];
