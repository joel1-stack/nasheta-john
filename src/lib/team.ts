/**
 * The newsroom. One entry per person.
 *
 * This is the single source of truth for who writes here: the team page
 * renders it, and article pages resolve an author's photo and bio from it by
 * name. Before this existed every article fell back to the founder's photo,
 * so a second writer's byline carried the wrong face, in the visible byline
 * and in the Person schema.
 *
 * To add someone: append an object. Drop their portrait in
 * /public/images/team, square and at least 480px.
 */
export interface TeamMember {
  slug: string
  name: string
  role: string
  photo: string
  /** Written in the first person; shown on the team page. */
  bio: string
  /** Short version for the byline box under an article. */
  shortBio: string
  links?: { label: string; href: string }[]
}

export const TEAM: TeamMember[] = [
  {
    slug: "nasheta-john",
    name: "Nasheta John",
    role: "Founder and Editor",
    photo: "/images/nasheta-john-author.png",
    bio:
      "I build the thing, then I write about it. Project manager, software developer, and since 2016 a reporter on African betting markets. The habit is the same in all three: open the document everybody skipped, and find the line that changes what the story actually means. Most of what we publish starts as a gazette nobody read.",
    shortBio:
      "Founder and editor. Covering African betting regulation since 2016, from the gazettes and regulator notices directly.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/nashetajohnigaming/" },
      { label: "X", href: "https://x.com/SalvageNasheta" },
    ],
  },
  {
    slug: "kitty-lilly",
    name: "Kitty Lilly",
    role: "SEO and Growth Lead",
    photo: "/images/team/kitty-lilly.jpg",
    bio:
      "I crack SEO open and work out why one page wins while a better one loses. Keywords, structure, the markup nobody bothers to read: I go after the small details that move us up the page while everyone else is still guessing. If a competitor is ranking above us, I want to know exactly which line of their page is doing it.",
    shortBio:
      "SEO and growth lead. Works on search, structure and the markup that gets our reporting cited.",
  },
]

function normalise(value?: string): string {
  return (value || "").trim().toLowerCase().replace(/\s+/g, " ")
}

/** Resolve a CMS byline to a team member, so the right face is shown. */
export function findTeamMember(name?: string): TeamMember | undefined {
  const target = normalise(name)
  if (!target) return undefined
  return TEAM.find(
    (m) => normalise(m.name) === target || m.slug === target.replace(/\s+/g, "-"),
  )
}

/** The founder, used when an article carries no usable byline at all. */
export const DEFAULT_MEMBER = TEAM[0]
