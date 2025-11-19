import { motion } from "framer-motion";
import type { ArtItem } from "../state/types";
import "../styles/artCard.css";
import { useRef } from "react";

type ArtCardProps = {
    item: ArtItem;
    onClick?: () => void;
};

export default function ArtCard({ item, onClick }: ArtCardProps) {
    const seedRef = useRef(Math.floor(Math.random() * 10000));

    const imageSrc = item.imageUrl ?? `/placeholderImage.png`;
    const isPlaceholder = item.isPlaceholder === true;
    const hasPrice = typeof item.price === "number" && item.price > 0;

    return (
        <motion.article
            className="artcard ui-card"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.12 }}
            role="listitem"
            onClick={onClick}
            tabIndex={0}
        >
            <div className="artcard__image-wrapper">
                <img
                    src={imageSrc}
                    loading="lazy"
                    className="artcard__image"
                    alt={item.title}
                />
            </div>

            <div className="artcard__content">
                <h4 className="artcard__title">{item.title}</h4>

                {/* Kun prisblok hvis det IKKE er placeholder og vi HAR en pris */}
                {!isPlaceholder && hasPrice && (
                    <>
                        <p className="artcard__info">DKK inkl. salær og gebyr</p>

                        <div className="artcard__price-row">
                            <span className="artcard__label">Nuværende bud</span>
                            <strong className="artcard__price">
                                {item.price!.toLocaleString("da-DK")}
                            </strong>
                        </div>
                    </>
                )}
                {!isPlaceholder && !hasPrice && (
                    <div className="artcard__info">
                        Ingen bud endnu
                    </div>
                    )}
            </div>
        </motion.article>
    );
}
