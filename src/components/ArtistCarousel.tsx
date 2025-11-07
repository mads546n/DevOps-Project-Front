import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ArtistCarousel as ArtistCarouselData, ArtItem } from "../state/types/item";
import ArtCard from "./ArtCard";
import "../styles/artistCarousel.css";

type Props = {
    data: ArtistCarouselData;
    /** How many cards to scroll per click (default 1) */
    step?: number;
};

export default function ArtistCarousel({ data, step = 1 }: Props) {
    const railRef = useRef<HTMLDivElement | null>(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(true);

    // Keep arrow enable/disable in sync with scroll position
    useEffect(() => {
        const el = railRef.current;
        if (!el) return;

        const onScroll = () => {
            setCanLeft(el.scrollLeft > 8);
            setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
        };

        onScroll();
        el.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            el.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    const scrollByCards = (dir: -1 | 1) => {
        const el = railRef.current;
        if (!el) return;

        const first = el.firstElementChild as HTMLElement | null;
        const cardW =
            first
                ? first.offsetWidth +
                parseInt(getComputedStyle(el).columnGap || "16", 10)
                : el.clientWidth * 0.8;

        const delta = dir * step * cardW;
        el.scrollBy({ left: delta, behavior: "smooth" });
    };

    return (
        <section
            className="ui-panel artist-carousel container"
            aria-label={`Auktioner af ${data.artistName}`}
        >
            <header className="artist-carousel__header">
                <h3 className="artist-carousel__title">{data.artistName}</h3>

                {/* Arrows */}
                <div className="artist-carousel__arrows" aria-hidden="true">
                    {/* Arrows (now separate left/right for full control) */}
                    <button
                        className="ui-icon-btn carousel-arrow left"
                        onClick={() => scrollByCards(-1)}
                        disabled={!canLeft}
                        aria-label="Forrige"
                    >
                        ←
                    </button>

                    <button
                        className="ui-icon-btn carousel-arrow right"
                        onClick={() => scrollByCards(1)}
                        disabled={!canRight}
                        aria-label="Næste"
                    >
                        →
                    </button>

                </div>
            </header>

            {/* Rail */}
            <motion.div
                ref={railRef}
                className="ui-rail artist-carousel__rail"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                role="list"
            >
                {data.items.map((item: ArtItem) => (
                    <motion.div
                        key={item.id}
                        role="listitem"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.08 }}
                    >
                        <ArtCard item={item} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
