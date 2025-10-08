import styled from 'styled-components';
// import {Bracelet} from "../interfaces/Bracelet.ts";
import type {Image} from '../../interfaces/Image.ts';
import {Link, useParams} from "react-router";

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
    
    // CSS to make fade in
    transition: opacity 0.5s ease-in-out;
    opacity: 0;

    &.loaded {
        opacity: 1;
    }
`;

type RouteParams = {
    "*": string; // because your route uses a wildcard
};

export default function Images(props: {data: Image[]}) {
    const params = useParams<RouteParams>();
    const currPage = params["*"] ?? "";
    // console.log("Curr page: ", currPage);
    return (
        <>
            <AllImagesDiv>
                {
                    props.data.map((image: Image) =>
                        <SingleImageDiv key={image.id}>
                            {/*wrap in a link tag*/}
                            <StyledLink to={`/${currPage}/${image.id}`}>
                                <StyledImg
                                    loading="lazy"
                                    src={image.image_file}
                                    alt={image.caption}
                                    // when image is loaded, set the class to loaded to put the opacity back to 1
                                    onLoad={(event) => event.currentTarget.classList.add("loaded")}
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