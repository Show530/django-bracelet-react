// import {Link} from 'react-router';
import styled from "styled-components";
import NavList from "./NavList";

// position: sticky;
// top: -16px;
// z-index: 1000;
// width: 100%;
// margin: 0 -32px;
// padding: 24px 32px 8px;


const StyledNav = styled.nav`
    width: 100%;
    background-color: #C0A487;
    padding: 16px 32px;


    //width: 100%;
    //// 
    //position: sticky;
    ////top: -16px;
    //top: 0;
    //z-index: 1000;
    //padding: 24px 32px 8px;
    //background: slategray;

    //margin: 0 -32px;

    //display: flex;
    //justify-content: right;
    //justify-items: center;
    //@media screen and (max-width: 900px) {
    //    width: 100%;
    //}
`;


export default function DesktopNav() {
    return (
        <StyledNav>
            <NavList isClicked={undefined} closeMenu={undefined} />
        </StyledNav>
    );
}