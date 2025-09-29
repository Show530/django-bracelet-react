import styled from 'styled-components';
// import {Bracelet} from "../interfaces/Bracelet.ts";
import type {Bracelet} from '../interfaces/Bracelet.ts';

const AllBraceletsDiv=styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
`;

const SingleBraceletDiv=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 15%;
    padding: 3%;
    margin: 1%;
    font: calc(2px + 1vw) Copperplate, fantasy;
    text-align: center;
    border: 1px inset indianred;
`;

// <h2>Name</h2>
// <h3>Pattern</h3>
// <h3>Bracelet Type</h3>
// <h3>Length</h3>
// <h3>Number of colors</h3>
// <h3>Start date</h3>
// <h3>End date</h3>
// <h3>Going where?</h3>

export default function Bracelets(props: {data: Bracelet[]}) {
// export default function Bracelets() {
    return (
        <>
            <AllBraceletsDiv>
                <SingleBraceletDiv>
                    {
                        props.data.map((bracelet: Bracelet) =>
                            <SingleBraceletDiv key={bracelet.id}>
                                <h2>Name: {bracelet.name}</h2>
                                <h3>Pattern: {bracelet.pattern_url}</h3>
                                <h3>Bracelet type: {bracelet.bType}</h3>
                                <h3>Length: {bracelet.bLength}</h3>
                                <h3>Number of colors: {bracelet.numColors}</h3>
                                <h3>{bracelet.startDate} - {bracelet.endDate}</h3>
                                <h3>Where's it going? : {bracelet.goingWhere}</h3>
                            </SingleBraceletDiv>
                        )
                    }
                </SingleBraceletDiv>
            </AllBraceletsDiv>
        </>
    );
}