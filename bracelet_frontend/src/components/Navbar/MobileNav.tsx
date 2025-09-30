import {Link} from 'react-router';
import styled from "styled-components";
import { IoMenuOutline } from "react-icons/io5";

// position: sticky;
// top: -16px;
// z-index: 1000;
// width: 100%;
// margin: 0 -32px;
// padding: 24px 32px 8px;


const StyledNav = styled.nav`
    width: 100%;
    position: sticky;
    height: 10%;
    background: lightgrey;
    align-items: center;
`;

const StyledUl = styled.ul`
    list-style: none;
    text-align: center;
`;
const StyledLi = styled.li`
    padding: 1% .5%;
    margin: 1% .5%;
    text-decoration: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: palegreen;
    
    &:hover {
        color: darkgreen;
    }
`;

const Hamburger = styled(IoMenuOutline)`
    color: black;
    font-size: 3em;
`;

export default function MobileNav() {
    return (
        <StyledNav>
            <Hamburger/>
            <StyledUl>
                <StyledLi>
                    <StyledLink to={`/`}>Home</StyledLink>
                </StyledLi>
                <StyledLi>
                    <StyledLink to={`/Gallery`}>Gallery</StyledLink>
                </StyledLi>
                <StyledLi>
                    <StyledLink to={`/YearGalleries`}>Year Galleries</StyledLink>
                </StyledLi>
                <StyledLi>
                    <StyledLink to={`/Selling`}>Selling</StyledLink>
                </StyledLi>
            </StyledUl>
        </StyledNav>
    );
}