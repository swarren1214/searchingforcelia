export type Show = {
  date: string;
  venue: string;
  city: string;
  status: "upcoming" | "past";
  ticketUrl?: string;
};

export const shows: Show[] = [
  {
    date: "2026-07-11",
    venue: "The Basement East",
    city: "Nashville, TN",
    status: "upcoming",
    ticketUrl: "https://example.com/tickets/nashville",
  },
  {
    date: "2026-08-02",
    venue: "Saturn",
    city: "Birmingham, AL",
    status: "upcoming",
    ticketUrl: "https://example.com/tickets/birmingham",
  },
  {
    date: "2026-03-14",
    venue: "Terminal West",
    city: "Atlanta, GA",
    status: "past",
  },
];
