import styled from 'styled-components';


const StyledDiv = styled.div`
    justify-self: center;
    align-items: center;
    margin: 1%;
`;

const StyledText = styled.p`
    text-align: center;
    font-size: ${({theme}) => theme.text.body};
`;


export default function Loading(props:{where:string}) {

    return (
        <StyledDiv>
            <StyledText>Loading {props.where}...</StyledText>
        </StyledDiv>
    );
}