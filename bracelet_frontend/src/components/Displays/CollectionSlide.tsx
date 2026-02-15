import type { Image } from '../../interfaces/Image.ts'
import styled from 'styled-components';

const SlideDiv = styled.div`
    width: 100%;
    // min-height: 60vh;
    min-height: 100%;

    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 3rem;

    justify-items: center;
    align-items: center;
    padding: 2rem 4rem;
    // arrows
    padding-inline: 5rem;

    // mobile styling changes to image and text stacked
    @media (max-width: 800px) {
        grid-template-columns: 1fr;
        height: auto;
        padding: 2rem 1.5rem;
        gap: 2rem;
        // arrows
        padding-inline: 3rem;
    }
`;

const ImageWrapperDiv = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledImg = styled.img`
    width: 100%;
    max-width: 420px;
    aspect-ratio: 3/4;
    object-fit: contain;

    // added 
    border-radius: 25px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);

    // mobile adjustment
    @media (max-width: 800px) {
        max-width: 100%;   
    }
`;

const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
`;

const StyledText = styled.p`
    font-size: ${({theme}) => theme.text.subheading};
`;


export default function CollectionSlide(props:{image:Image}) {
    const yearMatch = props.image.caption.match(/img_(\d{4})/);
    const year = yearMatch ? yearMatch[1] : "Unknown";

    return (
        <SlideDiv>
            <ImageWrapperDiv>
                <StyledImg src={props.image.image_url} alt={props.image.caption}/>
            </ImageWrapperDiv>


            <InfoDiv>


                {year != 'Unknown' &&
                 <StyledText>{year}</StyledText>
                }

            </InfoDiv>
        </SlideDiv>
    );
}