import styled from "styled-components";


interface errProps {
    err: Error;
}

const StyledDiv = styled.div`
    margin: 1%;
`;

const StyledText = styled.h2`
    margin: auto;
    text-align: center;
    font-size: ${({theme}) => theme.text.body};
`;

const StyledSmaller = styled.p`
    margin: auto;
    text-align: center;
    font-size: ${({theme}) => theme.text.label};
`;


export default function ErrorPage({err}: errProps) {
    // This page doesn't exist-
    // ie trying to access 2023 with 2025 primary key

    // database is down!!
    if(err) {
        if (err.message === ("404 page")) {
            return (
                <StyledDiv>
                    <StyledText>404 - Page not found</StyledText>
                </StyledDiv>
            );
        }
        else if(err.message === ("Request failed with status code 500")) {
            return (
                <StyledDiv>
                    <StyledText>Having issues connecting to the database!</StyledText>
                </StyledDiv>
            );
        }
        else if (err.message === ("Image not found")) {
            return (
                <StyledDiv>
                    <StyledText>Having issues finding the image.</StyledText>
                </StyledDiv>
                );
        }
        else if (err.message === ("No selling bracelets")) {
            return (
                <StyledDiv>
                    <StyledText>No bracelets are being sold for this image.</StyledText>
                    <StyledSmaller>Did you change the url?</StyledSmaller>
                </StyledDiv>
            );
        }
        else if(err.message === ("Year mismatch")) {
            return (
                <StyledDiv>
                    <StyledText>The image selected has no bracelets from the year in the url.</StyledText>
                    <StyledSmaller>Did you change the url?</StyledSmaller>
                </StyledDiv>
            );
        }
        else {
            return (
                <StyledDiv>
                     <StyledText>There was an error!</StyledText>
                </StyledDiv>
            );
        }
    }

    // General error
    return (
        <StyledDiv>
            <StyledText>There was an error!</StyledText>
        </StyledDiv>
    );
}