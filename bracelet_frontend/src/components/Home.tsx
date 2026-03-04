import { useAuth } from "../auth/AuthContext.tsx";

import Loading from "./Loading.tsx"
import ErrorPage from './Error.tsx';

// swiper gallery functionality
import { useState, useEffect } from 'react';
import axios from "axios";
import type {Image} from "../interfaces/Image.ts"
import FavoriteImageSlides from "./Displays/FavoriteImageSlides.tsx";

export default function Home() {
    // const { isAuthenticated, loading, user } = useAuth();
    const { loading } = useAuth();


    const [err, setErr] = useState<Error | null>(null);
    const[imageData, setImageData] = useState<Image[]>([]);
    // const [] = 
    // useEffect (() => {
    //     const token = localStorage.getItem('access_token');
    //     // console.log("Token in Home: ", token);
    //     // setIsLoggedIn(!!token);

    // }, []);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // hard coded to 50 for now
                const imageResp = await axios.get("api/images/?favorite=true&page_size=50");
                const imageRespData = imageResp.data.results;

                if (!imageRespData) {
                    setErr(new Error("Images not found."));
                }
                setImageData(imageRespData);

            }
            catch (err) {
                console.log(err);
                const e = err as Error;
                setErr(e);
            }
        }

        fetchAllData();
    }, []);

    // console.log("Is logged in: ", isAuthenticated);

    if (loading || imageData.length === 0) {
        return <Loading where={"home"}/>
    }

    if(err != null) {
        return <ErrorPage err={err} /> 
    }

    return (
        <FavoriteImageSlides images={imageData}/>
    );
}

// <>
        //     <p>
        //         {
        //             isAuthenticated 
        //             ? 
        //             <>
        //                 Logged in as {user?.email}
        //                 {
        //                     user?.is_staff && <> "staff"</>
        //                 }
        //             </>

        //             : 
        //             "Not logged in"
        //         }
        //         {" "}Some stuff.
        //     </p>
        // </>