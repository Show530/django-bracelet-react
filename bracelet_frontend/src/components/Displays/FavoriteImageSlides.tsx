import type { Image } from "../../interfaces/Image.ts";
import CollectionSlide from "./CollectionSlide.tsx";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";
// import {useState, useEffect} from "react";

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
    // const [width, setWidth] = useState<number>(window.innerWidth);

    // function handleWindowSizeChange() {
    //     setWidth(window.innerWidth);
    // }
    // useEffect(() => {
    //     window.addEventListener('resize', handleWindowSizeChange);
    //     return () => {
    //         window.removeEventListener('resize', handleWindowSizeChange);
    //     }
    // }, []);

    // const isMobile = width <= 800;

    return (
        <StyledSwiper
            modules={[Navigation, Pagination, Autoplay, Keyboard]}
            navigation
            pagination={{clickable: true}}
            // delay controls how fast it plays- mess around?
            autoplay={{ delay: 7000}}
            // direction={isMobile ? "horizontal": "vertical"}
            direction="horizontal"
            keyboard={{enabled: true}}
        >
            {props.images.map (img => (
                <SwiperSlide key={img.id}>
                    <CollectionSlide image={img}/>
                </SwiperSlide>
            ))}
        </StyledSwiper>
    );
}

