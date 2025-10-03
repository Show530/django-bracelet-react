import styled from 'styled-components';
// import {Bracelet} from "../interfaces/Bracelet.ts";
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

const StyledH3 = styled.h3 `
    word-wrap: break-word;
`;

// <h2>Name</h2>
// <h3>Pattern</h3>
// <h3>Bracelet Type</h3>
// <h3>Length</h3>
// <h3>Number of colors</h3>
// <h3>Start date</h3>
// <h3>End date</h3>
// <h3>Going where?</h3>

export default function Bracelets(props: {data: Bracelet[], selling: boolean}) {
    return (
        <>
            <AllBraceletsDiv>
                    {
                        props.data.map((bracelet: Bracelet) =>
                            <SingleBraceletDiv key={bracelet.id}>
                                <h2>Name: {bracelet.name}</h2>
                                {bracelet.pattern_url && (
                                        <><StyledH3>Pattern: <a href={bracelet.pattern_url} target="_blank">{bracelet.pattern_url}</a> </StyledH3></>
                                    )
                                }
                                <h3>Bracelet type: {bracelet.bType}</h3>
                                <h3>Length: {bracelet.bLength}</h3>
                                <h3>Number of colors: {bracelet.numColors}</h3>
                                <h3>{bracelet.startDate} - {bracelet.endDate}</h3>
                                { props.selling
                                    ?
                                    // eventually will have price here!
                                    (<>
                                    </>)
                                    :
                                    (<h3>Where's it going? : {bracelet.goingWhere}</h3>)
                                }


                            </SingleBraceletDiv>
                        )
                    }
            </AllBraceletsDiv>
        </>
    );
}