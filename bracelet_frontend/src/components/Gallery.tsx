import styled from "styled-components";
import { useEffect, useState } from 'react';
import type {Image} from "../interfaces/Image.ts";
import axios from "axios";
import Images from "./Displays/Images.tsx";
import ErrorPage from "./Error.tsx";
import Loading from "./Loading.tsx";
import {useParams} from "react-router";

const ParentDiv=styled.div`
    width: 80vw;
    margin: auto;
    border: 2px darkred inset;
`;

// type RouteParams = {
//     // because the route uses a wildcard
//     "*": string;
//     "year": number;
// };

export default function Gallery() {
    const[data, setData] = useState<Image[]>([]);
    const [err, setErr] = useState<Error | null>(null);
    const params = useParams();
    const currPage = params["*"] ?? "";
    const year = params["year"] ?? "";

    // console.log(currPage)
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
        // if () {
        //
        // }
        // elif (year != null) {
        if (currPage == "Selling") {
            axios.get("/api/images/?selling=true").
            then((res) => setData(res.data)).
            catch((err) => {
                console.log(err);
                setErr(err);
            });
        }
        else if (year != null) {
            axios.get(`/api/images/?year=${year}`)
                .then((res) => setData(res.data))
                .catch((err) => {
                    console.log(err);
                    setErr(err);
                });
        }
        else {
            axios.get("/api/images/")
                .then((res) => setData(res.data))
                .catch((err) => {
                    console.log(err);
                    setErr(err);
                });
        }
    }, [currPage, data.length, year]);

    if(err != null) {
        return (
            <ErrorPage err={err}/>
        );
    }

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