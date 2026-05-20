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
    photo: "/photos/profile_photos/Sebastian.jpg",
  },
  {
    name: "Mike Mecham",
    role: "Guitar",
    bioShort: "Carries lead lines that move between folk warmth and post-rock edge.",
    photo: "/photos/profile_photos/Mike.jpg",
  },
  {
    name: "Robby Jarstad",
    role: "Bass",
    bioShort: "Anchors each arrangement with melodic bass movement and grit.",
    photo: "/photos/profile_photos/Robby.jpg",
  },
  {
    name: "Dallin Davis",
    role: "Drums",
    bioShort: "Balances cinematic dynamics with crisp, driving grooves.",
    photo: "/photos/profile_photos/Dallin.jpg",
  },
  {
    name: "Diana Brown",
    role: "Violin",
    bioShort: "Threads emotional counter-melodies through the band soundscape.",
    photo: "/photos/profile_photos/Diana.jpg",
  },
  {
    name: "Stephen Warren",
    role: "Cello",
    bioShort: "Brings depth, tension, and sweeping low-end orchestral color.",
    photo: "/photos/profile_photos/Steve.jpg",
  },
];
