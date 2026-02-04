import styled from "styled-components";
import {Link} from "react-router";
import {useAuth} from "../../auth/AuthContext.tsx"

const StyledUl = styled.ul`
    display: flex;
    list-style: none;
    text-align: center;
    padding-left: 0;
    justify-content: right;

    @media (max-width: 800px) {
        display: block;
        //justify-items: left;
        justify-items: center;
        list-style: none;
        text-align: center;


        //display: flex;
        //flex-direction: column;
        //justify-content: space-evenly;
        //border-top: 3px solid orange;
        //right: 0;
        //background:blue;

        //top: 10%;
        //height: 50vh;
        //width: 100%;
        //position: absolute;
    }
`;
const StyledLi = styled.li`
    //Desktop view
    padding: 1% .5%;
    margin: 1% .5%;
    text-decoration: none;

    // mobile view
    @media (max-width: 800px) {
        padding: 1% .5%;
        margin: 1% .5%;
        text-decoration: none;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    //color: #785D3F;
    color: #303030;

    &:hover {
        //color: #503E2A;
        color: #000000;
    }
`;

const StyledButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    color: #303030;

    &:hover {
        //color: #503E2A;
        color: #000000;
    }
`;

// @ts-expect-error isClicked and closeMenu have any type
export default function NavList({isClicked, closeMenu}) {
    const {isAuthenticated, user, logout, loading} = useAuth();

    return (
        <>
            <StyledUl>
                <StyledLi onClick={() => isClicked && closeMenu()}>
                    <StyledLink to={`/`}>Home</StyledLink>
                </StyledLi>
                <StyledLi onClick={() => isClicked && closeMenu()}>
                    <StyledLink to={`/Gallery`}>Gallery</StyledLink>
                </StyledLi>

                <StyledLi onClick={() => isClicked && closeMenu()}>
                    <StyledLink to={`/YearGalleries`}>Year Galleries</StyledLink>
                </StyledLi>
                <StyledLi onClick={() => isClicked && closeMenu()}>
                    <StyledLink to={`/Selling`}>Selling</StyledLink>
                </StyledLi>
                <StyledLi onClick={() => isClicked && closeMenu()}>
                    <StyledLink to={`/About`}>About</StyledLink>
                </StyledLi>
                {
                        isAuthenticated 
                        ?  
                        <>
                            {
                                user?.is_staff && 
                                <StyledLi onClick={() => isClicked && closeMenu()}>
                                    <StyledLink to={`/AdminGallery`}>Admin Gallery</StyledLink>
                                </StyledLi>
                            }
                            <StyledLi>
                                <StyledButton onClick={logout}>Log out</StyledButton>
                            </StyledLi>
                        </>
                        :
                        <StyledLi onClick={() => isClicked && closeMenu()}>
                            <StyledLink to={`/Login`}>Log in</StyledLink>
                        </StyledLi>
                    }
            </StyledUl>
        </>
    );
}