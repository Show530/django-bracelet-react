import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import type {Image} from "../interfaces/Image.ts";
import type { YearBounds } from "../interfaces/YearBounds.ts";
import api from "../axiosConfig.ts";

import Images from "./Displays/Images.tsx";
import ErrorPage from "./Error.tsx";
import Loading from "./Loading.tsx";
import {useParams} from "react-router";

const ParentDiv=styled.div`
    width: 80vw;
    margin: auto;
    //border: 2px darkred inset;
    justify-content: center;
`;

// type RouteParams = {
//     // because the route uses a wildcard
//     "*": string;
//     "year": number;
// };


export default function Gallery() {
    const[data, setData] = useState<Image[]>([]);
    const [err, setErr] = useState<Error | null>(null);
    // added for pagination
    const [pageNum, setPageNum] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const params = useParams();
    const currPage = params["*"] ?? "";
    const year = params["year"] ?? "";

    // ref for bottom div for loading
    const bottomDivRef = useRef<HTMLDivElement>(null);

    // useEffect hook for error stuff and re-loading
    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoadingMore(true);
            // Set endpoint to load all data
            try {
                let currEndpoint = `/images/?page=${pageNum}`;

                // if on the gallery selling page, load that data
                if (currPage === "Selling") {
                    currEndpoint = `/images/?selling=true&page=${pageNum}`;
                }
                // if on the gallery year page, load that data
                else if (year !== "") {
                    // checking for year boundaries compared to year in url
                    // validates on load
                    if (pageNum === 1) {
                        const response = await api.get('/year-boundaries/');
                        const yearBoundsRes: YearBounds = response.data;

                        if (!(year in yearBoundsRes)) {
                            setErr(new Error("Gallery year mismatch"));
                            return;
                        }
                    }
                    currEndpoint = `/images/?year=${year}&page=${pageNum}`;
                }
                
                // load data
                const res = await api.get(currEndpoint)
                if(pageNum === 1) {
                    setData(res.data.results);
                }
                else {
                    setData(prev => [...prev, ...res.data.results]);
                }

                setHasMorePages(res.data.next !== null);
            }
            catch (err) {
                console.log(err);
                setErr(err as Error);
            }
            finally{
                setIsLoadingMore(false);
            }
        };

        fetchAllData();
        
    }, [currPage, year, pageNum]);

    // useEffect for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // when bottom div is visible and more pages exist
                if (entries[0].isIntersecting && hasMorePages && !isLoadingMore) {
                    setPageNum(prev => prev + 1);
                }
            },
            {
                // triggers when 10% of the bottom div is visible
                threshold: 0.1,
                // start loading 100px before reaching bottom of screen
                rootMargin: '100px',
            }
        );

        const currBottom = bottomDivRef.current;
        if (currBottom) {
            observer.observe(currBottom);
        }

        return () => {
            if (currBottom) {
                observer.unobserve(currBottom);
            }
        }
    }, [hasMorePages, isLoadingMore]);

    // useEffect to reset pagination when route changes
    // so that no issues happen between pages
    useEffect(() => {
        setPageNum(1);
        setData([]);
        setHasMorePages(true);
    }, [currPage, year]);

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
            {
                hasMorePages && 
                <div ref={bottomDivRef} style={{height: '10px'}}></div>
            }
            
            {
                isLoadingMore && 
                    <Loading where="more images"/>
            }
        </ParentDiv>
    );

}