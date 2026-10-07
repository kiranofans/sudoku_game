import { useEffect, useCallback } from "react";
import type { MouseEvent, RefObject } from "react";
// import React, { useState, useRef, ReactNode } from "react";

type Section = {
    id: string;
};

type SectionRefs = Record<string, HTMLElement | null>;

/**
 * Custom hook to manage page-level navigation, smooth scrolling to targeted sections, 
 * and IntersectionObserver-based scroll-spy highlighting for active sections.
 */
export function useSectionNavigation(
    sections: Section[],
    sectionRefs: RefObject<SectionRefs | null>,
    activeSlug: string,
    setActiveSlug: (slug: string) => void
) {
    // Scroll-spy: track which section is currently in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSlug(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-120px 0px -60% 0px",
                threshold: 0,
            }
        );
        // Register each mapped section element with the IntersectionObserver
        sections.forEach((section) => {
            const el = sectionRefs.current?.[section.id];

            if (el) {
                observer.observe(el);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [sections, sectionRefs, setActiveSlug]);

    // Handle navigation click + smooth scroll
    const handleNavClick = useCallback(
        (e: MouseEvent<HTMLAnchorElement>, slug: string) => {
            e.preventDefault();

            setActiveSlug(slug);

            const el =
                sectionRefs.current?.[slug] ??
                document.getElementById(slug);

            if (!el) return;

            const headerHeight = parseInt(
                getComputedStyle(document.documentElement)
                    .getPropertyValue("--header-inner-height") || "50",
                10
            );

            const navHeight = 50;
            const wrapper = document.querySelector<HTMLElement>(".wrapper");

            if (wrapper) {
                const wrapperTop = wrapper.getBoundingClientRect().top;
                const elTop = el.getBoundingClientRect().top;

                const y =
                    elTop -
                    wrapperTop +
                    wrapper.scrollTop -
                    headerHeight -
                    navHeight -
                    12;

                wrapper.scrollTo({
                    top: y,
                    behavior: "smooth",
                });
            } else {
                const y =
                    el.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    navHeight -
                    12;

                window.scrollTo({
                    top: y,
                    behavior: "smooth",
                });
            }
        },
        [sectionRefs, activeSlug, setActiveSlug]
    );

    return {
        handleNavClick,
    };
}

/* Long press Tooltip for mobile */
// tooltip.ts

// interface MobileTooltipProps {
//     content: string;
//     href: string;
//     children: ReactNode;
//     longPressDelay?: number;
// }

// export default function MobileTooltip({
//   content,
//   href,
//   children,
//   longPressDelay = 500,
// }: MobileTooltipProps) {
//   const [isVisible, setIsVisible] = useState(false);
//   const timerRef = useRef<number | null>(null);

//   const clearHoldTimer = () => {
//     if (timerRef.current !== null) {
//       window.clearTimeout(timerRef.current);
//       timerRef.current = null;
//     }
//   };

//   const handleTouchStart = () => {
//     clearHoldTimer();

//     timerRef.current = window.setTimeout(() => {
//       setIsVisible(true);
//     }, longPressDelay);
//   };

//   const handleTouchEnd = () => {
//     clearHoldTimer();

//     setTimeout(() => {
//       setIsVisible(false);
//     }, 2000);
//   };

//   const handleMouseEnter = () => {
//     setIsVisible(true);
//   };

//   const handleMouseLeave = () => {
//     clearHoldTimer();
//     setIsVisible(false);
//   };

//   const handleContextMenu = (e: React.MouseEvent) => {
//     if (isVisible) {
//       e.preventDefault();
//     }
//   };

//   return (
//     <span className="relative inline-flex">
//       <a
//         href={href}
//         ontouchstart={handleTouchStart}
//         ontouchend={handleTouchEnd}
//         ontouchcancel={handleTouchEnd}
//         onmouseenter={handleMouseEnter}
//         onmouseleave={handleMouseLeave}
//         oncontextmenu={handleContextMenu}
//         className="inline-flex"
//       >
//         {children}
//       </a>

//       {isVisible && (
//         <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white shadow-md dark:bg-slate-200 dark:text-slate-800">
//           {content}
//         </span>
//       )}
//     </span>
//   );
// }