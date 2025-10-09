import styled from "styled-components";
import { useState, useEffect } from 'react';
import type {Bracelet} from "../../interfaces/Bracelet.ts";
import axios from "axios";
import Loading from "../Loading.tsx";
// import AdminBracelets from "./Displays/AdminBracelets.tsx";
import Modal from "./Modal.tsx"

const ParentDiv=styled.div`
    width: 80vw;
    margin: auto;
    border: 2px darkred inset;
`;


const AllBraceletsTable=styled.table`
    justify-content: space-evenly;
    border: 2px aqua;
    justify-self: center;
`;

const SingleBraceletTr = styled.tr`

`;

const StyledTd = styled.td`
    margin: 2% 3%;
`;


const AddBraceletDiv = styled.div`
    display: flex;
    justify-items: center;
`;

const StyledButton = styled.button`
    //background-color: lightblue;
    margin: auto;
    //font: clamp(14px, calc(24px + 2vw), 40px) Georgia, Garamond, serif;
`;


export default function AdminGallery() {
    const[data, setData] = useState<Bracelet[]>([]);
    const[modalOpen, setModalOpen] = useState(false);
    const[activeBracelet, setActiveBracelet] = useState<Bracelet>(
        {
            id: "",
            name: "",
            pattern_url: "",
            bType: "",
            startDate: "",
            endDate: "",
            numColors: 0,
            bLength: "",
            numStrings: 0,
            goingWhere: "",
            price: 0
        }
    );

    function toggle() {
        setModalOpen(!modalOpen);
    }

    function handleSubmit(bracelet:Bracelet) {
        toggle();
        alert("save" + JSON.stringify(bracelet));
    }

    // function handleDelete(bracelet) {
    //     alert("delete" + JSON.stringify(bracelet));
    // }

    function handleCreate() {
        const newBracelet = {
            id: "",
            name: "",
            pattern_url: "",
            bType: "",
            startDate: "",
            endDate: "",
            numColors: 0,
            bLength: "",
            numStrings: 0,
            goingWhere: "",
            price: 0
        };
        setActiveBracelet(newBracelet);
        setModalOpen(true);
    }

    function handleEdit(bracelet:Bracelet) {
        setActiveBracelet(bracelet);
        setModalOpen(true);
    }

    // useEffect hook for error stuff and re-loading
    useEffect(() => {
        axios.get("/api/bracelets/").then((res) => setData(res.data)).catch((err) => console.log(err));
    }, [data.length]);



    if(!data.length) {
        return <Loading />;
    }

    return (
        <ParentDiv>
            <AddBraceletDiv>
                <StyledButton onClick={handleCreate}>Add a Bracelet</StyledButton>
            </AddBraceletDiv>
            <AllBraceletsTable>
                <thead>
                    <tr>
                        {/*<th>Add a bracelet</th>*/}
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((bracelet: Bracelet) =>
                        <SingleBraceletTr key={bracelet.id} >
                            {/*<span>Name:</span>*/}
                            <StyledTd>{bracelet.name}</StyledTd>
                            <StyledTd>
                                <button onClick={ function () {
                                    handleEdit(bracelet);
                                }}
                                >Edit</button>
                            </StyledTd>
                            {/*<td>*/}
                            {/*    <button onClick={ function () {
                                    handleDelete(bracelet);
                                }}>Delete</button>*/}
                            {/*</td>*/}
                        </SingleBraceletTr>
                    )}
                </tbody>
            </AllBraceletsTable>

            {modalOpen ? (
                    <Modal activeBracelet={activeBracelet} toggle={toggle} onSave={handleSubmit} />
                )
                : null}
        </ParentDiv>
    );
}