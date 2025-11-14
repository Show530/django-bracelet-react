import {useEffect, useState} from "react";
import {Link, useParams} from "react-router";

import styled from "styled-components";
import axios from "axios";

import type {Image} from "../interfaces/Image.ts";
import type {Bracelet} from "../interfaces/Bracelet.ts";
import Bracelets from "./Displays/Bracelets.tsx"
import ErrorPage from "./Error.tsx";
import Loading from "./Loading.tsx";

import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";



const StyledImg = styled.img`
    width: 30%;
    display: block;
    margin: 2% auto;
    border-radius: 25px;
`;

const RowDiv = styled.div`
    display: flex;
    flex-direction: row;
    //justify-content: center;
    align-items: center;
`;

type RouteParams = {
    // because the route uses a wildcard
    "*": string;
    // was imagePk
    "imageOrder": string;
    "year": string;
};


export default function ImageDetails() {
    const params = useParams<RouteParams>();

    const fullPattern = params["*"] ?? "";
    // is either Gallery, Selling, or YearGalleries
    const currPage = fullPattern.split("/")[0] as string;
    // const currPage = params["*"] ?? "";
    // was imagePk
    const imageOrder = params["imageOrder"] ?? "";
    const year = params["year"] ?? "";
    const selling = currPage == null ? false : currPage.includes("Selling");

    const [err, setErr] = useState<Error | null>(null);
    const [imageData, setImageData] = useState<Image | null>(null);
    const [braceletData, setBraceletData] = useState<Bracelet[]>([]);
    const [displayPrev, setDisplayPrev] = useState<boolean>(true);
    const [displayNext, setDisplayNext] = useState<boolean>(true);


    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Gallery end/2023End, 2024End, 2025End
                const currEnd: string[]  = ["224", "140", "224"];
                // Gallery start/2023Start, 2024Start, 2025Start
                const currStart: string[] = ["1", "77", "141"];

                // console.log(page);
                // call for getting image data
                const imageRes = await axios.get("/api/images/"+ imageOrder);
                const image = imageRes.data as Image;
                if(!image) {
                    setErr(new Error("Image not found"));
                    return;
                }
                setImageData(image);

                // console.log() check
                console.log("Absolute Image URL:", image.image_url);

                // call to getting all the bracelet pks for the image
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

                    // set prev and next arrow potential, for now no
                    setDisplayPrev(false);
                    setDisplayNext(false);
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
                    
                    // set prev and next arrow potential
                    if(year === "2023") {
                        if (imageOrder === currStart[0]) {
                            setDisplayPrev(false);
                        }
                        else if (imageOrder === currEnd[0]) {
                            setDisplayNext(false);
                        }
                    }
                    else if (year === "2024") {
                        if (imageOrder === currStart[1]) {
                            setDisplayPrev(false);
                        }
                        else if (imageOrder === currEnd[1]) {
                            setDisplayNext(false);
                        }
                    }
                    else if (year === "2025") {
                        if (imageOrder === currStart[2]) {
                            setDisplayPrev(false);
                        }
                        else if (imageOrder === currEnd[2]) {
                            setDisplayNext(false);
                        }
                    }
                }

                // set prev and next arrow potential
                if (currPage.includes("Gallery")) {
                    if (imageOrder === currStart[0]) {
                        setDisplayPrev(false);
                    }
                    else if (imageOrder === currEnd[0]) {
                        setDisplayNext(false);
                    }
                }

                // now that all data validation has occurred, set bracelets!
                setBraceletData(currBraceletData);

            }
            catch (err) {
                const e = err as Error;
                setErr(e);
            }
        };
        fetchAllData();
    }, [imageOrder, currPage, selling, year]);

    if(err != null) {
        return (
            <ErrorPage err={err}/>
        );
    }

    if(!braceletData.length) {
        return <Loading where="Details"/>;
    }

    return (
        <>
            {imageData &&
                <RowDiv>
                    {
                        displayPrev
                        ? <>
                            {
                                year
                                ? <Link to={`/${currPage}/${year}/${String(Number(imageOrder) - 1)}`}>
                                        <MdOutlineArrowBackIos />
                                    </Link>
                                :
                                <Link to={`/${currPage}/${String(Number(imageOrder) - 1)}`}>
                                    <MdOutlineArrowBackIos />
                                </Link>
                            }
                            </>
                        : <></>
                    }
                    <StyledImg
                        loading="lazy"
                        src = {imageData.image_url}
                        alt={imageData.caption}
                    />
                    {
                        displayNext
                            ? <>
                                {
                                    year
                                        ? <Link to={`/${currPage}/${year}/${String(Number(imageOrder) + 1)}`}>
                                            <MdOutlineArrowForwardIos />
                                        </Link>
                                        :
                                        <Link to={`/${currPage}/${String(Number(imageOrder) + 1)}`}>
                                            <MdOutlineArrowForwardIos />
                                        </Link>
                                }
                            </>

                            : <></>
                    }
                </RowDiv>
            }
            {braceletData && <Bracelets data={braceletData} selling={selling}/>}
        </>
    );
}