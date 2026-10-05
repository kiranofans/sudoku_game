import { useEffect, useCallback } from "react";
import type { MouseEvent, RefObject } from "react";

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