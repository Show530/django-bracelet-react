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
    //border: 2px darkred inset;
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

    // useEffect hook for error stuff and re-loading
    useEffect(() => {
        const fetchAllData = async () => {
            // if on the gallery selling page, load that data
            if (currPage == "Selling") {
                await axios.get("/api/images/?selling=true").
                then((res) => setData(res.data)).
                catch((err) => {
                    console.log(err);
                    setErr(err);
                });
            }
            // if on the gallery year page, load that data
            else if (year != null) {
                await axios.get(`/api/images/?year=${year}`)
                    .then((res) => setData(res.data))
                    .catch((err) => {
                        console.log(err);
                        setErr(err);
                    });
            }
            // otherwise load all image data
            else {
                await axios.get("/api/images/")
                    .then((res) => setData(res.data))
                    .catch((err) => {
                        console.log(err);
                        setErr(err);
                    });
            }
        }
        fetchAllData();
        
    }, [currPage, data.length, year]);

    if(err != null) {
        return (
            <ErrorPage err={err}/>
        );
    }

    if(!data.length) {
        return (
            <Loading where="Gallery"/>
        );
    }

    return (
        <ParentDiv>
            <Images data={data}/>
        </ParentDiv>
    );

}