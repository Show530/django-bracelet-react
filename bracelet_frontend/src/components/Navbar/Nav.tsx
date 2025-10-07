// import {Link} from 'react-router';
import styled from "styled-components";
import DesktopNav from "./DesktopNav.tsx";
import MobileNav from "./MobileNav.tsx";


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

export default function Nav() {
    return (
        <>
            <DesktopNavContainer>
                <DesktopNav/>
            </DesktopNavContainer>
            <MobileNavContainer>
                <MobileNav/>
            </MobileNavContainer>
        </>
    );
}