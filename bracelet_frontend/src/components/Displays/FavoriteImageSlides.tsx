import type { Image } from "../../interfaces/Image.ts";
import CollectionSlide from "./CollectionSlide.tsx";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import 'swiper/swiper-bundle.css';

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

const StyledSwiper = styled(Swiper)`
    margin: 3% 0;
    width: 100%;
    // added
    max-height: 80vh;

    padding-block: 1rem;
    background: white;

    border-radius: 15px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    
    @media (max-width: 800px) {
        max-height: 100vh;
    }
`;

export default function FavoriteImageSlides(props:{images:Image[]}) {
    return (
        <StyledSwiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{clickable: true}}
            // delay controls how fast it plays- mess around?
            autoplay={{ delay: 7000}}
        >
            {props.images.map (img => (
                <SwiperSlide key={img.id}>
                    <CollectionSlide image={img}/>
                </SwiperSlide>
            ))}
        </StyledSwiper>
    );
}

