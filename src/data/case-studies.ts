import { placeholder } from "@/lib/placeholder";

export type CaseStudyMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type CaseStudyBlock =
  | {
      type: "narrative";
      heading: string;
      body: string[];
    }
  | {
      type: "fullBleed";
      image: CaseStudyMedia;
    }
  | {
      type: "split";
      heading: string;
      body: string[];
      image: CaseStudyMedia;
      imageSide?: "left" | "right";
    }
  | {
      type: "pair";
      images: [CaseStudyMedia, CaseStudyMedia];
    }
  | {
      type: "deliverables";
      heading: string;
      body: string;
      items: { title: string; detail: string }[];
    }
  | {
      type: "gallery";
      images: CaseStudyMedia[];
    }
  | {
      type: "quote";
      text: string;
      attribution: string;
      role: string;
    };

export type CaseStudy = {
  slug: string;
  client: string;
  headline: string;
  summary: string;
  cardTags: string;
  cardDescription: string;
  gradient: string;
  meta: {
    industry: string;
    market: string;
    services: string;
  };
  hero: CaseStudyMedia;
  blocks: CaseStudyBlock[];
  closing: {
    heading: string;
    body: string[];
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "microjuris",
    client: "MicroJuris",
    headline: "MicroJuris. Legal research, finally readable.",
    summary:
      "Legal research has been dense and unforgiving for decades. We redesigned MicroJuris from the ground up — simplifying navigation, restructuring content, and reducing the cognitive load of finding what actually matters.",
    cardTags: "Product Redesign · Legal Tech · UX",
    cardDescription:
      "Legal research has been dense and unforgiving for decades. We redesigned MicroJuris from the ground up — simplifying navigation, restructuring content hierarchies, and reducing the cognitive load of finding what actually matters.",
    gradient: "from-graphite via-iron to-iron-slate",
    meta: {
      industry: "Legal Tech",
      market: "Latin America",
      services: "Research, Product, UX",
    },
    hero: {
      src: placeholder(1600, 900, "MicroJuris — Cover", "1A1C20", "F8F9FB"),
      alt: "MicroJuris product cover",
      width: 1600,
      height: 900,
    },
    blocks: [
      {
        type: "narrative",
        heading: "A tool lawyers already lived in — and still fought with.",
        body: [
          "MicroJuris is the research backbone for thousands of legal professionals. The product worked. The experience did not.",
          "Finding a precedent meant wading through dense hierarchies, inconsistent labeling, and a search that rewarded the people who already knew the system. New users got lost. Experts compensated. Nobody called that a success.",
        ],
      },
      {
        type: "fullBleed",
        image: {
          src: placeholder(1600, 1000, "Research workspace", "2A2D33", "E6E8EC"),
          alt: "Redesigned MicroJuris research workspace",
          width: 1600,
          height: 1000,
          caption: "The research workspace, rebuilt around the query — not the archive.",
        },
      },
      {
        type: "deliverables",
        heading: "Making the complex easy.",
        body: "We kept the depth the product is known for. We removed everything that stood between a question and an answer.",
        items: [
          {
            title: "A search that leads",
            detail:
              "Query first. Filters second. Results ranked by relevance to the matter — not by how the database happens to be stored.",
          },
          {
            title: "A hierarchy you can hold",
            detail:
              "Jurisdictions, sources, and document types recast as a readable map. You always know where you are, and how you got there.",
          },
          {
            title: "Documents built for reading",
            detail:
              "Citations, related authority, and notes sit beside the text instead of interrupting it. The page behaves like a working brief.",
          },
          {
            title: "A system the team can grow",
            detail:
              "Components, patterns, and content rules documented so new collections ship without reinventing the interface.",
          },
        ],
      },
      {
        type: "gallery",
        images: [
          {
            src: placeholder(720, 900, "Search", "523EE7", "F8F9FB"),
            alt: "Search results screen",
            width: 720,
            height: 900,
          },
          {
            src: placeholder(900, 900, "Document", "1A1C20", "F8F9FB"),
            alt: "Document reading view",
            width: 900,
            height: 900,
          },
          {
            src: placeholder(720, 900, "Filters", "595F66", "F8F9FB"),
            alt: "Filter and jurisdiction map",
            width: 720,
            height: 900,
          },
          {
            src: placeholder(1100, 900, "Workspace", "2A2D33", "E6E8EC"),
            alt: "Full research workspace",
            width: 1100,
            height: 900,
          },
        ],
      },
      {
        type: "quote",
        text: "For the first time the product feels like it was designed for how we actually research — not how the archive is organized.",
        attribution: "Camila Reyes",
        role: "Head of Product, MicroJuris",
      },
      {
        type: "split",
        heading: "Research that respects the people doing it.",
        body: [
          "Lawyers do not browse. They hunt. Every extra click is a tax on a billable hour.",
          "We sat with researchers, mapped the real paths they take, and designed for those paths first. The archive is still there. It no longer runs the room.",
        ],
        image: {
          src: placeholder(1200, 1500, "Reading view", "1A0F4D", "F8F9FB"),
          alt: "Document reading view on desktop",
          width: 1200,
          height: 1500,
        },
        imageSide: "right",
      },
    ],
    closing: {
      heading: "A product that earns the next search.",
      body: [
        "The redesign is in market. Search is faster to start. Documents are easier to stay in. The team has a system they can extend without opening a new file from scratch.",
        "Legal research will stay complex. The interface does not have to.",
      ],
    },
  },
  {
    slug: "system-thinking-at-scale",
    client: "System Thinking at Scale",
    headline: "One foundation. Three products. No more drift.",
    summary:
      "Three products. Three brand identities. No shared foundation. We built the system that connected them — tokens, components, and documentation — so the team could ship faster without losing consistency across product lines.",
    cardTags: "Design System · SaaS · Multi-brand",
    cardDescription:
      "Three products. Three brand identities. No shared foundation. We built the system that connected them — tokens, components, and documentation — so the team could ship faster without losing consistency across product lines.",
    gradient: "from-indigo-deep via-interactive to-interactive-hover",
    meta: {
      industry: "SaaS",
      market: "Multi-brand",
      services: "Design Systems, Product",
    },
    hero: {
      src: placeholder(1600, 900, "Design system — Cover", "1A0F4D", "F8F9FB"),
      alt: "Multi-brand design system cover",
      width: 1600,
      height: 900,
    },
    blocks: [
      {
        type: "narrative",
        heading: "Three products. Three dialects. One company.",
        body: [
          "Each product had grown up on its own. Buttons looked related until you put them on the same screen. Tokens lived in Figma, in code, and in someone's memory.",
          "The team was shipping. They were also re-deciding the same problems every sprint. That is not a craft issue. It is a systems issue.",
        ],
      },
      {
        type: "fullBleed",
        image: {
          src: placeholder(1600, 1000, "Token architecture", "311C95", "F8F9FB"),
          alt: "Token and component architecture",
          width: 1600,
          height: 1000,
          caption: "A shared token layer with room for each product to keep its voice.",
        },
      },
      {
        type: "deliverables",
        heading: "A system the products can share without looking identical.",
        body: "The work was not a component library dropped on three codebases. It was a language — with rules for when a product is allowed to speak differently.",
        items: [
          {
            title: "Tokens that travel",
            detail:
              "Color, type, space, and elevation defined once. Product themes sit on top. No hex values hiding in pull requests.",
          },
          {
            title: "Components with a job",
            detail:
              "Each piece documented with purpose, states, and the decision it replaces. If it does not earn a name, it does not ship.",
          },
          {
            title: "Brand without breakage",
            detail:
              "Three identities, one skeleton. The system holds the structure. The brands hold the character.",
          },
          {
            title: "Docs people actually open",
            detail:
              "Usage, do-not, and code examples in the same place the team already works. The file is the source of truth.",
          },
        ],
      },
      {
        type: "gallery",
        images: [
          {
            src: placeholder(800, 1000, "Tokens", "523EE7", "F8F9FB"),
            alt: "Token sheets",
            width: 800,
            height: 1000,
          },
          {
            src: placeholder(800, 1000, "Components", "1A1C20", "F8F9FB"),
            alt: "Component library",
            width: 800,
            height: 1000,
          },
          {
            src: placeholder(1100, 1000, "Themes", "4528CE", "F8F9FB"),
            alt: "Multi-brand themes",
            width: 1100,
            height: 1000,
          },
          {
            src: placeholder(720, 1000, "Docs", "2A2D33", "E6E8EC"),
            alt: "Documentation site",
            width: 720,
            height: 1000,
          },
        ],
      },
      {
        type: "quote",
        text: "We stopped arguing about buttons and started shipping the work the buttons were for.",
        attribution: "Elena Voss",
        role: "VP of Product",
      },
      {
        type: "pair",
        images: [
          {
            src: placeholder(900, 1100, "Product A", "1A0F4D", "F8F9FB"),
            alt: "Product A using the shared system",
            width: 900,
            height: 1100,
          },
          {
            src: placeholder(900, 1100, "Product B", "2A2D33", "E6E8EC"),
            alt: "Product B using the shared system",
            width: 900,
            height: 1100,
          },
        ],
      },
    ],
    closing: {
      heading: "Consistency is a speed advantage.",
      body: [
        "The system is in use across all three products. New screens start from shared pieces. Reviews spend time on the problem, not the padding.",
        "The brands still look like themselves. They no longer invent a new language to do it.",
      ],
    },
  },
  {
    slug: "uva-dispatch-dashboard",
    client: "UVA Dispatch Dashboard",
    headline: "UVA Dispatch. Two users. One system.",
    summary:
      "Two user types. One system that had to serve both. We designed the dispatch dashboard and the delivery flow — connecting restaurant operators and drivers into a shared experience that actually worked end to end.",
    cardTags: "Dashboard · Operations · End-to-end",
    cardDescription:
      "Two user types. One system that had to serve both. We designed the dispatch dashboard and the delivery flow — connecting restaurant operators and drivers into a shared experience that actually worked end to end.",
    gradient: "from-iron-slate via-slate to-steel",
    meta: {
      industry: "Operations",
      market: "Latin America",
      services: "Product, UX, Research",
    },
    hero: {
      src: placeholder(1600, 900, "UVA Dispatch — Cover", "2A2D33", "F8F9FB"),
      alt: "UVA dispatch dashboard cover",
      width: 1600,
      height: 900,
    },
    blocks: [
      {
        type: "narrative",
        heading: "The kitchen and the street were not on the same page.",
        body: [
          "Restaurant operators needed a board they could trust at a glance. Drivers needed a flow that held up on a phone, in traffic, with gloves on.",
          "The old system treated them as the same user. They are not. The work was to design one product with two honest faces.",
        ],
      },
      {
        type: "split",
        heading: "A board that tells you what needs you now.",
        body: [
          "Orders, status, and exceptions sit in a single field of view. Color is a signal, not decoration. The next action is always the largest one.",
          "We designed for the rush, not the demo. If it fails at 8pm on a Friday, it fails.",
        ],
        image: {
          src: placeholder(1400, 1000, "Dispatch board", "1A1C20", "F8F9FB"),
          alt: "Restaurant dispatch board",
          width: 1400,
          height: 1000,
        },
        imageSide: "left",
      },
      {
        type: "deliverables",
        heading: "One operation. Two interfaces.",
        body: "Shared language underneath. Different jobs on the surface.",
        items: [
          {
            title: "Dispatch board",
            detail:
              "Live order states, kitchen timing, and exception handling designed for a counter — not a conference room.",
          },
          {
            title: "Driver flow",
            detail:
              "Pickup, route, and handoff reduced to the few screens a driver can use with one hand.",
          },
          {
            title: "A shared status model",
            detail:
              "Both sides see the same truth. No more calling to ask if the order actually left.",
          },
          {
            title: "Handoff that holds",
            detail:
              "Confirmations, photos, and notes when they earn their place — never as ceremony.",
          },
        ],
      },
      {
        type: "gallery",
        images: [
          {
            src: placeholder(720, 1280, "Driver — Pickup", "1A1C20", "F8F9FB"),
            alt: "Driver pickup screen",
            width: 720,
            height: 1280,
          },
          {
            src: placeholder(720, 1280, "Driver — Route", "523EE7", "F8F9FB"),
            alt: "Driver route screen",
            width: 720,
            height: 1280,
          },
          {
            src: placeholder(720, 1280, "Driver — Handoff", "2A2D33", "E6E8EC"),
            alt: "Driver handoff screen",
            width: 720,
            height: 1280,
          },
          {
            src: placeholder(1100, 1280, "Board detail", "595F66", "F8F9FB"),
            alt: "Dispatch board detail",
            width: 1100,
            height: 1280,
          },
        ],
      },
      {
        type: "quote",
        text: "The board stopped being a monitor and started being a tool. Drivers stopped calling to ask where they stood.",
        attribution: "Mateo Cruz",
        role: "Operations Lead, UVA",
      },
      {
        type: "fullBleed",
        image: {
          src: placeholder(1600, 900, "End-to-end flow", "1A1C20", "F8F9FB"),
          alt: "End-to-end dispatch and delivery flow",
          width: 1600,
          height: 900,
        },
      },
    ],
    closing: {
      heading: "The loop is closed.",
      body: [
        "Operators see the same order the driver is carrying. Drivers see the same clock the kitchen is working against.",
        "That is the whole product. Everything else is in service of it.",
      ],
    },
  },
  {
    slug: "caribbean-cinemas",
    client: "Caribbean Cinemas",
    headline: "Caribbean Cinemas. The night out, from search to seat.",
    summary:
      "Going to the movies should feel like an event. We redesigned the experience from search to seat — removing friction at every decision point and putting the anticipation back into the process.",
    cardTags: "Consumer · Mobile · Experience Design",
    cardDescription:
      "Going to the movies should feel like an event. We redesigned the experience from search to seat — removing friction at every decision point and putting the anticipation back into the process.",
    gradient: "from-[#1a3a4a] via-[#2d6a7a] to-[#7eb8c9]",
    meta: {
      industry: "Entertainment",
      market: "Caribbean",
      services: "Product, Experience Design",
    },
    hero: {
      src: placeholder(1600, 900, "Caribbean Cinemas — Cover", "1a3a4a", "F8F9FB"),
      alt: "Caribbean Cinemas experience cover",
      width: 1600,
      height: 900,
    },
    blocks: [
      {
        type: "narrative",
        heading: "The movie was the easy part. Getting there was not.",
        body: [
          "Showtimes buried. Seats that looked available until they were not. A checkout that asked for the same information twice.",
          "People do not plan a night out to wrestle a form. We treated the path from 'what's on' to 'we're sitting down' as the product.",
        ],
      },
      {
        type: "fullBleed",
        image: {
          src: placeholder(1600, 1000, "Now showing", "1a3a4a", "F8F9FB"),
          alt: "Now showing browse experience",
          width: 1600,
          height: 1000,
          caption: "Browse by film, time, and theater — without starting over at each step.",
        },
      },
      {
        type: "deliverables",
        heading: "Fewer decisions. Better ones.",
        body: "Every screen answers one question. Then it gets out of the way.",
        items: [
          {
            title: "A poster you can act on",
            detail:
              "Artwork, rating, and the next showtime in one tap. No detour through a listing page that repeats itself.",
          },
          {
            title: "Seats that tell the truth",
            detail:
              "The map is the inventory. What you see is what you get — including companion seats and accessible rows.",
          },
          {
            title: "Checkout that remembers you",
            detail:
              "Saved tickets, snacks, and payment for the people who come back every week. Guests still get through in under a minute.",
          },
          {
            title: "A ticket that works at the door",
            detail:
              "QR, showtime, and theater on one screen. Bright enough to scan. Calm enough to screenshot.",
          },
        ],
      },
      {
        type: "gallery",
        images: [
          {
            src: placeholder(720, 1280, "Browse", "1a3a4a", "F8F9FB"),
            alt: "Browse films",
            width: 720,
            height: 1280,
          },
          {
            src: placeholder(720, 1280, "Seats", "2d6a7a", "F8F9FB"),
            alt: "Seat map",
            width: 720,
            height: 1280,
          },
          {
            src: placeholder(720, 1280, "Checkout", "523EE7", "F8F9FB"),
            alt: "Checkout",
            width: 720,
            height: 1280,
          },
          {
            src: placeholder(720, 1280, "Ticket", "1A1C20", "F8F9FB"),
            alt: "Mobile ticket",
            width: 720,
            height: 1280,
          },
        ],
      },
      {
        type: "quote",
        text: "It finally feels like going out — not like administering a night out.",
        attribution: "Daniela Pardo",
        role: "Director of Digital, Caribbean Cinemas",
      },
      {
        type: "pair",
        images: [
          {
            src: placeholder(900, 1200, "Lobby", "1a3a4a", "F8F9FB"),
            alt: "Theater lobby moment",
            width: 900,
            height: 1200,
          },
          {
            src: placeholder(900, 1200, "Seat", "2d6a7a", "F8F9FB"),
            alt: "In-seat experience",
            width: 900,
            height: 1200,
          },
        ],
      },
    ],
    closing: {
      heading: "The lights go down. The work already did.",
      body: [
        "The new flow is live across theaters. Browse, seat, pay, walk in. The night starts earlier now — at the first tap, not at the ticket tear.",
        "That is the standard. Anything less is a queue.",
      ],
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getNextCaseStudy(slug: string): CaseStudy | undefined {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  if (index < 0) return undefined;
  return caseStudies[(index + 1) % caseStudies.length];
}
