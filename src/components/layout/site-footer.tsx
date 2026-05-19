import { siteConfig } from "@/content/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <p className="text-xs tracking-[0.16em] text-zinc-400 uppercase">
          {siteConfig.bandName}
        </p>
        <div className="flex flex-wrap gap-4">
          {siteConfig.socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              {social.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-zinc-500">
          Booking: <a href={`mailto:${siteConfig.bookingEmail}`}>{siteConfig.bookingEmail}</a>
        </p>
      </div>
    </footer>
  );
}
