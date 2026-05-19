export type BandMember = {
  name: string;
  role: string;
  bioShort: string;
  photo: string;
};

export const members: BandMember[] = [
  {
    name: "Sebastian Gallego",
    role: "Guitar",
    bioShort: "Builds shimmering rhythm layers and jagged harmonic textures.",
    photo: "/images/members/sebastian.jpg",
  },
  {
    name: "Mike Mecham",
    role: "Guitar",
    bioShort: "Carries lead lines that move between folk warmth and post-rock edge.",
    photo: "/images/members/mike.jpg",
  },
  {
    name: "Robby Jarstad",
    role: "Bass",
    bioShort: "Anchors each arrangement with melodic bass movement and grit.",
    photo: "/images/members/robby.jpg",
  },
  {
    name: "Dallin Davis",
    role: "Drums",
    bioShort: "Balances cinematic dynamics with crisp, driving grooves.",
    photo: "/images/members/dallin.jpg",
  },
  {
    name: "Diana Brown",
    role: "Violin",
    bioShort: "Threads emotional counter-melodies through the band soundscape.",
    photo: "/images/members/diana.jpg",
  },
  {
    name: "Stephen Warren",
    role: "Cello",
    bioShort: "Brings depth, tension, and sweeping low-end orchestral color.",
    photo: "/images/members/stephen.jpg",
  },
];
