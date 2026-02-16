// import {Link} from 'react-router';
import styled from "styled-components";
import NavList from "./NavList.tsx";
import { IoMenuOutline } from "react-icons/io5";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";


const DesktopNavContainer = styled.div`
    @media (max-width: 800px) {
        display: none;
        position: revert;
    }
`;

const MobileNavContainer = styled.div`
    display:none;
    
    @media (max-width: 800px) {
        display: flex;
    }
`;

const StyledNav = styled.nav`
    width: 100%;
    // padding: 16px 32px;
    margin: 0;
    // height: 10%;
    
    backdrop-filter: blur(6px);
    // -webkit-backdrop-filter: blur(6px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    padding: 0.25px;

    @media (max-width: 800px) {
        width: 100%;
        height: 10%;
        align-items: center;
    }
`;

// used
// https://kenudeh.hashnode.dev/how-to-build-a-responsive-navigation-menu-with-react#heading-building-a-responsive-hamburger-menu-in-react
// for creating mobile nav/hamburger menu
const Hamburger = styled(IoMenuOutline)`
    color: black;
    font-size: 3em;
    // in a class on the tut
    //position: absolute;
    display: block;
    margin-left: auto;
    //right: 2%;
    cursor: pointer;
`;

const Close = styled(IoCloseOutline)`
    color: black;
    font-size: 3em;
    // in a class on the tut
    //position: absolute;
    display: block;
    margin-left: auto;
    //right: 2%;
    cursor: pointer;
`;

export default function Nav() {
    const [click, setClick] = useState(false);
    const closeMenu = () => setClick(false);

    return (
        <>
            <DesktopNavContainer>
                <StyledNav>
                    <NavList size={"D"} isClicked={undefined} closeMenu={undefined} />
                </StyledNav>
            </DesktopNavContainer>
            <MobileNavContainer>
                <StyledNav>
                            { click ?
                                (<Close
                                    onClick={() => setClick(!click)}
                                />)
                                :
                                (<Hamburger
                                    onClick={() => setClick(!click)}
                                />)}
                            {click &&
                                // <StyledDivEase>
                                    <NavList size={"M"} isClicked={true} closeMenu={closeMenu} />
                                // </StyledDivEase>
                                }
                        </StyledNav>
            </MobileNavContainer>
        </>
    );
}