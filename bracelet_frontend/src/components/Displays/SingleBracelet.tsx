import styled from 'styled-components';
import type {Bracelet} from '../../interfaces/Bracelet.ts';

const SingleBraceletDiv=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 35%;
    padding: 1%;
    margin: 1%;
    //font: calc(20px + 5vw) Georgia, Garamond, serif;
    //Copperplate, fantasy
    text-align: center;
    border: 1px inset green;
    color: #544B6C;
    //overflow-wrap: break-word;
`;

const StyledItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    // keeps label close to value
    gap: 0.2rem;
`;

const StyledLabel = styled.h3 `
    //font-size: 1.5rem;
    font: clamp(12px, calc(18px + 1vw), 28px) Georgia, Garamond, serif;
    color: #666;
    text-transform: lowercase;
    letter-spacing: 0.03em;
`;

const StyledVal = styled.h3 `
    //font-size: 3rem;
    font: clamp(14px, calc(24px + 2vw), 32px) Georgia, Garamond, serif;
    font-weight: 500;
    color: #111;

    // handling url overflow
    word-break: break-word;
    overflow-wrap: anywhere;
    
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

export default function SingleBracelet(props:{bracelet:Bracelet, selling: boolean}) {
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

    return (
        // Inspiration from https://chuckdries.com/
        <SingleBraceletDiv>
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
            { props.selling
                ?
                // eventually will have price here!
                (<>
                </>)
                :
                (<StyledItem>
                    <StyledLabel>Where's it going?:</StyledLabel>
                    <StyledVal>{goingWhere}</StyledVal>
                </StyledItem>)
            }
        </SingleBraceletDiv>
    );

}