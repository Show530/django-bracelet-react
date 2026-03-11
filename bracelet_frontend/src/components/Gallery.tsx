import styled from "styled-components";
import { useEffect, useState } from "react";
import type {Image} from "../interfaces/Image.ts";
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

const ButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledButton = styled.button`
    //background-color: lightblue;
    text-align: center;
    margin: 1%;
    border-radius: 10px;
    background-color: none;

    &:hover {
        //color: #503E2A;
        background-color: #a7aea9;
    }
`;

const ButtonText = styled.p`
    font-size: ${({theme}) => theme.text.body};
    margin: 0;
`;

export default function Gallery() {
    const[data, setData] = useState<Image[]>([]);
    const [err, setErr] = useState<Error | null>(null);
    // added for pagination
    const [pageNum, setPageNum] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(true);

    const params = useParams();
    const currPage = params["*"] ?? "";
    const year = params["year"] ?? "";

    // useEffect hook for error stuff and re-loading
    useEffect(() => {
        const fetchAllData = async () => {
            // if on the gallery selling page, load that data
            if (currPage == "Selling") {
                await api.get(`/images/?selling=true&page=${pageNum}`).
                then((res) => {
                    if(pageNum === 1) {
                        setData(res.data.results);
                        
                    }
                    else {
                        setData(prev => [...prev, ...res.data.results]);
                    }
                    setHasMorePages(res.data.next !== null);
                }).
                catch((err) => {
                    console.log(err);
                    setErr(err);
                });
            }
            // if on the gallery year page, load that data
            else if (year != null) {
                await api.get(`/images/?year=${year}&page=${pageNum}`)
                    .then((res) => {
                        if(pageNum === 1) {
                            setData(res.data.results);
                        }
                        else {
                            setData(prev => [...prev, ...res.data.results]);
                        }
                        setHasMorePages(res.data.next !== null);
                    })
                    .catch((err) => {
                        console.log(err);
                        setErr(err);
                    });
            }
            // otherwise load all image data
            else {
                await api.get(`/images/?page=${pageNum}`)
                    .then((res) => {
                        if(pageNum === 1) {
                            setData(res.data.results);
                        }
                        else {
                            setData(prev => [...prev, ...res.data.results]);
                        }
                        setHasMorePages(res.data.next !== null);
                    })
                    .catch((err) => {
                        console.log(err);
                        setErr(err);
                    });
            }
        }
        fetchAllData();
        
    }, [currPage, year, pageNum]);

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
            <ButtonDiv>
                {hasMorePages && 
                    <StyledButton onClick={() => setPageNum(prev => prev + 1)}>
                        <ButtonText>Load More</ButtonText>
                    </StyledButton>
                }
            </ButtonDiv>
        </ParentDiv>
    );

}