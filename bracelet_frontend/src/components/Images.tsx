import styled from 'styled-components';
// import {Bracelet} from "../interfaces/Bracelet.ts";
import type {Image} from '../interfaces/Image.ts';

const AllImagesDiv=styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    border: 2px aqua;
`;

const SingleImageDiv=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 25%;
    padding: 3%;
    margin: 1%;
    //font: calc(2px + 1vw) Copperplate, fantasy;
    text-align: center;
    border: 1px inset indianred;
    //overflow-wrap: break-word;
`;
// <h2>Name</h2>
// <h3>Pattern</h3>
// <h3>Bracelet Type</h3>
// <h3>Length</h3>
// <h3>Number of colors</h3>
// <h3>Start date</h3>
// <h3>End date</h3>
// <h3>Going where?</h3>
const StyledP = styled.p `
    word-wrap: break-word;
`;

export default function Images(props: {data: Image[]}) {
    return (
        <>
            <AllImagesDiv>
                {
                    props.data.map((image: Image) =>
                        <SingleImageDiv key={image.id}>
                            <img
                                loading="lazy"
                                src={image.image_file}
                                alt={image.caption}
                            />
                            {image.caption && <StyledP>{image.caption}</StyledP>}
                            <ul>
                                {image.bracelets.map((bracelet) =>
                                    <li key={bracelet.id}>{bracelet.name}</li>
                                )}
                            </ul>
                        </SingleImageDiv>
                    )
                }
            </AllImagesDiv>
        </>
    );
}