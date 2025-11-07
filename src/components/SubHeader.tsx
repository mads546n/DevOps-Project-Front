import React from "react";
import "../styles/subHeaderStyles.css"
// Import your asset (Vite will bundle it). Adjust the path/name:
import heroUrl from "../assets/abstract-liquid.jpg";

type Props = {
    title?: string;
    subtitle?: string;
    imageUrl?: string; // allow override if needed
};

export default function SubHeader({
                                      title = "Nutidens moderne kunst",
                                      subtitle = "Nutidens moderne kunst udfordrer traditionelle grænser og kombinerer ofte teknologi, samfundskritik og personlige udtryk for at skabe værker, der engagerer både sanser og tanker",
                                      imageUrl = heroUrl,
                                  }: Props) {
    return (
        <section
            className="subheader"
            aria-label="Fremhævet tema"
            style={{ ["--subheader-image" as any]: `url(${imageUrl})` }}
        >
            <div className="subheader__content container">
                <h2 className="subheader__title">{title}</h2>
                <p className="subheader__subtitle">{subtitle}</p>
            </div>
        </section>
    );
}
