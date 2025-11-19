// src/App.tsx
import SubHeader from "./components/SubHeader";
import "./styles/landingPageStyles.css";
import ArtistCarousel from "./components/ArtistCarousel";
import type { ArtistCarousel as ArtistCarouselData } from "./state/types/item";
import { useArtList } from "./api/hooks/useArtList";
import {PLACEHOLDER_CAROUSEL} from "./state/placeholders/artCard.placeholder";

function App() {
    const { data, isError } = useArtList();

    // Byg props til karousellen
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

            <h2 className="red-text title">Nyeste auktioner</h2>

            <ArtistCarousel data={carouselData} />

            <div className="info-box">
                <h3>Sådan fungerer vores auktioner</h3>
                <p>
                    Hos Tetra Art ønsker vi at forene traditionel auktionskultur med et
                    moderne og engagerende format. Vores system er enkelt, gennemsigtigt
                    og skaber spænding i budprocessen.
                </p>
                <p>
                    Når du deltager i en auktion, starter du med at vælge det kunstværk,
                    du ønsker at byde på. Hvert bud skal være mindst 100 kr. højere end
                    det senest registrerede bud, hvilket sikrer en dynamisk og fair
                    progression i auktionen.
                </p>
                <p>
                    Til hvert værk er der knyttet en hemmelig claim-pris. Denne pris er
                    ukendt for deltagerne, men hvis et bud når op på eller overstiger
                    dette niveau, afsluttes auktionen straks, og værket tilfalder den
                    pågældende byder. Dermed skabes en ekstra dimension af spænding og
                    uforudsigelighed.
                </p>
                <p>
                    Hvis ingen når værkets claim-pris inden tidsfristen, afsluttes
                    auktionen uden værket bliver solgt.
                </p>
                <p>
                    Efter vundet auktion modtager køberen en bekræftelse samt videre
                    information om det praktiske forløb i forbindelse med betaling og
                    levering.
                </p>
            </div>
        </>
    );
}

export default App;
