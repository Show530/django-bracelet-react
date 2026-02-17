import styled from 'styled-components';
import type {Bracelet} from '../../interfaces/Bracelet.ts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useAuth } from '../../auth/AuthContext.tsx';

const StyledCard = styled(Card) `
    width: 100px; 
    max-width: 360px; 
    min-width: 280px; 
    height: 100%; 
    border-radius: 16px; 
    margin: 0 auto;
    // mobile row formatting
    @media (max-width: 800px) {
        width: calc(100% - 1rem);
        max-width: 400px;
    }
`;

const StyledItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    // keeps label close to value
    gap: 0.2rem;
    // width: 100%;
`;

const StyledLabel = styled.h3 `
    //font-size: 1.5rem;
    font-size: ${({theme}) => theme.text.label};
    color: #666;
    text-transform: lowercase;
    letter-spacing: 0.03em;
`;

const StyledVal = styled.h3 `
    //font-size: 3rem;
    font-size: ${({theme}) => theme.text.value};
    font-weight: 500;
    color: #111;

    // handling url overflow
    word-break: break-word;
    overflow-wrap: anywhere;
    text-align: center;
    
`;

function switchbType(bType:string) {
    switch (bType) {
        case "A":
            return "Alpha";
        case "N":
            return "Normal";
        default:
            return "Macreme";
    }
}

function switchLength(bLength:string) {
    switch (bLength) {
        case "AC":
            return "Airpod case";
        case "A":
            return "Anklet";
        case "BE":
            return "Belt";
        case "B":
            return "Bracelet";
        case "BM":
            return "Bookmark";
        case "CS":
            return "Chapstick holder";
        case "C":
            return "Choker";
        case "H":
            return "Hairpiece";
        case "K":
            return "Keychain";
        case "P":
            return "Patch";
        case "W":
            return "Wallhanging";
        default:
            return "Unknown"
    }
}

function switchGoingWhere(goingWhere:string) {
    switch (goingWhere) {
        case "K":
            return "Keeping";
        case "GI":
            return "Giving away";
        case "GA":
            return "Gave away";
        case "SE":
            return "Selling";
        case "SO":
            return "Sold";
        default:
            return "Unknown";
    }
}


export default function SingleBracelet(props:{bracelet:Bracelet, num: number, selling: boolean}) {
    // const {isAuthenticated, user} = useAuth();
    const {isAuthenticated} = useAuth();

    let bType;
    if (props.bracelet && props.bracelet.bType) {
        bType= switchbType(props.bracelet.bType);
    }

    let bLength;
    if (props.bracelet && props.bracelet.bLength) {
        bLength= switchLength(props.bracelet.bLength);
    }

    let goingWhere;
    if (props.bracelet && props.bracelet.goingWhere) {
        goingWhere = switchGoingWhere(props.bracelet.goingWhere);
    }
    
    const myEmail = "accsophsories@gmail.com"
    const subject = "Looking to purchase " + props.bracelet.name
    const body = `Hi!\n\nI’m interested in purchasing this item: \nName: ${props.bracelet.name}\nID: ${props.bracelet.id}\nLength: ${bLength}\nColors: ${ props.bracelet.numColors}\nPrice: \$${props.bracelet.price}
    \nMy details:\nName: \nShipping location: \nAdditional information (if any): 
    \nThanks!`

    const mailToUrl = `mailto:${myEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
// \n\n Link: ${} 
    

    return (
        // Inspiration from https://chuckdries.com/
        <StyledCard elevation={3}>
                <CardContent>
                    <StyledItem>
                        <StyledLabel>Name:</StyledLabel>
                        <StyledVal>{props.bracelet.name}</StyledVal>
                    </StyledItem>
                    {props.bracelet.pattern_url && (
                        <>
                            <StyledItem>
                                <StyledLabel>Pattern:</StyledLabel>
                                <StyledVal>
                                    <a href={props.bracelet.pattern_url} target="_blank">
                                        {props.bracelet.pattern_url}
                                    </a>
                                </StyledVal>
                            </StyledItem>
                        </>
                    )
                    }
                    <StyledItem>
                        <StyledLabel>Bracelet type:</StyledLabel>
                        <StyledVal>{bType}</StyledVal>
                    </StyledItem>
                    <StyledItem>
                        <StyledLabel>Length:</StyledLabel>
                        <StyledVal>{bLength}</StyledVal>
                    </StyledItem>
                    <StyledItem>
                        <StyledLabel>Number of colors:</StyledLabel>
                        <StyledVal>{props.bracelet.numColors}</StyledVal>
                    </StyledItem>
                    <StyledItem>
                        <StyledLabel>Dates created:</StyledLabel>
                        <StyledVal>{props.bracelet.startDate} - {props.bracelet.endDate}</StyledVal>
                    </StyledItem>
                    {/* only show price if on selling page */}
                    { props.selling &&
                        (
                            <StyledItem>
                                <StyledLabel>Price:</StyledLabel>
                                <StyledVal>${props.bracelet.price}</StyledVal>
                            </StyledItem>
                        )
                    }
                    { isAuthenticated && props.selling && (
                        <StyledItem> 
                            <a href={mailToUrl} target="_blank" rel="noopener noreferrer">
                                <StyledLabel>Send a request email</StyledLabel>
                            </a>
                        </StyledItem>
                        )
                    }
                    { !props.selling && 
                        (<StyledItem>
                            <StyledLabel>Where's it going?:</StyledLabel>
                            <StyledVal>{goingWhere}</StyledVal>
                        </StyledItem>)
                    }
                </CardContent>
            </StyledCard>
    );
}