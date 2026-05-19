import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnimatedSection } from "@/components/sections/animated-section";
import { MemberAvatarPlaceholder } from "@/components/sections/member-avatar-placeholder";
import { galleryImages } from "@/content/gallery";
import { members } from "@/content/members";
import { featuredVideo, musicLinks } from "@/content/music";
import { shows } from "@/content/shows";
import { siteConfig } from "@/content/site-config";

export default function Home() {
  const upcomingShows = shows.filter((show) => show.status === "upcoming");
  const waveformBars = Array.from({ length: 120 }, (_, index) => {
    const noiseA = Math.abs(Math.sin((index + 3) * 17.31));
    const noiseB = Math.abs(Math.sin((index + 7) * 5.91));
    const noiseC = Math.abs(Math.sin((index + 11) * 9.17));

    return {
      key: `wave-${index}`,
      delay: `${(index % 18) * 0.07}s`,
      duration: `${2 + noiseA * 2.8}s`,
      pulseDuration: `${0.7 + noiseB * 1.6}s`,
      min: (0.04 + noiseB * 0.2).toFixed(3),
      max: (0.95 + noiseA * 1.15).toFixed(3),
      glow: (0.45 + noiseC * 0.55).toFixed(3),
    };
  });

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 pb-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="waveform-backdrop">
          <div className="waveform-track">
            {waveformBars.map((bar) => (
              <span
                key={bar.key}
                className="waveform-bar"
                style={{
                  animationDelay: `${bar.delay}, ${bar.delay}`,
                  animationDuration: `${bar.duration}, ${bar.pulseDuration}`,
                  ["--wave-min" as string]: bar.min,
                  ["--wave-max" as string]: bar.max,
                  ["--wave-glow" as string]: bar.glow,
                }}
              />
            ))}
          </div>
        </div>
        <div className="waveform-vignette" />
      </div>

      <AnimatedSection className="relative pt-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_65%)]" />
        <div className="glass-panel mx-auto flex max-w-5xl flex-col items-center space-y-7 rounded-2xl p-10 text-center sm:p-14">
          <Badge className="rounded-full border-zinc-300/30 bg-white/10 px-4 py-1 text-zinc-100 uppercase">
            {siteConfig.location}
          </Badge>
          <h1 className="font-display text-6xl leading-none tracking-tight text-white sm:text-8xl lg:text-9xl">
            {siteConfig.bandName}
          </h1>
          <p className="max-w-2xl text-xl text-zinc-300 sm:text-2xl">{siteConfig.tagline}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#shows"
              className="inline-flex items-center rounded-md bg-white px-6 py-3 text-sm font-semibold tracking-wide text-black transition hover:bg-zinc-200"
            >
              See Upcoming Shows
            </a>
            <a
              href="#music"
              className="inline-flex items-center rounded-md border border-zinc-700 px-6 py-3 text-sm font-semibold tracking-wide text-zinc-200 transition hover:border-zinc-500 hover:text-white"
            >
              Listen Now
            </a>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="about" className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div className="space-y-4 rounded-2xl border border-zinc-800/70 bg-zinc-950/45 p-7 backdrop-blur-md">
          <p className="text-xs tracking-[0.2em] text-zinc-500 uppercase">About</p>
          <h2 className="font-display text-4xl text-white sm:text-5xl">Six players, one pulse.</h2>
          <p className="max-w-2xl text-zinc-300">
            Searching for Celia blends two guitars, bass, drums, violin, and cello into songs that feel
            both intimate and cinematic. This first build includes the full content model, animation
            framework, and media optimization workflow so the site can grow quickly.
          </p>
        </div>
        <div className="glass-panel rounded-xl p-6 text-sm text-zinc-300">
          Next milestone: add your finalized bios, press photos, and live show links.
        </div>
      </AnimatedSection>

      <AnimatedSection id="members" className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl text-white sm:text-5xl">Members</h2>
          <p className="text-xs tracking-[0.2em] text-zinc-500 uppercase">Core lineup</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <Card key={member.name} className="glass-panel border-zinc-800/80 bg-zinc-950/45 backdrop-blur-md">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-4">
                <MemberAvatarPlaceholder name={member.name} role={member.role} />
                  <div className="space-y-1">
                    <CardTitle className="font-display text-3xl text-zinc-100">{member.name}</CardTitle>
                    <p className="text-xs tracking-[0.2em] text-zinc-500 uppercase">{member.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-300">{member.bioShort}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection id="music" className="space-y-6">
        <h2 className="font-display text-4xl text-white sm:text-5xl">Music</h2>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-panel overflow-hidden rounded-xl border-zinc-800/80 bg-black/50 backdrop-blur-md">
            <iframe
              src={featuredVideo.embedUrl}
              title={featuredVideo.title}
              className="aspect-video w-full"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <Card className="glass-panel border-zinc-800/80 bg-zinc-950/45 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="font-display text-3xl text-zinc-100">Platforms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {musicLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-md border border-zinc-800/80 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
                >
                  <span>{link.title}</span>
                  <span className="text-zinc-500">{link.platform}</span>
                </a>
              ))}
            </CardContent>
          </Card>
        </div>
      </AnimatedSection>

      <AnimatedSection id="shows" className="space-y-6">
        <h2 className="font-display text-4xl text-white sm:text-5xl">Shows</h2>
        <Card className="glass-panel border-zinc-800/80 bg-zinc-950/45 backdrop-blur-md">
          <CardContent className="space-y-5 pt-6">
            {upcomingShows.map((show, index) => (
              <div key={`${show.venue}-${show.date}`} className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-base text-zinc-100">
                    {new Date(show.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-zinc-400">{show.city}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-medium text-zinc-200">{show.venue}</p>
                  {show.ticketUrl ? (
                    <a
                      href={show.ticketUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-white underline-offset-4 hover:underline"
                    >
                      Tickets
                    </a>
                  ) : null}
                </div>
                {index < upcomingShows.length - 1 ? <Separator className="bg-zinc-800" /> : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </AnimatedSection>

      <AnimatedSection id="gallery" className="space-y-6">
        <h2 className="font-display text-4xl text-white sm:text-5xl">Gallery</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image) => (
            <Card key={image.src} className="glass-panel border-zinc-800/80 bg-zinc-950/45 backdrop-blur-md">
              <CardContent className="space-y-3 pt-6">
                <div className="media-placeholder aspect-4/3 rounded-md border border-zinc-800/80 bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
                <p className="text-sm text-zinc-300">{image.caption}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection id="contact" className="space-y-4 pb-8">
        <h2 className="font-display text-4xl text-white sm:text-5xl">Contact</h2>
        <p className="glass-panel inline-block rounded-xl px-5 py-3 text-zinc-300">
          Booking and inquiries: <a className="text-zinc-100 underline-offset-4 hover:underline" href={`mailto:${siteConfig.bookingEmail}`}>{siteConfig.bookingEmail}</a>
        </p>
      </AnimatedSection>
    </div>
  );
}
