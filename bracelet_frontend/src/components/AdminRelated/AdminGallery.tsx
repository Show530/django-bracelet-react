import styled from "styled-components";
import {Link} from "react-router";

const StyledDiv = styled.div`
    justify-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0.5rem;
    // margin: 2%;

    @media (max-width: 800px) {
        grid-template-columns: 1fr;
    }
`;

const StyledText = styled.p`
    font-size: ${({theme}) => theme.text.body};
`;


export default function AdminGallery() {

    return (
        <>
            <StyledDiv>
                <div>
                    <Link to={`/AdminGallery/Images`}>
                        <StyledText>Images</StyledText>
                    </Link>
                </div>
                <div>
                    <Link to={`/AdminGallery/Bracelets`}>
                        <StyledText>Bracelets</StyledText>
                    </Link>
                </div>
            </StyledDiv>
        </>
    );
}