import styled from "styled-components";
import {Link} from "react-router";


const StyledUl = styled.ul`
    display: flex;
    list-style: none;
    text-align: center;
    padding-left: 0;
    justify-content: right;
    
    @media (max-width: 800px) {
        display: block;
        //justify-items: left;
        justify-items: center;
        list-style: none;
        text-align: center;
        
        
        //display: flex;
        //flex-direction: column;
        //justify-content: space-evenly;
        //border-top: 3px solid orange;
        //right: 0;
        //background:blue;

        //top: 10%;
        //height: 50vh;
        //width: 100%;
        //position: absolute;
    }
`;
const StyledLi = styled.li`
    //Desktop view
    padding: 1% .5%;
    margin: 1% .5%;
    text-decoration: none;
    
    // mobile view
    @media (max-width: 800px) {
        padding: 1% .5%;
        margin: 1% .5%;
        text-decoration: none;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: palegreen;
    
    &:hover {
        color: darkgreen;
    }
`;

// @ts-expect-error isClicked and closeMenu have any type
export default function NavList({isClicked, closeMenu}) {
    return (
        <>
            <StyledUl>
                <StyledLi onClick={() => isClicked && closeMenu()}>
                    <StyledLink to={`/`}>Home</StyledLink>
                </StyledLi>
                <StyledLi onClick={() => isClicked && closeMenu()}>
                    <StyledLink to={`/Gallery`}>Gallery</StyledLink>
                </StyledLi>
                <StyledLi onClick={() => isClicked && closeMenu()}>
                    <StyledLink to={`/ImageGallery`}>Image Gallery</StyledLink>
                </StyledLi>
                <StyledLi onClick={() => isClicked && closeMenu()}>
                    <StyledLink to={`/YearGalleries`}>Year Galleries</StyledLink>
                </StyledLi>
                <StyledLi onClick={() => isClicked && closeMenu()}>
                    <StyledLink to={`/Selling`}>Selling</StyledLink>
                </StyledLi>
            </StyledUl>
        </>
    );
}