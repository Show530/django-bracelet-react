import {useEffect, useState} from "react";
import {Link, useParams} from "react-router";

import styled from "styled-components";
import axios from "axios";

import type {Image} from "../interfaces/Image.ts";
import type {Bracelet} from "../interfaces/Bracelet.ts";
import type {YearBounds} from "../interfaces/YearBounds.ts"
import Bracelets from "./Displays/Bracelets.tsx"
import ErrorPage from "./Error.tsx";
import Loading from "./Loading.tsx";

import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router";

const StyledImg = styled.img`
    width: 40%;
    display: block;
    margin: 2% auto;
    border-radius: 25px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
`;

const RowDiv = styled.div`
    display: flex;
    flex-direction: row;
    //justify-content: center;
    align-items: center;
    justify-content: space-evenly;
    margin: auto;
`;

// const AnimatedLink = L`

// `

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
    const [numBracelets, setNumBracelets] = useState(0);

    const [displayPrev, setDisplayPrev] = useState<boolean>(true);
    const [displayNext, setDisplayNext] = useState<boolean>(true);
    const navigate = useNavigate();

    // useEffect that collects/sets the data
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // setting arrays for start/end arrows
                const response = await axios.get('/api/year-boundaries/');
                const yearBoundsRes: YearBounds = response.data;
        

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
                // if this means that there are no bracelets, throw an error;
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
                    // if image is at the start of the set- no prev arrow
                    // if image is at the end of the set- no next arrow
                    // otherwise, set both to true! Need to reset

                    if (year in yearBoundsRes){                        
                        if (imageOrder === yearBoundsRes[year].start.toString()) {
                            setDisplayPrev(false);
                        }
                        else if (imageOrder === yearBoundsRes[year].end.toString()) {
                            setDisplayNext(false);
                        }
                        else {
                            setDisplayPrev(true);
                            setDisplayNext(true);
                        }
                    }
                }
                if (currPage.includes("Gallery")) {
                    const allYears = Object.keys(yearBoundsRes).sort();
                    const firstYear = allYears[0];
                    const lastYear = allYears[allYears.length - 1]

                    if (imageOrder === yearBoundsRes[firstYear].start.toString()) {
                        setDisplayPrev(false);
                    }
                    else if (imageOrder === yearBoundsRes[lastYear].end.toString()) {
                        setDisplayNext(false);
                    }
                    else {
                        setDisplayPrev(true);
                        setDisplayNext(true);
                    }
                }
                setNumBracelets(currBraceletData.length);

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


    // useEffect for button clicks:
    useEffect(()=> {

        const handleKeyPress = (event: KeyboardEvent) =>  {
            // if left arrow key is clicked and previous page is possible
            if (event.key === 'ArrowLeft' && displayPrev) {
                // if year, navigate to year page
                if(year) {
                    navigate(`/${currPage}/${year}/${String(Number(imageOrder) - 1)}`);
                }
                // else navigate to gallery page
                else {
                    navigate(`/${currPage}/${String(Number(imageOrder) - 1)}`);
                }
            }
            // if right arrow key is clicked and next page is possible
            if (event.key === 'ArrowRight' && displayNext) {
                // if year, navigate to year page
                if(year) {
                    navigate(`/${currPage}/${year}/${String(Number(imageOrder) + 1)}`);
                }
                // else navigate to gallery page
                else {
                    navigate(`/${currPage}/${String(Number(imageOrder) + 1)}`);
                }
            }
        }

        // Add event listener- adds handlekeypress as function
        window.addEventListener('keydown', handleKeyPress);

        // Cleanup - remove listener when component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };

    }, [displayPrev, displayNext, year, currPage, imageOrder]);


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
                        ?
                            <>
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
                        :
                            <></>
                    }
                    <StyledImg
                        loading="lazy"
                        src = {imageData.image_url}
                        alt={imageData.caption}
                    />
                    {
                        displayNext
                            ?
                            <>
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
                            :
                            <></>
                    }
                </RowDiv>
            }
            {braceletData && <Bracelets data={braceletData} num={numBracelets} selling={selling}/>}
        </>
    );
}