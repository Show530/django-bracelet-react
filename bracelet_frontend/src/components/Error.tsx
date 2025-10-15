
interface errProps {
    err: Error;
}

export default function ErrorPage({err}: errProps) {
    // This page doesn't exist-
    // ie trying to access 2023 with 2025 primary key

    // database is down!!
    if(err) {
        if(err.message === ("Request failed with status code 500")) {
            return <h2>Having issues connecting to the database!</h2>
        }
        else if (err.message === ("Image not found")) {
            return <h2>Having issues finding the image.</h2>;
        }
        else if (err.message === ("No selling bracelets")) {
            return (
                <>
                    <h2>No bracelets are being sold for this image.</h2>
                    <p>Did you change the url?</p>
                </>
            );
        }
        else if(err.message === ("Year mismatch")) {
            return (
                <>
                    <h2>The image selected has no bracelets from the year in the url.</h2>
                    <p>Did you change the url?</p>
                </>
            );
        }
        else {
            return (
                <h2>There was an error!</h2>
            );
        }
    }

    // General error
    return (
        <h2>There was an error!</h2>
    );
}