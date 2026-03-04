import styled from 'styled-components';
import {Link} from "react-router";
import {useState, useEffect} from "react";
import axios from "axios";

import type {Image} from "../interfaces/Image.ts";
import type {YearBounds} from "../interfaces/YearBounds.ts"

import ErrorPage from "./Error.tsx";
import Loading from "./Loading.tsx";

const StyledDiv = styled.div`
    justify-items: center;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    padding: 0.5rem;
    // margin: 2%;

    @media (max-width: 800px) {
        grid-template-columns: 1fr;
    }
`;

const StyledLink = styled(Link)`
    padding: 1%;
    margin: auto;
    
`;

const StyledImgH1Div = styled.div`
    // justify-content: center;
    // margin: auto;
    // display: flex;
    // flex-direction: column;

    align-items: center;
`;

const StyledImg = styled.img`
    display: block;
    margin: auto;
    max-width: 70%;
    height: auto;
    border-radius: 25px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    
    // CSS to make fade in
    transition: opacity 0.5s ease-in-out;
    opacity: 0;

    &.loaded {
        opacity: 1;
    }
`;

const StyledH1 = styled.h1`
    font-size: ${({theme}) => theme.text.subheading};
    margin: auto;
    text-align: center;
`;

interface YearImage {
    year: string;
    image: Image | null;
}

export default function YearGalleries() {
    const [imageYearArr, setImageYearArr] = useState<YearImage[] | null>(null);
    const [err, setErr] = useState<Error | null>(null);

    // const [loadedCount, setLoadedCount] = useState(0);
    // const allLoaded = loadedCount === 3;
    
    // const handleImageLoad = () => {
    //     setLoadedCount(prev => prev + 1);
    // };

    // useEffect onload to set data
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // get year boundaries
                const response = await axios.get('/api/year-boundaries/');
                const yearBoundsRes: YearBounds = response.data;
                const years = Object.keys(yearBoundsRes);
                
                // get data for each year favorite
                const reqs = years.map(year =>
                    axios.get(`api/images/?favorite=true&year=${year}`)
                );
                const resps = await Promise.all(reqs);

                // get random image function
                const getRandomImage = (arr: Image[]) => arr[Math.floor(Math.random() * arr.length)];

                // now sort through to get a random favorite image per year
                // and assign data
                const favsPerYear: YearImage[] = resps.map((res, index) => ({
                    year: years[index],
                    image: res.data.results.length > 0
                            ? getRandomImage(res.data.results)
                            : null
                }));

                // set image and year array
                setImageYearArr(favsPerYear);
            }
            catch (err) {
                console.log(err);
                const e = err as Error;
                setErr(e);
            }
        }

        fetchAllData();
    }, []);

    if(err != null) {
        return (
            <ErrorPage err={err}/>
        );
    }

    if(!imageYearArr) {
        return (
            <Loading where="Year Galleries"/>
        );
    }

    return (

        <StyledDiv>
             { 
                imageYearArr.map(({year, image}) => (
                    <StyledImgH1Div key={year}> 
                        <StyledLink to={`/YearGalleries/${year}`}>
                            <StyledImgH1Div>
                                { image &&
                                    <StyledImg
                                        loading="lazy"
                                        src={image.image_url}
                                        alt={image.caption}
                                        // when image is loaded, set the class to loaded to put the opacity back to 1
                                        // makes load more refined
                                        onLoad={(event) => event.currentTarget.classList.add("loaded")}
                                    />
                                }
                                <StyledH1>{year}</StyledH1>
                            </StyledImgH1Div>
                        </StyledLink>
                    </StyledImgH1Div>
                ))  
            }
         
      </StyledDiv>
    );
}