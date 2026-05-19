export type MediaManifestEntry = {
  id: string;
  sourcePath: string;
  outputPaths: string[];
  kind: "image" | "video";
  updatedAt: string;
};

export const mediaManifest: MediaManifestEntry[] = [];
