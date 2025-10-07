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
    padding: 16px 32px;
    background: #D3D3D3CC;

    // new to try to make nav transulcent:
    //background-color: #C0A487CC;
    ///* optional but gives that glassy look */
    //backdrop-filter: blur(8px);
    ///* Safari support */
    //-webkit-backdrop-filter: blur(8px); 
    
    
    
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