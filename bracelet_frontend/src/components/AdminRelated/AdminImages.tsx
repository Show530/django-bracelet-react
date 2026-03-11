import styled from "styled-components";
import { useState, useEffect } from "react";
import api from "../../axiosConfig.ts";

import type { Image } from "../../interfaces/Image.ts";
import type { Bracelet } from "../../interfaces/Bracelet.ts";

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

const SingleImageTr = styled.tr`
    &:nth-child(even) {
        background-color: #dde5e2;
    }
`;

const StyledText = styled.p`
    font-size: ${({theme}) => theme.text.body};
    margin: auto;
`;

const StyledCaptions = styled(StyledText)`
    overflow-wrap: break-word;
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

const StyledPrevNextDiv = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 1%;
`;

// 
export default function AdminImages() {
    const params = useParams();
    const currPage = params["*"] ?? "";

    const[data, setData] = useState<Image[]>([]);
    // added for pagination
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [prevPage, setPrevPage] = useState<string | null>(null);
    const [nextPage, setNextPage] = useState<string | null>(null);

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

    // pageNumber is a default value- if specified, it will ignore
    async function refreshList(pageNumber = 1) {
        try {
            const res = await api.get(`/images/?ordering=-order&page=${pageNumber}`);
            // console.log(res.data);
            setTotalPages(Math.ceil(res.data.count / 24 ))
            setData(res.data.results);
            setPrevPage(res.data.previous);
            setNextPage(res.data.next);
            setPageNum(pageNumber);
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

    async function handleSubmit(image:Image | undefined, imageFile: File | null, caption: string, selectedBracelets: Bracelet[] | null) {
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

            if (selectedBracelets) {
                // const braceletIds = selectedBracelets.map(bracelet => bracelet.id);
                // formData.append("bracelet_ids", JSON.stringify(braceletIds));
                selectedBracelets.forEach(bracelet => {
                    formData.append("bracelet_ids", bracelet.id.toString());
                });
            }

            if(mode === "edit" && image?.order) {
                // trying patch because no data is edited
                // patch works if no data is changed, put requires at least one changed field
                await api.patch(`/images/${image.order}/`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
                );
            }
            else { 
                await api.post('/images/', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
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

    // async function handleDelete(image) {
    //     try {
    //         await axios.delete(`/api/images/${image.order}`);
    //         await refreshList();
    //     }
    //     catch (err) {
    //         console.log("Error when handling delete: ", err);
    //     }
    //     // alert("delete" + JSON.stringify(image));
    // }

    function createImage() {
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
                        <SingleImageTr key={image.id} >
                            <StyledTd>
                                <StyledCaptions>{image.caption}</StyledCaptions>
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
                                    handleDelete(image);
                                }}>Delete</button>*/}
                            {/*</td>*/}
                        </SingleImageTr>
                    )}
                </tbody>
            </AllImagesTable>
            <StyledPrevNextDiv>
                {
                    totalPages > 1 && (
                        <StyledText>Page {pageNum} of {totalPages}</StyledText>
                    )
                }
            </StyledPrevNextDiv>

            <StyledPrevNextDiv>
                {prevPage && (
                    <StyledButton onClick={() => refreshList(pageNum - 1)}>
                        <StyledText>Previous</StyledText>
                    </StyledButton>
                )}

                {nextPage && (
                    <StyledButton onClick={() => refreshList(pageNum + 1)}>
                        <StyledText>Next</StyledText>
                    </StyledButton>
                )}
            </StyledPrevNextDiv>

            {modalOpen ? (
                    <ImageModal mode={mode} activeImage={activeImage} toggle={toggle} onSave={handleSubmit} />
                )
                : null}
        </ParentDiv>
    );
}