import {Link} from 'react-router';
import styled from "styled-components";


// position: sticky;
// top: -16px;
// z-index: 1000;
// width: 100%;
// margin: 0 -32px;
// padding: 24px 32px 8px;


const StyledNav = styled.nav`
    width: 100%;
    // 
    position: sticky;
    top: -16px;
    z-index: 1000;
    //margin: 0 -32px;
    padding: 24px 32px 8px;
    background: slategray;
    //display: flex;
    //justify-content: right;
    //justify-items: center;
    //@media screen and (max-width: 900px) {
    //    width: 100%;
    //}
`;

const StyledUl = styled.ul`
    display: flex;
    list-style: none;
    text-align: center;
    padding-left: 0;
    justify-content: right;
    //float: right;
    //flex-direction: row;
    //justify-content: space-evenly;
    //justify-content: space-between;
    /*background-color: #d174c9;*/

    
    //@media screen and (max-width: 900px) {
    //    flex-direction: row;
    //    justify-content: space-between;
    //}
`;
const StyledLi = styled.li`
    padding: 1% .5%;
    margin: 1% .5%;
    text-decoration: none;
    //width: 50%;
    //padding: 2vh 0;
    //margin: 2vw auto;
    //background-color: #d788d0;
    //border-radius: 5%;
    //display: grid;
    //align-items: center;
    
    //@media screen and (max-width: 900px) {
    //    font-size: calc(2px + 1.5vw);
    //    padding: 1% .5%;
    //    margin: 1% .5%;
    //    display: grid;
    //    align-items: center;
    //}
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: palegreen;
    
    &:hover {
        color: darkgreen;
    }
`;



export default function DesktopNav() {
    return (
        <StyledNav>
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