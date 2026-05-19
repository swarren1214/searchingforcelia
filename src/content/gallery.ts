export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/rehearsal-room.jpg",
    alt: "Band rehearsing in a monochrome studio",
    caption: "Rehearsal room sessions.",
  },
  {
    src: "/images/gallery/stage-lights.jpg",
    alt: "Band silhouettes under stage lights",
    caption: "After-dark set in full motion.",
  },
  {
    src: "/images/gallery/cello-closeup.jpg",
    alt: "Close-up of cello during a live performance",
    caption: "Strings and static.",
  },
];
