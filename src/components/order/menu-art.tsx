import type { MenuItem } from "@/features/menu/data";
import { cn } from "@/lib/utils";

const tones: Record<NonNullable<MenuItem["art"]>, string> = {
  zobo: "from-[#5b1720] via-[#8d2431] to-[#d9522c]",
  chapman: "from-[#7a2118] via-[#c24a2d] to-[#e8914f]",
  coconut: "from-[#1b4435] via-[#2f6b51] to-[#8aa07a]",
  tonic: "from-[#2c1d14] via-[#5a3a25] to-[#b68a58]",
  cheesecake: "from-[#7a5b2f] via-[#b98e4d] to-[#efc75e]",
  tart: "from-[#2a1a16] via-[#4a2a21] to-[#8a4b33]",
};

export function MenuArt({
  art,
  className,
}: {
  art: NonNullable<MenuItem["art"]>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br",
        tones[art],
        className,
      )}
    >
      <div className="dot-field absolute inset-0 opacity-30" />
      <svg
        viewBox="0 0 200 160"
        className="relative h-[86%] w-[86%]"
        fill="none"
        aria-hidden="true"
      >
        {art === "zobo" && (
          <>
            <path
              d="M72 36h56l-6 88c-.4 5.2-4.8 9-10 9h-24c-5.2 0-9.6-3.8-10-9l-6-88Z"
              fill="#F8E8DA"
              fillOpacity="0.16"
              stroke="#FFF0DE"
              strokeWidth="1.4"
            />
            <path d="M76 58h48l-4 62c-.2 3-2.7 5.4-5.8 5.4H85.8c-3.1 0-5.6-2.4-5.8-5.4L76 58Z" fill="#C63C3C" fillOpacity="0.85" />
            <rect x="86" y="64" width="17" height="15" rx="3" fill="#FFF0DE" fillOpacity="0.32" transform="rotate(-12 86 64)" />
            <rect x="105" y="80" width="15" height="13" rx="3" fill="#FFF0DE" fillOpacity="0.25" transform="rotate(9 105 80)" />
            <circle cx="96" cy="52" r="9" fill="#EFC75E" fillOpacity="0.9" />
            <path d="M96 52 109 41" stroke="#FFF0DE" strokeWidth="1.4" />
            <path d="M74 110h52" stroke="#FFF0DE" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 4" />
          </>
        )}

        {art === "chapman" && (
          <>
            <path
              d="M64 34h72l-30 54v34h14v4H80v-4h14V88L64 34Z"
              fill="#F8E8DA"
              fillOpacity="0.14"
              stroke="#FFF0DE"
              strokeWidth="1.4"
            />
            <path d="M74 44h52l-23 42v9H97v-9L74 44Z" fill="#D9522C" fillOpacity="0.85" />
            <circle cx="86" cy="56" r="7" fill="#EFC75E" fillOpacity="0.9" />
            <circle cx="104" cy="51" r="5" fill="#F8E8DA" fillOpacity="0.55" />
            <path d="M112 36l10-12" stroke="#FFF0DE" strokeWidth="1.4" />
            <circle cx="122" cy="23" r="2.5" fill="#EFC75E" />
          </>
        )}

        {art === "coconut" && (
          <>
            <circle cx="100" cy="90" r="44" fill="#F8E8DA" fillOpacity="0.18" stroke="#FFF0DE" strokeWidth="1.5" />
            <path d="M64 78c10 12 62 12 72 0" stroke="#FFF0DE" strokeOpacity="0.5" strokeWidth="1.2" />
            <circle cx="88" cy="86" r="3" fill="#FFF0DE" fillOpacity="0.6" />
            <circle cx="104" cy="94" r="3" fill="#FFF0DE" fillOpacity="0.6" />
            <path d="M112 47 129 22" stroke="#EFC75E" strokeWidth="5" strokeLinecap="round" />
            <path d="M118 40 135 20" stroke="#FFF0DE" strokeWidth="1.6" />
          </>
        )}

        {art === "tonic" && (
          <>
            <path
              d="M66 54h68l-5 76c-.3 4.6-4 8-8.6 8H79.6c-4.6 0-8.3-3.4-8.6-8l-5-76Z"
              fill="#F8E8DA"
              fillOpacity="0.12"
              stroke="#FFF0DE"
              strokeWidth="1.4"
            />
            <path d="M71 86h58l-4 44c-.2 3-2.7 5-5.7 5H80.7c-3 0-5.5-2-5.7-5l-4-44Z" fill="#3B2419" />
            <path d="M72 60h56l-1 24H73l-1-24Z" fill="#F8E8DA" fillOpacity="0.28" />
            <circle cx="88" cy="98" r="6" fill="#FFF0DE" fillOpacity="0.24" />
            <circle cx="108" cy="112" r="5" fill="#FFF0DE" fillOpacity="0.2" />
            <path d="M100 40c0-8 10-8 10-16" stroke="#FFF0DE" strokeOpacity="0.4" strokeWidth="1.4" />
          </>
        )}

        {art === "cheesecake" && (
          <>
            <path d="M52 112 100 44l48 68H52Z" fill="#F8E8DA" fillOpacity="0.14" stroke="#FFF0DE" strokeWidth="1.4" />
            <path d="M60 108 100 56l40 52H60Z" fill="#EFC75E" fillOpacity="0.9" />
            <path d="M60 108h80v6H60z" fill="#8A5A23" />
            <path d="M100 56v52" stroke="#FFF0DE" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 4" />
            <path d="M92 50c4-8 12-8 16-2" stroke="#FFF0DE" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
          </>
        )}

        {art === "tart" && (
          <>
            <ellipse cx="100" cy="98" rx="50" ry="28" fill="#F8E8DA" fillOpacity="0.12" stroke="#FFF0DE" strokeWidth="1.4" />
            <ellipse cx="100" cy="94" rx="38" ry="20" fill="#2E1A15" />
            <ellipse cx="100" cy="91" rx="34" ry="17" fill="#5C3325" />
            <path d="M78 88c8-6 28-8 42-2" stroke="#FFF0DE" strokeOpacity="0.25" strokeWidth="1.2" />
            <circle cx="114" cy="80" r="4" fill="#EFC75E" fillOpacity="0.8" />
            <path d="M84 76l-8-12M120 72l8-10" stroke="#FFF0DE" strokeOpacity="0.35" strokeWidth="1.2" />
          </>
        )}
      </svg>
      <span className="absolute bottom-2 right-3 font-mono text-[7px] uppercase tracking-[0.14em] text-cream/35">
        House made
      </span>
    </div>
  );
}
