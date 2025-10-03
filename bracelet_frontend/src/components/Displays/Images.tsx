import styled from 'styled-components';
// import {Bracelet} from "../interfaces/Bracelet.ts";
import type {Image} from '../../interfaces/Image.ts';
import {Link} from "react-router";

const AllImagesDiv=styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    //border: 2px aqua;
`;

const SingleImageDiv=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 25%;
    padding: 0.5%;
    margin: 1%;
    //border: 1px inset indianred;
    //overflow-wrap: break-word;
`;


const StyledLink = styled(Link)`
    display: inline-flex; /* prevents full-width stretching */
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    text-decoration: none; /* remove underline */
`;

const StyledImg = styled.img`
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: 25px;
`;


export default function Images(props: {data: Image[]}) {
    return (
        <>
            <AllImagesDiv>
                {
                    props.data.map((image: Image) =>
                        <SingleImageDiv key={image.id}>
                            {/*wrap in a link tag*/}
                            <StyledLink to={`/Gallery/${image.id}`}>
                                <StyledImg
                                    loading="lazy"
                                    src={image.image_file}
                                    alt={image.caption}
                                />
                            </StyledLink>

                            {/*{image.caption && <StyledP>{image.caption}</StyledP>}*/}
                            {/*<ul>*/}
                            {/*    {image.bracelets.map((bracelet) =>*/}
                            {/*        <li key={bracelet.id}>{bracelet.name}</li>*/}
                            {/*    )}*/}
                            {/*</ul>*/}
                        </SingleImageDiv>
                    )
                }
            </AllImagesDiv>
        </>
    );
}