import styled from 'styled-components';
import Nav from './Navbar/Nav.tsx';

const StyledHeader = styled.header`
    position: sticky;
    top: 0;
    z-index: 800;
`;

export default function Header() {
    return (
        <StyledHeader>
            <Nav/>
        </StyledHeader>
    );
}