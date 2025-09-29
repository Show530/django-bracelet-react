// import { useState } from 'react'
// Gallery view
// year by year: so 2023, 2024, 2025
// Bracelets that are being sold
import {createBrowserRouter, Route, RouterProvider, Routes} from "react-router";
import Nav from "./components/Nav.tsx";
import Home from "./components/Home.tsx";
import YearGalleries from "./components/YearGalleries.tsx";
import Selling from "./components/Selling.tsx";
import Gallery from "./components/Gallery.tsx";

function Root() {

  return (
    <>
      <div>
        <header></header>
        <div>
            <Nav></Nav>
            <main>
                <Routes>
                    <Route path={`/`} element={<Home/>}/>
                    <Route path={`/Gallery`} element={<Gallery/>}/>
                    <Route path={`/YearGalleries`} element={<YearGalleries/>}/>
                    <Route path={`/Selling`} element={<Selling/>}/>
                </Routes>
            </main>
        </div>
        <footer></footer>
      </div>
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

