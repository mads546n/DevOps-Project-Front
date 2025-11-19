import SubHeader from "./components/SubHeader";
import "./styles/landingPageStyles.css";
import ArtistCarousel from "./components/ArtistCarousel";
import type { ArtistCarousel as ArtistCarouselData } from "./state/types/item";


function Auktioner() {
    const data: ArtistCarouselData = {
        artistName: "Karl Larhenhaus",
        items: [
            { id: 1, imageUrl: "/images/1.jpg", title: "Forbandet fortid – Litografi", price: 30000 },
            { id: 2, imageUrl: "/images/2.jpg", title: "Skyggernes dans – Akvarel", price: 28500 },
            { id: 3, imageUrl: "/images/3.jpg", title: "Lysets kontrast – Olie på lærred", price: 31000 },
            { id: 4, imageUrl: "/images/4.jpg", title: "Drømmenes form – Grafik", price: 29500 },
            { id: 5, imageUrl: "/images/5.jpg", title: "Sansens rum – Collage", price: 34000 },
            { id: 6, imageUrl: "/images/6.jpg", title: "Fragmenteret virkelighed – Tryk", price: 27500 },
            { id: 7, imageUrl: "/images/7.jpg", title: "Farvernes spil – Litografi", price: 32500 },
            { id: 8, imageUrl: "/images/8.jpg", title: "Tidens ekko – Akryl", price: 35500 },
        ],
    };

  return (
    <>
        <SubHeader />
        <h2 className={"red-text, title"}>Nyeste auktioner</h2>

        <ArtistCarousel data={data} />

        <div className={"info-box"}>
            <h3>Sådan fungerer vores auktioner</h3>
            <p>
                Hos Tetra Art ønsker vi at forene traditionel auktionskultur med et moderne og engagerende format. Vores system er enkelt, gennemsigtigt og skaber spænding i budprocessen.
            </p>
            <p>
                Når du deltager i en auktion, starter du med at vælge det kunstværk, du ønsker at byde på. Hvert bud skal være mindst 100 kr. højere end det senest registrerede bud, hvilket sikrer en dynamisk og fair progression i auktionen.
            </p>
            <p>
                Til hvert værk er der knyttet en hemmelig claim-pris. Denne pris er ukendt for deltagerne, men hvis et bud når op på eller overstiger dette niveau, afsluttes auktionen straks, og værket tilfalder den pågældende byder. Dermed skabes en ekstra dimension af spænding og uforudsigelighed.
            </p>
            <p>
                Hvis ingen når værkets claim-pris inden tidsfristen, afsluttes auktionen uden værket bliver solgt.
            </p>
            <p>
                Efter vundet auktion modtager køberen en bekræftelse samt videre information om det praktiske forløb i forbindelse med betaling og levering.
            </p>
        </div>
    </>
  )
}

export default Auktioner
