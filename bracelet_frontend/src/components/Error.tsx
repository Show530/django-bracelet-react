
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
        return <h2>${err.message}</h2>;
    }

    // General error
    return (
        <h2>There was an error!</h2>
    );
}