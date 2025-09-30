// import {Link} from 'react-router';
import styled from "styled-components";
import { IoMenuOutline } from "react-icons/io5";
import { useState } from "react";
import NavList from "./NavList.tsx"
import { IoCloseOutline } from "react-icons/io5";

const StyledNav = styled.nav`
    width: 100%;
    //position: sticky;
    //top: 0;
    //height: 5vh;
    height: 10%;

    background: slategray;
    align-items: center;

    //height: 10vh;
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


export default function MobileNav() {
    const [click, setClick] = useState(false);

    const closeMenu = () => setClick(false);

    return (
        <StyledNav>
            { click ?
                (<Close
                    onClick={() => setClick(!click)}
                />)
                :
                (<Hamburger
                    onClick={() => setClick(!click)}
                />)}
            {click && <NavList isClicked={true} closeMenu={closeMenu} />}
        </StyledNav>
    );
}