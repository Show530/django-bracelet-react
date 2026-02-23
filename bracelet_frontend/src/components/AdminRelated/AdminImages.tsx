import styled from "styled-components";
import { useState, useEffect } from 'react';
import axios from "axios";

import type { Image } from "../../interfaces/Image.ts";
import ErrorPage from "../Error.tsx";
import Loading from "../Loading.tsx";
import ImageModal from "./ImageModal.tsx"
import { useParams } from "react-router";


const ParentDiv=styled.div`
    margin: auto;
`;


const AllImagesTable=styled.table`
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


const AddImageDiv = styled.div`
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



// 
export default function AdminImages() {
    const params = useParams();
    const currPage = params["*"] ?? "";

    const[data, setData] = useState<Image[]>([]);
    const [err, setErr] = useState<Error | null>(null);
    const[modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [activeImage, setActiveImage] = useState<Image | undefined>(undefined);
    // const[activeImage, setActiveImage] = useState<Image>(
    //     {
    //         id: "",
    //         order: "",
    //         image_file: "",
    //         image_url: "",
    //         caption: "",
    //         bracelets : [],
    //     }
    // );

    useEffect(function () {
        refreshList();
    }, []);

    async function refreshList() {
        try {
            const res = await axios.get("/api/images/");
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

    async function handleSubmit(image:Image | undefined, imageFile: File | null, caption: string) {
        // close modal
        toggle();
        try {
            // form data to add only edited fields of the images to modify
            const formData = new FormData();

            if (caption) {
                formData.append("caption", caption);
            }

            if (imageFile) {
                formData.append("image_file", imageFile);
            }

            if(mode === "edit" && image?.id) {
                await axios.put(`/api/images/${image.order}/`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
                );
            }
            else { 
                await axios.post('/api/images/', formData, {
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

    function createImage() {
        // const newImage = {
        //     id: "",
        //     order: "",
        //     image_file: "",
        //     image_url: "",
        //     caption: "",
        //     bracelets : [],
        // };
        // setActiveImage(newImage);
        setMode("create");
        setActiveImage(undefined);
        setModalOpen(true);
    }

    function editImage(image:Image) {
        setMode("edit");
        setActiveImage(image);
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
            <AddImageDiv>
                <StyledButton onClick={createImage}>
                    <StyledText>Add a Image</StyledText>
                </StyledButton>
            </AddImageDiv>
            <AllImagesTable>
                <thead>
                    <tr>
                        <StyledNameTh><StyledText>Name</StyledText></StyledNameTh>
                        <StyledEditTh></StyledEditTh>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((image: Image) =>
                        <SingleBraceletTr key={image.id} >
                            <StyledTd>
                                <StyledText>{image.caption}</StyledText>
                            </StyledTd>
                            <EditTd>
                                <StyledButton onClick={ function () {
                                    editImage(image);
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
            </AllImagesTable>

            {modalOpen ? (
                    <ImageModal mode={mode} activeImage={activeImage} toggle={toggle} onSave={handleSubmit} />
                )
                : null}
        </ParentDiv>
    );
}