export type DiscographyTrack = {
  id: string;
  title: string;
  fileName: string;
  durationSeconds: number;
  appleMusicUrl: string;
  spotifyUrl: string;
};

export type Album = {
  title: string;
  year: string;
  artPath: string;
  appleMusicAlbumUrl: string;
  spotifyAlbumUrl: string;
  tracks: DiscographyTrack[];
};

export const whiteFlagAlbum: Album = {
  title: "White Flag",
  year: "2026",
  artPath: "/album_art/white_flag.jpg",
  appleMusicAlbumUrl: "#apple-music-album-placeholder",
  spotifyAlbumUrl: "#spotify-album-placeholder",
  tracks: [
    {
      id: "white-flag",
      title: "White Flag",
      fileName: "White Flag.mp3",
      durationSeconds: 231,
      appleMusicUrl: "#apple-music-track-placeholder",
      spotifyUrl: "#spotify-track-placeholder",
    },
    {
      id: "the-beginning",
      title: "The Beginning",
      fileName: "The Beginning.mp3",
      durationSeconds: 224,
      appleMusicUrl: "#apple-music-track-placeholder",
      spotifyUrl: "#spotify-track-placeholder",
    },
    {
      id: "serendipity-mary-rave",
      title: "Serendipity Mary (Rave)",
      fileName: "Serendipity Mary (Rave).mp3",
      durationSeconds: 328,
      appleMusicUrl: "#apple-music-track-placeholder",
      spotifyUrl: "#spotify-track-placeholder",
    },
    {
      id: "chi-mai",
      title: "Chi-Mai",
      fileName: "Chi-Mai.mp3",
      durationSeconds: 369,
      appleMusicUrl: "#apple-music-track-placeholder",
      spotifyUrl: "#spotify-track-placeholder",
    },
    {
      id: "winters-bridge",
      title: "Winter's Bridge",
      fileName: "Winter's Bridge.mp3",
      durationSeconds: 134,
      appleMusicUrl: "#apple-music-track-placeholder",
      spotifyUrl: "#spotify-track-placeholder",
    },
    {
      id: "sfantul-andrei-scouts",
      title: "Sfântul Andrei (Scouts)",
      fileName: "Sfântul Andrei (Scouts).mp3",
      durationSeconds: 232,
      appleMusicUrl: "#apple-music-track-placeholder",
      spotifyUrl: "#spotify-track-placeholder",
    },
    {
      id: "tragic-tea-party",
      title: "Tragic Tea Party",
      fileName: "Tragic Tea Party.mp3",
      durationSeconds: 312,
      appleMusicUrl: "#apple-music-track-placeholder",
      spotifyUrl: "#spotify-track-placeholder",
    },
    {
      id: "paris-seveille",
      title: "Paris S'eveille",
      fileName: "Paris S'eveille.mp3",
      durationSeconds: 360,
      appleMusicUrl: "#apple-music-track-placeholder",
      spotifyUrl: "#spotify-track-placeholder",
    },
    {
      id: "end-of-the-world",
      title: "End of the World",
      fileName: "End of the World.mp3",
      durationSeconds: 310,
      appleMusicUrl: "#apple-music-track-placeholder",
      spotifyUrl: "#spotify-track-placeholder",
    },
    {
      id: "symphonie",
      title: "Symphonie",
      fileName: "Symphonie.mp3",
      durationSeconds: 233,
      appleMusicUrl: "#apple-music-track-placeholder",
      spotifyUrl: "#spotify-track-placeholder",
    },
  ],
};
