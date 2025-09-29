import Bracelets from "../components/Bracelets.tsx";
import styled from "styled-components";
import { useEffect, useState } from 'react';
import type {Bracelet} from "../interfaces/Bracelet.ts";

const ParentDiv=styled.div`
    width: 80vw;
    margin: auto;
    //border: 2px darkred inset;
`;

export default function Gallery() {
    const[data, setData] = useState<Bracelet[]>([]);

    // useEffect hook for error stuff and re-loading
    useEffect(() => {
        async function fetchData(): Promise<void> {
            // fix where we're fetching from to axios!
            const rawData = await fetch("https://www.amiiboapi.com/api/amiibo/?type=Card");
            const {bracelet} : {bracelet: Bracelet[]} = await rawData.json();
            setData(bracelet);
        }
        fetchData()
            .then(() => console.log("Fetched data successfully!"))
            .catch((e: Error)=> console.log("There was an error: " + e))
    }, [data.length]);

    return (
        <ParentDiv>
            <Bracelets data={data}/>
        </ParentDiv>
    );
}