"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Disc3Icon, PauseIcon, PlayIcon } from "lucide-react";
import { SiApplemusic, SiSpotify } from "react-icons/si";
import { useEffect, useRef, useState } from "react";

import { whiteFlagAlbum } from "@/content/discography";
import { cn, withBasePath } from "@/lib/utils";

type PlaybackState = {
  trackId: string | null;
  elapsedMilliseconds: number;
  isPlaying: boolean;
};

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function formatPreviewTime(totalMilliseconds: number) {
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function previewPath(fileName: string) {
  return withBasePath(`/tracks/white_flag/${encodeURIComponent(fileName)}`);
}

export function DiscographySection() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [playback, setPlayback] = useState<PlaybackState>({
    trackId: null,
    elapsedMilliseconds: 0,
    isPlaying: false,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, []);

  const stopPreview = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    audio.pause();
    audio.currentTime = 0;

    setPlayback((prev) => ({
      ...prev,
      elapsedMilliseconds: 0,
      isPlaying: false,
    }));
  };

  const playTrackPreview = async (trackId: string, fileName: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playback.trackId === trackId && playback.isPlaying) {
      stopPreview();
      return;
    }

    const src = previewPath(fileName);
    if (audio.src !== new URL(src, window.location.origin).href) {
      audio.src = src;
    }

    audio.currentTime = 0;

    try {
      await audio.play();
      setPlayback({
        trackId,
        elapsedMilliseconds: 0,
        isPlaying: true,
      });
    } catch {
      setPlayback({
        trackId,
        elapsedMilliseconds: 0,
        isPlaying: false,
      });
    }
  };

  useEffect(() => {
    if (!playback.isPlaying || !playback.trackId) {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const updatePreviewProgress = () => {
      const audio = audioRef.current;
      if (!audio) return;

      const elapsedMilliseconds = Math.min(audio.currentTime * 1000, 30000);
      setPlayback((prev) => ({ ...prev, elapsedMilliseconds }));

      if (elapsedMilliseconds >= 30000) {
        stopPreview();
        return;
      }

      animationFrameRef.current = requestAnimationFrame(updatePreviewProgress);
    };

    animationFrameRef.current = requestAnimationFrame(updatePreviewProgress);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [playback.isPlaying, playback.trackId]);

  const handleEnded = () => {
    setPlayback((prev) => ({ ...prev, elapsedMilliseconds: 0, isPlaying: false }));
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-zinc-500 uppercase">Discography</p>
          <h3 className="font-display text-4xl text-zinc-100 sm:text-5xl">{whiteFlagAlbum.title}</h3>
        </div>
        <div className="flex items-center gap-2 text-xs tracking-[0.14em] text-zinc-400 uppercase">
          <span>{whiteFlagAlbum.year}</span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span>{whiteFlagAlbum.tracks.length} tracks</span>
        </div>
      </div>

      <div className="discography-shell rounded-3xl p-4 sm:p-6 lg:p-8">
        <div className="discography-stage mx-auto max-w-5xl">
          <motion.div
            className="discography-card"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="discography-face discography-front"
              onClick={() => setIsFlipped(true)}
              aria-label="Flip White Flag album to show track list"
            >
              <motion.div
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-5"
              >
                <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-2xl border border-zinc-700/80 shadow-[0_40px_70px_-30px_rgba(255,255,255,0.22)]">
                  <Image
                    src={withBasePath(whiteFlagAlbum.artPath)}
                    alt={`${whiteFlagAlbum.title} album art`}
                    fill
                    sizes="(max-width: 1024px) 80vw, 420px"
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="space-y-3 text-center">
                  <p className="text-xs tracking-[0.25em] text-zinc-500 uppercase">Tap To Flip</p>
                  <h4 className="font-display text-4xl text-zinc-100 sm:text-5xl">{whiteFlagAlbum.title}</h4>
                  <p className="mx-auto max-w-xl text-sm text-zinc-300 sm:text-base">
                    A cinematic debut from Searching for Celia. Flip the cover to preview tracks.
                  </p>
                </div>
              </motion.div>
            </button>

            <div className="discography-face discography-back">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.25em] text-zinc-500 uppercase">Track List</p>
                  <h4 className="font-display text-3xl text-zinc-100 sm:text-4xl">{whiteFlagAlbum.title}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    stopPreview();
                    setIsFlipped(false);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-xs tracking-[0.15em] text-zinc-200 uppercase transition hover:border-zinc-500 hover:text-white"
                >
                  <Disc3Icon className="h-3.5 w-3.5" aria-hidden />
                  Back To Cover
                </button>
              </div>

              <motion.ul
                className="mt-6 space-y-2"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
                }}
              >
                {whiteFlagAlbum.tracks.map((track) => {
                  const isTrackActive = playback.trackId === track.id;

                  return (
                    <motion.li
                      key={track.id}
                      variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                    >
                      <div
                        className={cn(
                          "rounded-xl border bg-zinc-950/50 p-3 transition",
                          isTrackActive ? "border-zinc-400/70" : "border-zinc-800 hover:border-zinc-700"
                        )}
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => playTrackPreview(track.id, track.fileName)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-100 transition hover:border-zinc-500"
                            aria-label={`Play 30 second preview of ${track.title}`}
                          >
                            {isTrackActive && playback.isPlaying ? (
                              <PauseIcon className="h-4 w-4" />
                            ) : (
                              <PlayIcon className="h-4 w-4" />
                            )}
                          </button>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-zinc-100">{track.title}</p>
                            <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                              <span>{formatDuration(track.durationSeconds)}</span>
                              <span className="h-1 w-1 rounded-full bg-zinc-600" />
                              <span>{isTrackActive ? formatPreviewTime(playback.elapsedMilliseconds) : "0:00"}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={track.appleMusicUrl}
                              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 px-3 py-1 text-[11px] tracking-[0.12em] text-zinc-200 uppercase hover:border-zinc-600"
                            >
                              <SiApplemusic className="h-3 w-3" aria-hidden />
                              Apple
                            </a>
                            <a
                              href={track.spotifyUrl}
                              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 px-3 py-1 text-[11px] tracking-[0.12em] text-zinc-200 uppercase hover:border-zinc-600"
                            >
                              <SiSpotify className="h-3 w-3" aria-hidden />
                              Spotify
                            </a>
                          </div>
                        </div>

                        <AnimatePresence>
                          {isTrackActive ? (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="mt-3 h-1 w-full overflow-hidden rounded-full bg-zinc-800"
                            >
                              <motion.div
                                className="h-full bg-zinc-200"
                                  style={{ width: `${(Math.min(playback.elapsedMilliseconds, 30000) / 30000) * 100}%` }}
                              />
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={whiteFlagAlbum.appleMusicAlbumUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-xs tracking-[0.14em] text-zinc-200 uppercase transition hover:border-zinc-500"
                >
                  <SiApplemusic className="h-3.5 w-3.5" aria-hidden />
                  Listen On Apple Music
                </a>
                <a
                  href={whiteFlagAlbum.spotifyAlbumUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-xs tracking-[0.14em] text-zinc-200 uppercase transition hover:border-zinc-500"
                >
                  <SiSpotify className="h-3.5 w-3.5" aria-hidden />
                  Listen On Spotify
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <audio
        ref={audioRef}
        preload="metadata"
        onPause={() => setPlayback((prev) => ({ ...prev, isPlaying: false }))}
        onPlay={() => setPlayback((prev) => ({ ...prev, isPlaying: true }))}
        onEnded={handleEnded}
      />
    </section>
  );
}
