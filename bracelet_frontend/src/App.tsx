// import { useState } from 'react'
// Gallery view
// year by year: so 2023, 2024, 2025
// Bracelets that are being sold
import {createBrowserRouter, Route, RouterProvider, Routes} from "react-router";
// import Nav from "./components/Navbar/Nav.tsx";
import Nav from "./components/Navbar/Nav.tsx";

import Home from "./components/Home.tsx";
import YearGalleries from "./components/YearGalleries.tsx";
import Selling from "./components/Selling.tsx";
import Gallery from "./components/Gallery.tsx";
import styled from "styled-components";
import ImageGallery from "./components/ImageGallery.tsx";

const StyledPageWrapper = styled.div`
    width: 80vw;
    background-color: pink;
    margin: auto;
    font-size: calc(1px + 1.2vw);
    font-family: Georgia, Garamond, serif;
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
      <StyledPageWrapper>
        <header></header>
        <div>
            <Nav />
            <StyledMain>
                <Routes>
                    <Route path={`/`} element={<Home/>}/>
                    {/* Change Image Gallery to just Gallery*/}
                    <Route path={`/Gallery`} element={<Gallery/>}/>
                    <Route path={'/ImageGallery'} element={<ImageGallery/>} />

                    <Route path={`/YearGalleries`} element={<YearGalleries/>}/>
                    <Route path={`/Selling`} element={<Selling/>}/>
                </Routes>
            </StyledMain>
        </div>
        <footer></footer>
      </StyledPageWrapper>
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

