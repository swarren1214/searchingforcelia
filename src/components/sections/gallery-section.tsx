"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { galleryPhotos } from "@/content/gallery";
import { cn } from "@/lib/utils";

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activePhoto = galleryPhotos[activeIndex];

  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < galleryPhotos.length - 1;

  const visiblePhotos = useMemo(() => galleryPhotos, []);

  const selectPhoto = (index: number) => {
    setActiveIndex(index);
  };

  const goPrevious = () => {
    setActiveIndex((current) => Math.max(0, current - 1));
  };

  const goNext = () => {
    setActiveIndex((current) => Math.min(galleryPhotos.length - 1, current + 1));
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-zinc-500 uppercase">Gallery</p>
          <h2 className="font-display text-4xl text-white sm:text-5xl">Visuals</h2>
        </div>
        <p className="text-xs tracking-[0.2em] text-zinc-500 uppercase">Photos from the archive</p>
      </div>

      <div className="gallery-shell rounded-[2rem] p-4 sm:p-6 lg:p-8">
        <div className="relative overflow-hidden rounded-[1.65rem] border border-zinc-700/80 bg-black/70 shadow-[0_30px_90px_-35px_rgba(255,255,255,0.28)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhoto.src}
              initial={{ opacity: 0, scale: 0.985, y: 12, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.985, y: -10, filter: "blur(8px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[480px] w-full sm:h-[560px]"
            >
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.7),transparent_42%,rgba(0,0,0,0.15))]" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
            <div className="max-w-[70%] rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-md">
              <p className="text-xs tracking-[0.2em] text-zinc-400 uppercase">Featured Image</p>
              <p className="mt-1 text-sm text-zinc-200">{activeIndex + 1} of {galleryPhotos.length}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrevious}
                disabled={!canGoPrevious}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition",
                  canGoPrevious ? "hover:border-white/35 hover:bg-black/55" : "cursor-not-allowed opacity-35"
                )}
                aria-label="Previous photo"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!canGoNext}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition",
                  canGoNext ? "hover:border-white/35 hover:bg-black/55" : "cursor-not-allowed opacity-35"
                )}
                aria-label="Next photo"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-[1.35rem] border border-zinc-700/80 bg-black/30 p-3 backdrop-blur-md sm:p-4">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {visiblePhotos.map((photo, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => selectPhoto(index)}
                  className={cn(
                    "group relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border transition sm:h-24 sm:w-36",
                    isActive
                      ? "border-white/70 shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_12px_30px_-18px_rgba(255,255,255,0.5)]"
                      : "border-white/10 opacity-65 hover:border-white/30 hover:opacity-100"
                  )}
                  aria-label={`Select photo ${index + 1}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="140px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-black/10 transition",
                      isActive ? "bg-black/0" : "group-hover:bg-black/5"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
