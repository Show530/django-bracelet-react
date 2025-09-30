// import {Link} from 'react-router';
import styled from "styled-components";
import DesktopNav from "./DesktopNav.tsx";
import MobileNav from "./MobileNav.tsx";

const DesktopNavContainer = styled.div`
    position: sticky;
    top: 0;              /* stick to the very top */
    z-index: 800;       /* stay above other content */
    
    @media (max-width: 800px) {
        display: none;
        position: revert;
    }
`;

const MobileNavContainer = styled.div`
    display:none;
    
    @media (max-width: 800px) {
        display: flex;
        position: sticky;
        top: 0;              /* stick to the very top */
        z-index: 1000;       /* stay above other content */
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