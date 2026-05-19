export type MusicLink = {
  title: string;
  platform: string;
  href: string;
};

export const featuredVideo = {
  title: "Searching for Celia - Live Session",
  embedUrl: "https://www.youtube.com/embed/UbwDZrrj_-0",
};

export const musicLinks: MusicLink[] = [
  {
    title: "Latest Single",
    platform: "Spotify",
    href: "https://open.spotify.com",
  },
  {
    title: "Live Session",
    platform: "YouTube",
    href: "https://youtube.com",
  },
  {
    title: "Bandcamp Releases",
    platform: "Bandcamp",
    href: "https://bandcamp.com",
  },
];
