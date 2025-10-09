import Images from "./Displays/Images.tsx";
import styled from "styled-components";
import { useEffect, useState } from 'react';
import type {Image} from "../interfaces/Image.ts";
import axios from "axios";
import Loading from "./Loading.tsx";
import {useParams} from "react-router";

const ParentDiv=styled.div`
    width: 80vw;
    margin: auto;
    border: 2px darkred inset;
`;

export default function Gallery() {
    const[data, setData] = useState<Image[]>([]);
    const params = useParams();
    const year = params["year"] ?? "";

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
        if (year != null) {
            axios.get(`/api/images/?year=${year}`).then((res) => setData(res.data)).catch((err) => console.log(err));
        }
        else {
            axios.get("/api/images/").then((res) => setData(res.data)).catch((err) => console.log(err));
        }
    }, [data.length, year]);

    if(!data.length) {
        return (
            <Loading/>
        );
    }

    return (
        <ParentDiv>
            <Images data={data}/>
        </ParentDiv>
    );

}