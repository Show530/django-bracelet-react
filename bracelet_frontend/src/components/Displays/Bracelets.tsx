import styled from 'styled-components';
// import {Bracelet} from "../interfaces/Bracelet.ts";
import type {Bracelet} from '../../interfaces/Bracelet.ts';
import SingleBracelet from './SingleBracelet.tsx';

const AllBraceletsDiv=styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    padding: 1rem;
    margin: 0 auto;
    justify-content: center;
    // max-width: 1400px;
    // added
    width: 100%;
    
    @media (max-width: 800px) {
        padding: 1rem 0.5rem;
        gap: 1rem;
    }
`;


export default function Bracelets(props: {data: Bracelet[], num: number, selling: boolean}) {

    return (
        <>
            <AllBraceletsDiv>
                    {
                        props.data.map((bracelet: Bracelet) =>
                            <SingleBracelet key={bracelet.id} bracelet={bracelet} num={props.num} selling={props.selling}/>
                        )
                    }
            </AllBraceletsDiv>
        </>
    );
}