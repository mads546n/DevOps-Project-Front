import { motion } from "framer-motion";
import type { ArtItem } from "../state/types/item";
import "../styles/artCard.css";
import {useRef} from "react";

type ArtCardProps = {
    item: ArtItem;
    onClick?: () => void;
};

export default function ArtCard({ item, onClick }: ArtCardProps) {
    //just for placeholder-images (temp)
    const seedRef = useRef(Math.floor(Math.random() * 10000));

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
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img
                    src={`https://picsum.photos/400/400?random=${seedRef.current}`}
                    loading="lazy"
                    className="artcard__image"
                    alt="Artwork"/>
            </div>

            <div className="artcard__content">
                <h4 className="artcard__title">{item.title}</h4>

                <p className="artcard__info">DKK inkl. salær og gebyr</p>

                <div className="artcard__price-row">
                    <span className="artcard__label">Nuværende bud</span>
                    <strong className="artcard__price">
                        {item.price.toLocaleString("da-DK")}
                    </strong>
                </div>
            </div>
        </motion.article>
    );
}
