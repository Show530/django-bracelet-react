import { useAuth } from "../auth/AuthContext.tsx";

import Loading from "./Loading.tsx"
import ErrorPage from './Error.tsx';

// swiper gallery functionality
import { useState, useEffect } from 'react';
import api from "../axiosConfig.ts";
import type {Image} from "../interfaces/Image.ts"
import FavoriteImageSlides from "./Displays/FavoriteImageSlides.tsx";

export default function Home() {
    // const { isAuthenticated, loading, user } = useAuth();
    const { loading } = useAuth();
    const [err, setErr] = useState<Error | null>(null);
    const[imageData, setImageData] = useState<Image[]>([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // hard coded to 50 for now
                const imageResp = await api.get("/images/?favorite=true&page_size=50");
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
    if (err != null) {
        return <ErrorPage err={err} /> 
    }

    if (loading || imageData.length === 0) {
        return <Loading where={"home"}/>
    }

    return (
        <FavoriteImageSlides images={imageData}/>
    );
}