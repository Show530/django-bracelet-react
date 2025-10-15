import styled from 'styled-components';


const StyledDiv = styled.div`
    justify-self: center;
    align-items: center;
`;



export default function Loading(props:{where:string}) {

    return (
        <StyledDiv>
            <p>Loading {props.where}...</p>
        </StyledDiv>
    );
}