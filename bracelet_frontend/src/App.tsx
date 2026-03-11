// import { useState } from 'react'
// Gallery view
// year by year: so 2023, 2024, 2025
// Bracelets that are being sold
import {createBrowserRouter, Route, RouterProvider, Routes} from "react-router";
import ProtectedRoute from "./components/Navbar/ProtectedRoute.tsx";
import Header from "./components/Header.tsx"
import Footer from "./components/Footer";

import Home from "./components/Home.tsx";
import YearGalleries from "./components/YearGalleries.tsx";
import About from "./components/About";

import AdminGallery from "./components/AdminRelated/AdminGallery.tsx";
import AdminBracelets from "./components/AdminRelated/AdminBracelets.tsx";
import styled from "styled-components";
import Gallery from "./components/Gallery.tsx";
import ImageDetails from "./components/ImageDetails.tsx";
import Landing from "./auth/login.tsx";
import AdminImages from "./components/AdminRelated/AdminImages.tsx";
import ErrorPage from "./components/Error.tsx"

const StyledPageWrapper = styled.div`
    //width: 80vw;
    //background-color: pink;
    //background-color: #D4CDF4; c3beb6
    // background-color: #acb5b3;
    background: linear-gradient(
        180deg,
        #e6ecea 0%,
        #dde5e2 100%
        );


    margin: auto;
    font-size: calc(1px + 1.2vw);
    font-family: Georgia, Garamond, serif;
    //min-height: 100vh;
    min-height: 100dvh;

    //maybe
    display: flex;
    flex-direction: column;
`;

const StyledContent = styled.div`
    width: 80vw;
    margin: auto;

    flex: 1;
    display: flex;
    flex-direction: column;
`;


const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

function Root() {

    const fourHundErr = new Error("404 page");
    return (
      <>
        <StyledPageWrapper>
            <Header />
            <StyledContent>
                <StyledMain>
                    <Routes>
                        <Route path={`/`} element={<Home/>}/>
                        <Route path={`/Gallery`} element={<Gallery/>}/>
                        {/*was imagePk*/}
                        <Route path={`/Gallery/:imageOrder`} element={<ImageDetails/>} />

                        <Route path={`/YearGalleries`} element={<YearGalleries/>}/>
                        <Route path={`/YearGalleries/:year`} element={<Gallery/>}/>
                        {/*was imagePk*/}
                        <Route path={`/YearGalleries/:year/:imageOrder`} element={<ImageDetails/>}/>

                        <Route path={`/Selling`} element={<Gallery/>}/>
                        {/*was imagePk*/}
                        <Route path={`/Selling/:imageOrder`} element={<ImageDetails/>} />

                        <Route path={'/About'} element={<About/>} />
                        <Route path={'/AdminGallery'} element={
                            <ProtectedRoute requireStaff={true}>
                                <AdminGallery />
                            </ProtectedRoute>
                            } />
                        <Route path={'/AdminGallery/Images'} element={
                            <ProtectedRoute requireStaff={true}>
                                <AdminImages />
                            </ProtectedRoute>
                            } />
                        <Route path={'/AdminGallery/Bracelets'} element={
                            <ProtectedRoute requireStaff={true}>
                                <AdminBracelets />
                            </ProtectedRoute>
                            } />
                        <Route path={'/Login'} element={<Landing/>}/>
                        <Route path='*' element={<ErrorPage err={fourHundErr}/>}/>
                    </Routes>
                </StyledMain>
            </StyledContent>
            <Footer/>
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

