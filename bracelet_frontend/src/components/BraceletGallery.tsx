import Bracelets from "./Displays/Bracelets.tsx";
import styled from "styled-components";
import { useEffect, useState } from 'react';
import type {Bracelet} from "../interfaces/Bracelet.ts";
import axios from "axios";

const ParentDiv=styled.div`
    width: 80vw;
    margin: auto;
    border: 2px darkred inset;
`;

export default function BraceletGallery() {
    const[data, setData] = useState<Bracelet[]>([]);

    // useEffect hook for error stuff and re-loading
    useEffect(() => {
        // async function fetchData(): Promise<void> {
        //     // fix where we're fetching from to axios!
        //     // axios.get("/api/")
        //     // const rawData = await fetch("https://www.amiiboapi.com/api/amiibo/?type=Card");
        //     // axios.get("/api/").set
        //     // const {bracelet} : {bracelet: Bracelet[]} = await rawData.json();
        //     // setData(bracelet);
        // }
        // fetchData()
        //     .then(() => console.log("Fetched data successfully!"))
        //     .catch((e: Error)=> console.log("There was an error: " + e))
        axios.get("/api/bracelets/").then((res) => setData(res.data)).catch((err) => console.log(err));
    }, [data.length]);

    return (
        <ParentDiv>
            <Bracelets data={data} selling={false}/>
        </ParentDiv>
    );
}