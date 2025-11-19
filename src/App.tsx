// src/App.tsx
import SubHeader from "./components/SubHeader";
import "./styles/landingPageStyles.css";
import ArtistCarousel from "./components/ArtistCarousel";
import type { ArtistCarousel as ArtistCarouselData } from "./state/types/item";
import { useArtList } from "./api/hooks/useArtList";
import {PLACEHOLDER_CAROUSEL} from "./state/placeholders/artCard.placeholder";
import LandingInfo from "./components/LandingInfo";

function App() {
    const { data, isError } = useArtList({ page: 0, size: 8 });

    // build props to the carousel
    const carouselData: ArtistCarouselData =
        !isError && data && data.length > 0
            ? {
                artistName: "Nyeste auktioner",
                items: data,
            }
            : PLACEHOLDER_CAROUSEL;

    return (
        <>
            <SubHeader />

            <h2 className="red-text title">Mød Artisterne</h2>

            <ArtistCarousel data={carouselData} />
            <LandingInfo />
        </>
    );
}

export default App;
