import styled from "styled-components";
import {Link} from "react-router";
import {useAuth} from "../../auth/AuthContext.tsx"
// import { IoConstructSharp } from "react-icons/io5";

const StyledRow = styled.div`
    display:flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;
`;

const StyledCol = styled.div`
    display:flex;
    justify-content: space-evenly;
    padding: 0.5rem;
    flex-direction: column;
`;

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
    }
`;
const StyledLi = styled.li`
    //Desktop view
    padding: 0.5% .5%;
    margin: 0.5% .5%;
    text-decoration: none;

    // mobile view
    @media (max-width: 800px) {
        padding: 2% .5%;
        margin: 2% .5%;
        text-decoration: none;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    //color: #785D3F;
    // color: #303030;
    color: #2B2B2B;

    &:hover {
        //color: #503E2A;
        color: #445e4f;
    }
`;

const StyledText = styled.p`
    font-size: ${({theme}) => theme.text.value};
`;

const StyledButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    color: #303030;

    &:hover {
        //color: #503E2A;
        color: #445e4f;
    }
`;

// @ts-expect-error isClicked and closeMenu have any type
export default function NavList({size, isClicked, closeMenu}) {
    const {isAuthenticated, user, logout} = useAuth();
    

    const FirstHalf = () => (
        <>
            <StyledLi onClick={() => isClicked && closeMenu()}>
                <StyledLink to={`/`}>
                    <StyledText>Home</StyledText>
                </StyledLink>
            </StyledLi>
            <StyledLi onClick={() => isClicked && closeMenu()}>
                <StyledLink to={`/Gallery`}>
                    <StyledText>Gallery</StyledText>
                </StyledLink>
            </StyledLi>
            <StyledLi onClick={() => isClicked && closeMenu()}>
                <StyledLink to={`/YearGalleries`}>
                    <StyledText>Year Galleries</StyledText>
                </StyledLink>
            </StyledLi>
        </>
    );

    const SecondHalf = () => (
            <>
                <StyledLi onClick={() => isClicked && closeMenu()}>
                    <StyledLink to={`/Selling`}>
                        <StyledText>For Sale</StyledText>
                    </StyledLink>
                </StyledLi>
                <StyledLi onClick={() => isClicked && closeMenu()}>
                    <StyledLink to={`/About`}>
                        <StyledText>About</StyledText>
                    </StyledLink>
                </StyledLi>
                {
                        isAuthenticated 
                        ?  
                        <>
                            {
                                user?.is_staff && 
                                <StyledLi onClick={() => isClicked && closeMenu()}>
                                    <StyledLink to={`/AdminGallery`}>
                                        <StyledText>Admin Gallery</StyledText>
                                    </StyledLink>
                                </StyledLi>
                            }
                            <StyledLi>
                                <StyledButton onClick={logout}>
                                    <StyledText>Log out</StyledText>
                                </StyledButton>
                            </StyledLi>
                        </>
                        :
                        <StyledLi onClick={() => isClicked && closeMenu()}>
                            <StyledLink to={`/Login`}>
                                <StyledText>Log in</StyledText>
                            </StyledLink>
                        </StyledLi>
                    }
            </>
        );
    

    return (
        <>
            {
                size === "D" 
                ? 
                <StyledUl>
                    <FirstHalf/>
                    <SecondHalf/>
                </StyledUl>
                
                :
                <StyledRow>
                    <StyledCol>
                        <StyledUl>
                            <FirstHalf/>
                        </StyledUl>
                    </StyledCol>
                    <StyledCol>
                        <StyledUl>
                            <SecondHalf/>
                        </StyledUl>
                    </StyledCol>
                </StyledRow>
                
            }
        </>
    );
}

// // <StyledLi onClick={() => isClicked && closeMenu()}>
//                     <StyledLink to={`/`}>Home</StyledLink>
//                 </StyledLi>
//                 <StyledLi onClick={() => isClicked && closeMenu()}>
//                     <StyledLink to={`/Gallery`}>Gallery</StyledLink>
//                 </StyledLi>

//                 <StyledLi onClick={() => isClicked && closeMenu()}>
//                     <StyledLink to={`/YearGalleries`}>Year Galleries</StyledLink>
//                 </StyledLi>
//                 <StyledLi onClick={() => isClicked && closeMenu()}>
//                     <StyledLink to={`/Selling`}>Selling</StyledLink>
//                 </StyledLi>
//                 <StyledLi onClick={() => isClicked && closeMenu()}>
//                     <StyledLink to={`/About`}>About</StyledLink>
//                 </StyledLi>
//                 {
//                         isAuthenticated 
//                         ?  
//                         <>
//                             {
//                                 user?.is_staff && 
//                                 <StyledLi onClick={() => isClicked && closeMenu()}>
//                                     <StyledLink to={`/AdminGallery`}>Admin Gallery</StyledLink>
//                                 </StyledLi>
//                             }
//                             <StyledLi>
//                                 <StyledButton onClick={logout}>Log out</StyledButton>
//                             </StyledLi>
//                         </>
//                         :
//                         <StyledLi onClick={() => isClicked && closeMenu()}>
//                             <StyledLink to={`/Login`}>Log in</StyledLink>
//                         </StyledLi>
//                     }