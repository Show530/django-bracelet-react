import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

import type { Bracelet } from "../../interfaces/Bracelet.ts";
import ErrorPage from "../Error.tsx";
import Loading from "../Loading.tsx";
import BraceletModal from "./BraceletModal.tsx"
import { useParams } from "react-router";


const ParentDiv=styled.div`
    margin: auto;
`;


const AllBraceletsTable=styled.table`
    width: 55%;
    table-layout: fixed;
    justify-content: space-evenly;
    justify-self: center;
    background-color: white;
    border-radius: 19px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    padding: 1%;
`;

const StyledNameTh = styled.th`
    width: 85%;
    padding: 2% 2%;
    background-color: rgba(156, 178, 171, 0.82);
`;

const StyledEditTh = styled.th`
    width: 80px;
    background-color: rgba(156, 178, 171, 0.82);
`;

const SingleBraceletTr = styled.tr`
    &:nth-child(even) {
        background-color: #dde5e2;
    }
`;

const StyledText = styled.p`
    font-size: ${({theme}) => theme.text.body};
    margin: auto;
`;

const StyledTd = styled.td`
    margin: 2% 3%;
    padding: 1.5%;
`;

const EditTd = styled(StyledTd)`
    text-align: right;
    white-space: nowrap;
`;


const AddBraceletDiv = styled.div`
    display: flex;
    justify-items: center;
    margin: 1%;
`;

const StyledButton = styled.button`
    //background-color: lightblue;
    margin: auto;
    border-radius: 10px;
    background-color: none;

    &:hover {
        //color: #503E2A;
        background-color: #a7aea9;
    }
`;



// idea- when creating bracelet, add image to database/link them??
// make sure that fields in form can be null (aren't mandatory)
export default function AdminBracelets() {
    const params = useParams();
    const currPage = params["*"] ?? "";
    const[data, setData] = useState<Bracelet[]>([]);
    const [err, setErr] = useState<Error | null>(null);
    const[modalOpen, setModalOpen] = useState(false);
    const[activeBracelet, setActiveBracelet] = useState<Bracelet>(
        {
            id: "",
            order: "",
            name: "",
            pattern_url: "",
            bType: "",
            startDate: "",
            endDate: "",
            numColors: 0,
            bLength: "",
            numStrings: 0,
            goingWhere: "",
            price: 0,
        }
    );

    useEffect(function () {
        refreshList();
    }, []);

    async function refreshList() {
        try {
            const res = await axios.get("/api/bracelets/?ordering=-order");
            setData(res.data);
        }
        catch (err) {
            console.log("Error when refreshing list: ", err);
            setErr(err as Error);
        }
        // axios.get("/api/bracelets/")
        //     .then((res) => setData(res.data))
        //     .catch((err) => console.log(err));
    }

    function toggle() {
        setModalOpen(!modalOpen);
    }

    async function handleSubmit(bracelet:Bracelet, imageFile:File|null, caption:string) {
        // close modal
        toggle();
        try {
            // form data to add only edited fields of the bracelet to modify
            const formData = new FormData();
            for (const[key, value] of Object.entries(bracelet)) {
                if (value !== null && value !== undefined) {
                    formData.append(key, value);
                }

            }

            // add image if added
            if(imageFile){
                formData.append("image_file", imageFile);
                if (caption != "") {
                    formData.append("caption", caption)
                }
            }
            // const multHeaders = { "Content-Type": "multipart/form-data" };

            // if bracelet exist: put request
            // send database request WITH access_token
            if (bracelet.id) {
                // await axios.put(`/api/bracelets/${bracelet.id}/`, bracelet);
                // console.log(Object.fromEntries(formData.entries()));
                await axios.put(`/api/bracelets/${bracelet.id}/`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
                );
            }
            // if bracelet does not exist- post request
            else {
                // await axios.post(`/api/bracelets/`, bracelet);
                // console.log(Object.fromEntries(formData.entries()));
                await axios.post('/api/bracelets/', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
                );
            }
            await refreshList();
        }
        catch (err) {
            console.log("Error when handling submit: ", err);
        }
        // alert("save" + JSON.stringify(bracelet));
    }

    // async function handleDelete(bracelet) {
    //     try {
    //         await axios.delete(`/api/bracelets/${bracelet.id}`);
    //         await refreshList();
    //     }
    //     catch (err) {
    //         console.log("Error when handling delete: ", err);
    //     }
    //     // alert("delete" + JSON.stringify(bracelet));
    // }

    function createBracelet() {
        const newBracelet = {
            id: "",
            order: "",
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

    function editBracelet(bracelet:Bracelet) {
        setActiveBracelet(bracelet);
        setModalOpen(true);
    }

    // useEffect hook for error stuff and re-loading
    // useEffect(() => {
    //     axios.get("/api/bracelets/").then((res) => setData(res.data)).catch((err) => console.log(err));
    // }, [data.length]);

    if(err != null) {
        return (
            <ErrorPage err={err}/>
        );
    }

    if(!data.length) {
        return <Loading where={currPage}/>;
    }


    return (
        <ParentDiv>
            <AddBraceletDiv>
                <StyledButton onClick={createBracelet}>
                    <StyledText>Add a Bracelet</StyledText>
                </StyledButton>
            </AddBraceletDiv>
            <AllBraceletsTable>
                <thead>
                    <tr>
                        <StyledNameTh><StyledText>Name</StyledText></StyledNameTh>
                        <StyledEditTh></StyledEditTh>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((bracelet: Bracelet) =>
                        <SingleBraceletTr key={bracelet.id} >
                            <StyledTd>
                                <StyledText>{bracelet.name}</StyledText>
                            </StyledTd>
                            <EditTd>
                                <StyledButton onClick={ function () {
                                    editBracelet(bracelet);
                                }}>
                                    <StyledText>Edit</StyledText>
                                </StyledButton>
                            </EditTd>
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
                    <BraceletModal activeBracelet={activeBracelet} toggle={toggle} onSave={handleSubmit} />
                )
                : null}
        </ParentDiv>
    );
}