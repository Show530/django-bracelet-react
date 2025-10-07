// import { useState } from 'react'
// Gallery view
// year by year: so 2023, 2024, 2025
// Bracelets that are being sold
import {createBrowserRouter, Route, RouterProvider, Routes} from "react-router";
// import Nav from "./components/Navbar/Nav.tsx";
import Header from "./components/Header.tsx"

import Home from "./components/Home.tsx";
import YearGalleries from "./components/YearGalleries.tsx";
import Selling from "./components/Selling.tsx";
import BraceletGallery from "./components/BraceletGallery.tsx";
import styled from "styled-components";
import Gallery from "./components/Gallery.tsx";
import ImageDetails from "./components/ImageDetails.tsx";

const StyledFullPage = styled.div`
    background-color: #D4CDF4;
`;

const StyledPageWrapper = styled.div`
    //width: 80vw;
    //background-color: pink;
    margin: auto;
    font-size: calc(1px + 1.2vw);
    font-family: Georgia, Garamond, serif;
    min-height: 100vh;
`;

const StyledContent = styled.div`
    width: 80vw;
    background-color: #D4CDF4;
    margin: auto;
`;

// const StyledContainer = styled.div`
//     width: 100%;
//     display: flex;
//     flex-direction: row;
//
//     @media screen and (max-width: 900px) {
//         flex-direction: column;
//         justify-content: center;
//     }
// `;

const StyledMain = styled.main`
    //display: flex;
    //flex-direction: column;
    //width: 70%;
    //padding: 2vw;
    //height: 100vh;
    width: 100%;

    //@media screen and (max-width: 800px) {
    //    width: 100%;
    //}
`;

function Root() {

  return (
      <>
        <StyledFullPage>
            <StyledPageWrapper>
                <Header />
                <StyledContent>
                    <StyledMain>
                        <Routes>
                            <Route path={`/`} element={<Home/>}/>
                            {/* Change Image Gallery to just Gallery*/}
                            <Route path={`/Gallery`} element={<Gallery/>}/>
                            <Route path={'/BraceletGallery'} element={<BraceletGallery/>} />

                            <Route path={`/Gallery/:imagePk`} element={<ImageDetails/>} />

                            <Route path={`/YearGalleries`} element={<YearGalleries/>}/>
                            <Route path={`/Selling`} element={<Selling/>}/>
                        </Routes>
                    </StyledMain>
                    <footer></footer>
                </StyledContent>
            </StyledPageWrapper>
        </StyledFullPage>
        </>
  );
}

const router = createBrowserRouter(
    [{path: "*", Component: Root}]
);

function App() {
  return <RouterProvider router={router} />;
}

export default App

