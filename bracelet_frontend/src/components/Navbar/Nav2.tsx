// import {Link} from 'react-router';
import styled from "styled-components";
// import DesktopNav from "./DesktopNav.tsx";
// import MobileNav from "./MobileNav.tsx";
// import {Link} from 'react-router';
import {IoCloseOutline, IoMenuOutline} from "react-icons/io5";
import { useState } from "react";
import NavList from "./NavList";

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
    //top: -16px;
    top: 0;
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

    //mobile nav
    @media (max-width: 800px) {
        width: 100%;
        position: sticky;
        height: 10%;
        background: lightgrey;
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
    //background-color: lightgrey;
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


export default function Nav2() {
    const [click, setClick] = useState(false);
    const closeMenu = () => setClick(false);

    const [mobile, setMobile] = useState(false);

    if (window.innerWidth < 800) {
        setMobile(true);

    }

    return (
        <>
            <StyledNav>
                { mobile
                    ?
                    // mobile view
                    (<>
                            {click ?
                                (<Close
                                    onClick={() => setClick(!click)}
                                />)
                                :
                                (<Hamburger
                                    onClick={() => setClick(!click)}
                                />)
                            }
                            (   <>
                                    {click && <NavList isClicked={true} closeMenu={closeMenu} />}
                                </>
                            )
                        </>
                    )
                    :
                    // Desktop view
                    (<NavList isClicked={undefined} closeMenu={undefined}/>)}
            </StyledNav>
        </>
    );
}
