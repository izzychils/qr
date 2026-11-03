import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/features/dashboard/data";

export function Proof() {
  return (
    <section className="border-y border-line bg-cream py-14 sm:py-20">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-muted">From the rooms</p>
              <h2 className="mt-4 max-w-[620px] font-serif text-[clamp(2.2rem,4.4vw,3.7rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-forest">
                The quieter service is the point.
              </h2>
            </div>
            <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-muted/55">
              Demo stories / illustrative
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-3 lg:grid-cols-3">
          {testimonials.map((story, index) => (
            <Reveal key={story.name} delay={index * 70}>
              <figure className="flex h-full flex-col rounded-[12px] border border-line bg-sand/45 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5 text-tomato">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} className="h-2.5 w-2.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-mono text-[6.5px] uppercase tracking-[0.08em] text-muted/45">
                    Verified visit
                  </span>
                </div>
                <blockquote className="mt-4 font-serif text-[19px] font-medium leading-[1.3] tracking-[-0.02em] text-forest">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-2.5 border-t border-line pt-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest font-mono text-[8px] text-cream">
                    {story.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block text-[11.5px] font-semibold text-forest">{story.name}</span>
                    <span className="mt-0.5 block font-mono text-[6.5px] uppercase tracking-[0.05em] text-muted/65">
                      {story.role} / {story.location}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
