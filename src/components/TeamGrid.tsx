import { TEAM } from "@/lib/team"

/**
 * Meet the team: a circular portrait sitting over a dark card, one per person.
 * Driven entirely by TEAM, so adding a colleague needs no change here.
 */
export default function TeamGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-20 pt-16">
      {TEAM.map((member) => (
        <article
          key={member.slug}
          className="relative rounded-2xl rounded-br-[64px] bg-brand-ink text-white px-6 pb-8 pt-20 shadow-xl shadow-brand-deep/20"
        >
          <div className="absolute -top-14 left-1/2 -translate-x-1/2">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-brand-lime bg-brand-deep shadow-lg">
              <img
                src={member.photo}
                alt={`${member.name}, ${member.role} at iGamingUbuntu`}
                width={224}
                height={224}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h3 className="text-center text-lg font-bold tracking-tight">{member.name}</h3>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand-lime mt-1">
            {member.role}
          </p>

          <p className="text-sm text-white/75 leading-relaxed mt-4">{member.bio}</p>

          {member.links && member.links.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {member.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-lime/10 text-brand-lime hover:bg-brand-lime/20 transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  )
}
