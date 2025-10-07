import styled from 'styled-components';
import Nav from './Navbar/Nav.tsx';

const StyledHeader = styled.header`
    position: sticky;
    top: 0;              /* stick to the very top */
    z-index: 800;       /* stay above other content */
`;

export default function Header() {
    return (
        <StyledHeader>
            <Nav/>
        </StyledHeader>
    );
}