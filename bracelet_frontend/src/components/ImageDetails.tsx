import {useEffect, useState} from "react";
import {useParams} from "react-router";

import styled from "styled-components";
import axios from "axios";

import type {Image} from "../interfaces/Image.ts";
import type {Bracelet} from "../interfaces/Bracelet.ts";
import Bracelets from "./Displays/Bracelets.tsx"
import ErrorPage from "./Error.tsx";
import Loading from "./Loading.tsx";

const StyledImg = styled.img`
    width: 30%;
    display: block;
    margin: 2% auto;
    border-radius: 25px;
`;

type RouteParams = {
    // because the route uses a wildcard
    "*": string;
    "imagePk": string;
    "year": string;
};


export default function ImageDetails() {
    const params = useParams<RouteParams>();
    // is either Gallery, Selling, or YearGalleries
    const currPage = params["*"] ?? "";
    const imagePk = params["imagePk"] ?? "";
    const year = params["year"] ?? "";
    const selling = currPage == null ? false : currPage.includes("Selling");

    const [err, setErr] = useState<Error | null>(null);
    const [imageData, setImageData] = useState<Image | null>(null);
    const [braceletData, setBraceletData] = useState<Bracelet[]>([]);


    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // call for getting image data

                const imageRes = await axios.get("/api/images/"+ imagePk);
                const image = imageRes.data as Image;
                if(!image) {
                    setErr(new Error("Image not found"));
                    return;
                }
                setImageData(image);
                // axios.get("/api/images/"+ imagePk)
                //     .then((res) => setImageData(res.data))
                //     .catch((err) => {
                //             console.log(err);
                //             setErr(err);
                //         }
                //     );

                // call to getting all the bracelet pks for the image
                // const currBraceletPks: number[] = [];
                // imageData.bracelets.forEach((bracelet) => {
                //     currBraceletPks.push(bracelet.id);
                // });
                const currBraceletPks = image.bracelets.map(bracelet => bracelet.id);

                // get all the bracelets associated with image
                const responses = await Promise.all(
                    currBraceletPks.map((braceletPk) =>
                        axios.get(`/api/bracelets/${braceletPk}/`)
                    )
                );
                let currBraceletData = responses.map((res) => res.data);

                // if the currPage selling, filter out the non-sellable bracelets
                // if this means that there are no bracelets, throw an error:
                // that means the user tampered with the url
                if(selling) {
                    const sellableBracelets = currBraceletData.filter(
                        (bracelet) => bracelet.goingWhere === "SE"
                    );
                    if (sellableBracelets.length == 0) {
                        setErr(new Error("No selling bracelets"));
                    }
                    currBraceletData = sellableBracelets;
                }

                // make sure user didn't tamper with url part 2-
                // if on the year page, validate that the bracelets belong on that page
                if(year) {
                    const braceletYears = currBraceletData
                        .map((bracelet) => bracelet.endDate ? new Date(bracelet.endDate).getFullYear() : null)
                        .filter((yr) => yr != null);

                    // braceletYears = braceletYears.filter((yr) => yr !== null);
                    const atLeastOneYear = braceletYears.some((yr) => yr === Number(year));
                    if(!atLeastOneYear) {
                        console.log("Inconsistent request");
                        setErr(new Error("Year mismatch"))
                    }
                }

                // now that all data validation has occured, set bracelets!
                setBraceletData(currBraceletData);

            }
            catch (err) {
                const e = err as Error;
                setErr(e);
            }
        };
        fetchAllData();
    }, [imagePk, currPage, selling, year]);

    if(err != null) {
        return (
            <ErrorPage err={err}/>
        );
    }

    if(!braceletData.length) {
        return <Loading />;
    }

    return (
        <>
            {imageData &&
                <StyledImg
                    loading="lazy"
                    src = {imageData.image_file}
                    alt={imageData.caption}
                />
            }
            {braceletData && <Bracelets data={braceletData} selling={selling}/>}
        </>
    );
}