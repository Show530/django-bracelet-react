import styled from 'styled-components';
import type {Bracelet} from '../../interfaces/Bracelet.ts';

const AllBraceletsDiv=styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    border: 2px aqua;
`;

const SingleBraceletDiv=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 25%;
    padding: 3%;
    margin: 1%;
    font: calc(20px + 5vw) Georgia, Garamond, serif;
    //Copperplate, fantasy
    text-align: center;
    border: 1px inset indianred;
    color: #544B6C;
    //overflow-wrap: break-word;
`;

const StyledItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    // keeps label close to value
    gap: 0.2rem;
`;

const StyledLabel = styled.h3 `
    //font-size: 1.5rem;
    font: clamp(12px, calc(18px + 1vw), 32px) Georgia, Garamond, serif;
    color: #666;
    text-transform: lowercase;
    letter-spacing: 0.03em;
`;

const StyledVal = styled.h3 `
    //font-size: 3rem;
    font: clamp(14px, calc(24px + 2vw), 40px) Georgia, Garamond, serif;
    font-weight: 500;
    color: #111;

    // handling url overflow
    word-break: break-word;
    overflow-wrap: anywhere;

`;

// <h2>Name</h2>
// <h3>Pattern</h3>
// <h3>Bracelet Type</h3>
// <h3>Length</h3>
// <h3>Number of colors</h3>
// <h3>Start date</h3>
// <h3>End date</h3>
// <h3>Going where?</h3>

export default function AdminBracelets(props: {data: Bracelet[], selling: boolean}) {
    return (
        <AllBraceletsDiv>
            {
                props.data.map((bracelet: Bracelet) =>
                    <SingleBraceletDiv key={bracelet.id}>
                        <StyledItem>
                            <StyledLabel>Name:</StyledLabel>
                            <StyledVal>{bracelet.name}</StyledVal>
                        </StyledItem>
                        {bracelet.pattern_url && (
                            <>
                                <StyledItem>
                                    <StyledLabel>Pattern:</StyledLabel>
                                    <StyledVal>
                                        <a href={bracelet.pattern_url} target="_blank">
                                            {bracelet.pattern_url}
                                        </a>
                                    </StyledVal>
                                </StyledItem>
                            </>
                        )
                        }
                        <StyledItem>
                            <StyledLabel>Bracelet type:</StyledLabel>
                            <StyledVal>{bracelet.bType}</StyledVal>
                        </StyledItem>
                        <StyledItem>
                            <StyledLabel>Length:</StyledLabel>
                            <StyledVal>{bracelet.bLength}</StyledVal>
                        </StyledItem>
                        <StyledItem>
                            <StyledLabel>Number of colors:</StyledLabel>
                            <StyledVal>{bracelet.numColors}</StyledVal>
                        </StyledItem>
                        <StyledItem>
                            <StyledLabel>Dates created:</StyledLabel>
                            <StyledVal>{bracelet.startDate} - {bracelet.endDate}</StyledVal>
                        </StyledItem>
                        <StyledItem>
                            <StyledLabel>Where's it going?:</StyledLabel>
                            <StyledVal>{bracelet.goingWhere}</StyledVal>
                        </StyledItem>
                        <StyledItem>
                            <StyledLabel>Price:</StyledLabel>
                            <StyledVal>${bracelet.price}</StyledVal>
                        </StyledItem>
                    </SingleBraceletDiv>
                )}
        </AllBraceletsDiv>
    );
}