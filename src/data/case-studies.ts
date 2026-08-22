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
    slug: "template",
    client: "Client name",
    headline: "Client name. Headline.",
    summary: "Placeholder summary. A short paragraph about the project.",
    cardTags: "Tag · Tag · Tag",
    cardDescription: "Placeholder description for the work card.",
    gradient: "from-graphite via-iron to-iron-slate",
    meta: {
      industry: "Industry",
      market: "Market",
      services: "Service, Service, Service",
    },
    hero: {
      src: placeholder(1600, 900, "Image", "1A1C20", "F8F9FB"),
      alt: "Placeholder cover",
      width: 1600,
      height: 900,
    },
    blocks: [
      {
        type: "narrative",
        heading: "Section heading.",
        body: [
          "Placeholder body copy. A couple of sentences about the work.",
          "More placeholder body copy.",
        ],
      },
      {
        type: "fullBleed",
        image: {
          src: placeholder(1600, 1000, "Image", "2A2D33", "E6E8EC"),
          alt: "Placeholder image",
          width: 1600,
          height: 1000,
          caption: "Placeholder caption.",
        },
      },
      {
        type: "deliverables",
        heading: "Section heading.",
        body: "Placeholder supporting line.",
        items: [
          {
            title: "Item",
            detail: "Placeholder detail.",
          },
          {
            title: "Item",
            detail: "Placeholder detail.",
          },
          {
            title: "Item",
            detail: "Placeholder detail.",
          },
          {
            title: "Item",
            detail: "Placeholder detail.",
          },
        ],
      },
      {
        type: "gallery",
        images: [
          {
            src: placeholder(720, 900, "Image", "523EE7", "F8F9FB"),
            alt: "Placeholder image",
            width: 720,
            height: 900,
          },
          {
            src: placeholder(900, 900, "Image", "1A1C20", "F8F9FB"),
            alt: "Placeholder image",
            width: 900,
            height: 900,
          },
          {
            src: placeholder(720, 900, "Image", "595F66", "F8F9FB"),
            alt: "Placeholder image",
            width: 720,
            height: 900,
          },
          {
            src: placeholder(1100, 900, "Image", "2A2D33", "E6E8EC"),
            alt: "Placeholder image",
            width: 1100,
            height: 900,
          },
        ],
      },
      {
        type: "quote",
        text: "Placeholder quote.",
        attribution: "Name",
        role: "Role, Company",
      },
      {
        type: "split",
        heading: "Section heading.",
        body: [
          "Placeholder body copy.",
          "More placeholder body copy.",
        ],
        image: {
          src: placeholder(1200, 1500, "Image", "1A0F4D", "F8F9FB"),
          alt: "Placeholder image",
          width: 1200,
          height: 1500,
        },
        imageSide: "right",
      },
      {
        type: "pair",
        images: [
          {
            src: placeholder(900, 1100, "Image", "1A1C20", "F8F9FB"),
            alt: "Placeholder image",
            width: 900,
            height: 1100,
          },
          {
            src: placeholder(900, 1100, "Image", "2A2D33", "E6E8EC"),
            alt: "Placeholder image",
            width: 900,
            height: 1100,
          },
        ],
      },
    ],
    closing: {
      heading: "Section heading.",
      body: [
        "Placeholder closing copy.",
        "More placeholder closing copy.",
      ],
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getNextCaseStudy(slug: string): CaseStudy | undefined {
  if (caseStudies.length < 2) return undefined;
  const index = caseStudies.findIndex((study) => study.slug === slug);
  if (index < 0) return undefined;
  return caseStudies[(index + 1) % caseStudies.length];
}
