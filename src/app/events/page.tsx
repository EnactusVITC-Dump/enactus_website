"use client"



const events = [
  { date: "Mar 2025", title: "Enactus National Competition", description: "Competed against 50+ teams from across India, presenting our social enterprise projects.", status: "upcoming" },
  { date: "Jan 2025", title: "Project Saksham Launch", description: "Launched our flagship women's entrepreneurship program in partnership with local NGOs.", status: "past" },
  { date: "Nov 2024", title: "Social Innovation Hackathon", description: "48-hour hackathon bringing together 200+ students to solve community challenges.", status: "past" },
  { date: "Sep 2024", title: "Orientation & Recruitment", description: "Welcomed 80+ new members to the Enactus VIT Chennai family.", status: "past" },
  { date: "Jul 2024", title: "Enactus World Cup", description: "Represented India at the Enactus World Cup, competing with 36 countries.", status: "past" },
]

export default function EventsPage() {
  return (
    <>
      <section className="pt-32 pb-12 md:pb-16 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="font-bebas text-enactus-white mb-4" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
            <span className="text-gold">EVENTS</span> & TIMELINE
          </h1>
          <p className="font-dm-sans text-[rgba(240,236,228,0.5)] text-lg max-w-xl mb-16">
            A journey through our milestones, competitions, and community events.
          </p>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-[rgba(245,200,66,0.15)]" />

            {events.map((event, i) => (
              <div key={i} className="relative pl-14 md:pl-24 pb-16 last:pb-0 group" data-cursor-hover>
                {/* Dot */}
                <div className={`absolute left-[11px] md:left-[27px] top-1 w-3 h-3 rounded-full border-2 ${event.status === "upcoming"
                  ? "bg-gold border-gold"
                  : "bg-transparent border-[rgba(245,200,66,0.4)] group-hover:bg-gold group-hover:border-gold"
                  } transition-all duration-300`} />

                {/* Date */}
                <span className="font-syne text-[11px] font-bold uppercase tracking-[2px] text-[rgba(240,236,228,0.3)] block mb-2">
                  {event.date}
                  {event.status === "upcoming" && (
                    <span className="ml-3 px-2 py-0.5 bg-[rgba(245,200,66,0.15)] text-gold text-[9px] tracking-[1px]">
                      UPCOMING
                    </span>
                  )}
                </span>

                {/* Title */}
                <h3 className="font-bebas text-[28px] md:text-[36px] text-enactus-white group-hover:text-gold transition-colors duration-300">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="font-dm-sans text-[14px] text-[rgba(240,236,228,0.4)] leading-[1.8] mt-2 max-w-lg">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
