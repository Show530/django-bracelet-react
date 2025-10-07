import styled from 'styled-components';
// import {Bracelet} from "../interfaces/Bracelet.ts";
import type {Bracelet} from '../../interfaces/Bracelet.ts';
import SingleBracelet from './SingleBracelet.tsx';

const AllBraceletsDiv=styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    border: 2px aqua;
`;

// const SingleBraceletDiv=styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     max-width: 35%;
//     padding: 1%;
//     margin: 1%;
//     //font: calc(20px + 5vw) Georgia, Garamond, serif;
//     //Copperplate, fantasy
//     text-align: center;
//     border: 1px inset green;
//     color: #544B6C;
//     //overflow-wrap: break-word;
// `;

// const StyledH3 = styled.h3 `
//     word-wrap: break-word;
// `;

// const StyledItem = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     // keeps label close to value
//     gap: 0.2rem;
// `;
//
// const StyledLabel = styled.h3 `
//     //font-size: 1.5rem;
//     font: clamp(12px, calc(18px + 1vw), 28px) Georgia, Garamond, serif;
//     color: #666;
//     text-transform: lowercase;
//     letter-spacing: 0.03em;
// `;
//
// const StyledVal = styled.h3 `
//     //font-size: 3rem;
//     font: clamp(14px, calc(24px + 2vw), 32px) Georgia, Garamond, serif;
//     font-weight: 500;
//     color: #111;
//
//     // handling url overflow
//     word-break: break-word;
//     overflow-wrap: anywhere;
//
// `;

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
                            <SingleBracelet key={bracelet.id} bracelet={bracelet} selling={props.selling}/>
                        )
                    }
            </AllBraceletsDiv>
        </>
    );
}