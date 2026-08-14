export const FORMSPREE_FORM_ID = "FORM_ID";
export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

export const projectTypes = [
  {
    value: "UX / Product Design",
    title: "UX / Product Design",
    description: "apps, websites, and flows people actually enjoy",
  },
  {
    value: "Design Systems",
    title: "Design Systems",
    description: "foundations that scale without losing their soul",
  },
  {
    value: "Research & Strategy",
    title: "Research & Strategy",
    description: "clarity before craft",
  },
  {
    value: "Something else / not sure",
    title: "Something else / not sure",
  },
] as const;

export const budgetOptions = [
  "Under $5k",
  "$5k – $15k",
  "$15k – $40k",
  "$40k+",
  "I'm not sure yet",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "In the next few months",
  "Just exploring",
] as const;
