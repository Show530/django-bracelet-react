import styled from 'styled-components';
import {Link} from "react-router";
import {useState, useEffect} from "react";
import axios from "axios";
import type {Image} from "../interfaces/Image.ts";
import ErrorPage from "./Error.tsx";
import Loading from "./Loading.tsx";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-items: center;
`;

const StyledLink = styled(Link)`
    padding: 1%;
    margin: auto;
`;

const StyledImgH1Div = styled.div`
    justify-content: center;
    margin: auto;
`;

const StyledImg = styled.img`
    display: block;
    margin: auto;
    max-width: 70%;
    height: auto;
    border-radius: 25px;
    
    // CSS to make fade in
    transition: opacity 0.5s ease-in-out;
    opacity: 0;

    &.loaded {
        opacity: 1;
    }
`;

const StyledH1 = styled.h1`
    font: clamp(22px, calc(18px + 2vw), 34px) Georgia, Garamond, serif;
    margin: auto;
    text-align: center;
`;

export default function YearGalleries() {
    const [randomTwentyThree, setRandomTwentyThree] = useState<Image | null>(null);
    const [randomTwentyFour, setRandomTwentyFour] = useState<Image | null>(null);
    const [randomTwentyFive, setRandomTwentyFive] = useState<Image | null>(null);

    const [err, setErr] = useState<Error | null>(null);

    // const [loadedCount, setLoadedCount] = useState(0);
    // const allLoaded = loadedCount === 3;
    //
    // const handleImageLoad = () => {
    //     setLoadedCount(prev => prev + 1);
    // };

    // useEffect onload to set data
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [res23, res24, res25] = await Promise.all([
                    axios.get("api/images/?favorite=true&year=2023"),
                    axios.get("api/images/?favorite=true&year=2024"),
                    axios.get("api/images/?favorite=true&year=2025")
                ]);

                const getRandomImage = (arr: Image[]) => arr[Math.floor(Math.random() * arr.length)];
                setRandomTwentyThree(getRandomImage(res23.data));
                setRandomTwentyFour(getRandomImage(res24.data));
                setRandomTwentyFive(getRandomImage(res25.data));
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

    if(!randomTwentyThree && !randomTwentyFour && !randomTwentyFive) {
        return (
            <Loading where="Year Galleries"/>
        );
    }

    return (

      <StyledDiv>
          <StyledImgH1Div>
              <StyledLink to="/YearGalleries/2023">
                  <StyledImgH1Div>
                      { randomTwentyThree &&
                          <StyledImg
                              loading="lazy"
                              src={randomTwentyThree.image_url}
                              alt={randomTwentyThree.caption}
                              // when image is loaded, set the class to loaded to put the opacity back to 1
                              onLoad={(event) => event.currentTarget.classList.add("loaded")}
                          />
                      }
                      <StyledH1>2023</StyledH1>
                  </StyledImgH1Div>
              </StyledLink>
          </StyledImgH1Div>

          <StyledImgH1Div>
              <StyledLink to="/YearGalleries/2024">
                  <StyledImgH1Div>
                      { randomTwentyFour &&
                          <StyledImg
                              loading="lazy"
                              src={randomTwentyFour.image_url}
                              alt={randomTwentyFour.caption}
                              // when image is loaded, set the class to loaded to put the opacity back to 1
                              onLoad={(event) => event.currentTarget.classList.add("loaded")}
                          />
                      }
                      <StyledH1>2024</StyledH1>
                  </StyledImgH1Div>
              </StyledLink>
          </StyledImgH1Div>

          <StyledImgH1Div>
              <StyledLink to="/YearGalleries/2025">
                  <div>
                      { randomTwentyFive &&
                          <StyledImg
                              loading="lazy"
                              src={randomTwentyFive.image_url}
                              alt={randomTwentyFive.caption}
                              // when image is loaded, set the class to loaded to put the opacity back to 1
                              onLoad={(event) => event.currentTarget.classList.add("loaded")}
                          />
                      }
                      <StyledH1>2025</StyledH1>
                  </div>
              </StyledLink>
          </StyledImgH1Div>
      </StyledDiv>
    );
}