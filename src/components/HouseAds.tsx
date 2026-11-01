import Link from "next/link"

/**
 * Our own banner ads, shown in a slot until an advertiser books it. Drawn in
 * CSS (see "House banner ads" in globals.css): a layered 3D stack that slowly
 * turns and floats, a light sweep, rotating messages and a pulsing button.
 * Crisp on every screen, no image weight, and still when the visitor prefers
 * reduced motion.
 */

function Stage({ className, plates = 4 }: { className: string; plates?: number }) {
  return (
    <div className={`hb-stage ${className}`} aria-hidden="true">
      <div className="hb-stack">
        {Array.from({ length: plates }).map((_, i) => (
          <span key={i} className="hb-plate" />
        ))}
      </div>
    </div>
  )
}

function Logo({ className }: { className: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/images/igub-logo-transparent.png" alt="iGamingUbuntu" className={className} width={500} height={206} />
}

export function HouseLeaderboardAd({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Link
        href="/advertise"
        aria-label="Advertise on iGamingUbuntu: banners, sponsored articles and press releases"
        className="hb hb-forest block h-[100px] sm:h-[90px] max-w-[728px] mx-auto"
      >
        <span className="hb-shine" aria-hidden="true" />
        <Stage className="hidden sm:block right-[150px] top-[8px] w-[74px] h-[74px]" />
        <Logo className="absolute left-3 top-3 sm:top-[33px] h-6 w-auto z-[2]" />
        <div className="absolute left-3 sm:left-[92px] right-3 sm:right-[245px] top-[40px] sm:top-[16px] z-[2]">
          <div className="hb-msgs h-[52px]">
            <div className="hb-msg a">
              <p className="hb-serif text-[15px] sm:text-[17px]">Advertise to Africa&apos;s iGaming industry</p>
              <p className="hb-sub text-[11px] sm:text-xs mt-1">Banners · Sponsored articles · Press releases</p>
            </div>
            <div className="hb-msg b">
              <p className="hb-serif text-[15px] sm:text-[17px]">Reach operators, affiliates and regulators</p>
              <p className="hb-sub text-[11px] sm:text-xs mt-1">Premium placements across our news and guides</p>
            </div>
          </div>
        </div>
        <span className="hb-btn absolute right-3 bottom-3 sm:bottom-auto sm:top-[29px] text-[12px] sm:text-[13px] px-3 sm:px-4 py-1.5 z-[2]">
          Advertise with us
        </span>
      </Link>
    </div>
  )
}

export function HouseBoxAd({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Link
        href="/advertise"
        aria-label="Reach operators, affiliates and regulators across Africa: book a placement"
        className="hb hb-noir block w-[300px] max-w-full h-[250px] mx-auto"
      >
        <span className="hb-shine" aria-hidden="true" />
        <Stage className="right-[14px] top-[12px] w-[92px] h-[92px]" />
        <Logo className="absolute left-4 top-4 h-7 w-auto z-[2]" />
        <div className="absolute left-4 right-4 top-[100px] z-[2]">
          <p className="hb-kicker mb-1.5">Advertise</p>
          <p className="hb-serif text-[19px]">Reach operators, affiliates and regulators across Africa</p>
        </div>
        <span className="hb-btn absolute left-4 bottom-4 text-sm px-4 py-2 z-[2]">Book a placement</span>
      </Link>
    </div>
  )
}

export function HouseSideAd({ side, className = "" }: { side: 0 | 1; className?: string }) {
  const left = side === 0
  return (
    <Link
      href="/advertise"
      aria-label={left ? "Advertise on iGamingUbuntu: book this spot" : "Publish your African iGaming press release on iGamingUbuntu"}
      className={`hb ${left ? "hb-forest" : "hb-noir"} block w-[160px] h-[600px] ${className}`}
    >
      <span className="hb-shine" aria-hidden="true" />
      <Logo className="absolute left-4 top-5 h-8 w-auto z-[2]" />
      <Stage className="left-[22px] top-[130px] w-[116px] h-[116px]" />
      <div className="absolute left-4 right-3 top-[330px] z-[2]">
        <p className="hb-kicker mb-2">{left ? "Advertise here" : "Press releases"}</p>
        <p className="hb-serif text-[22px]">
          {left ? "Your brand in front of Africa's iGaming industry" : "Publish your African iGaming news with us"}
        </p>
      </div>
      <span className="hb-btn absolute left-4 bottom-6 text-[13px] px-3 py-2 z-[2]">{left ? "Book this spot" : "Send it to us"}</span>
    </Link>
  )
}
