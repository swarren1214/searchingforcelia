import Image from "next/image";

type MemberAvatarPlaceholderProps = {
  name: string;
  role: string;
  photo?: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function MemberAvatarPlaceholder({ name, role, photo }: MemberAvatarPlaceholderProps) {
  const initials = getInitials(name);

  return (
    <div className="relative h-24 w-24">
      <div className="avatar-halo" aria-hidden />
      <div className="avatar-frame">
        {photo ? (
          <Image
            src={photo}
            alt={`${name} headshot`}
            fill
            sizes="96px"
            className="relative z-10 object-cover"
          />
        ) : (
          <>
            <div className="avatar-pattern" aria-hidden />
            <div className="relative z-10 flex h-full w-full items-center justify-center">
              <span className="font-display text-3xl text-zinc-100">{initials}</span>
            </div>
          </>
        )}
      </div>
      <span className="sr-only">
        {photo ? `${name} headshot` : `Placeholder avatar for ${name}, ${role}`}
      </span>
    </div>
  );
}
