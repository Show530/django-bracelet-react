import styled from 'styled-components';


const StyledDiv = styled.div`
    justify-self: center;
    align-items: center;
`;

export default function Loading() {

    return (
        <StyledDiv>
            <p>Loading gallery...</p>
        </StyledDiv>
    );
}