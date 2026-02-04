// import { useState, useEffect } from 'react';
import { useAuth } from "../auth/AuthContext.tsx";
import Loading from "./Loading.tsx"

export default function Home() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { isAuthenticated, loading, user } = useAuth();
    // useEffect (() => {
    //     const token = localStorage.getItem('access_token');
    //     // console.log("Token in Home: ", token);
    //     // setIsLoggedIn(!!token);

    // }, []);

    console.log("Is logged in: ", isAuthenticated);

    if (loading) {
        return <Loading where={"home"}/>
    }

    return (
        <>
            <p>
                {
                    isAuthenticated 
                    ? 
                    <>
                        Logged in as {user?.email}
                        {
                            user?.is_staff && <> "staff"</>
                        }
                    </>

                    : 
                    "Not logged in"
                }
                {" "}Some stuff.
            </p>
        </>
    );
}