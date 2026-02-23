import styled from 'styled-components';
import React, {useState } from 'react';
import type {Image} from '../../interfaces/Image.ts';
import { createPortal } from "react-dom";
import { useEffect } from 'react';

type Mode = "create" | "edit";

// Followed
// https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react



interface CustomModalProps {
    mode: Mode;
    activeImage?: Image;
    toggle: () => void;
    
    onSave: (
        image: Image | undefined,
        imageFile: File | null,
        caption: string ) => void;
}


const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    background: #fff;
    width: min(600px, 90vw);
    max-height: 90vh;
    overflow-y: auto;
    
    //width: 40%;
    // //max-width: 2000px;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    padding: 1.5rem;
`;

const ModalHeader = styled.h2`
    margin-top: 0;
    margin-bottom: 1rem;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`;

const Label = styled.label`
    margin-bottom: 0.3rem;
    font-weight: 500;
    color: #444;
`;

const Input = styled.input`
    padding: 0.5rem;
    font-size: ${({theme}) => theme.text.body};
    border: 1px solid #ccc;
    border-radius: 6px;
    //width: 100%;

    //&[type="date"] {
    //    height: 2.5rem;
    //    min-height: 40px;
    //}
`;

const Select = styled.select`
    padding: 0.5rem;
    font-size: ${({theme}) => theme.text.body};
    border: 1px solid #ccc;
    border-radius: 6px;
    background: white;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: #888;
    }
`;

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
    gap: 1rem;
`;

const Button = styled.button<{$primary?: boolean}>`
    background: ${($primary) => ($primary ? "#28a745" : "#aaa")};
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.6rem 1.2rem;
    cursor: pointer;
    //font-size: 1rem;
    
    &:hover {
    opacity: 0.9;
    }
`;

export default function ImageModal({ mode, activeImage, toggle, onSave }: CustomModalProps) {
    const [image, setImage] = useState(activeImage);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [caption, setCaption] = useState<string>(activeImage?.caption || "");

    useEffect(() => {
        if (mode === "edit" && activeImage) {
            setImage(activeImage);
            setCaption(activeImage.caption);
        } else {
            setImage({
                id: "",
                order: "",
                image_file: "",
                image_url: "",
                caption: "",
                bracelets: [],
            });
            setCaption("");
        }
    }, [mode, activeImage]);
    
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const { name, value } = e.target;
    //     setImage(
    //         { ...image,
    //             [name]: value}
    //     );
    // };

    // automatically sets image caption based on file name
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        setImageFile(file || null);
        if (file) {
            // keeping extension as the rest of the files in the database do that
            const defaultCaption = file.name;
            // console.log(defaultCaption);
            setCaption(defaultCaption);
        }
    }

    return createPortal(
        <Overlay>
            <ModalContainer>
                <ModalHeader>
                    Image item
                    <CloseButton onClick={toggle}>&times;</CloseButton>
                </ModalHeader>
                <form>
                    {image?.image_url && (
                        <FormGroup>
                            <Label>Current Image:</Label>
                            <img
                                src={image.image_url}
                                alt={image.caption}
                                style={{ maxWidth: "100%", borderRadius: "8px" }}
                            />
                        </FormGroup>
                    )}
                    {/* {imageFile && (
                        <FormGroup>
                            <Label>Current Image:</Label>
                            <img
                                src={imageFile.}
                                alt={image.caption}
                                style={{ maxWidth: "100%", borderRadius: "8px" }}
                            />
                        </FormGroup>
                    )} */}
                    {
                        mode === "create" && 
                        <FormGroup>
                            <Label htmlFor="file">Upload Image:</Label>
                            <Input id="file"
                                name="file"
                                type="file"
                                accept="image/*"
                                // disabled={mode === "edit"}
                                //    onChange={(e) =>
                                //         setImageFile(e.target.files ? e.target.files[0] : null)
                                //     }
                                onChange={handleFileChange}
                                // onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                            />
                        </FormGroup>
                    }
                    
                    <FormGroup>
                        <Label htmlFor="caption">Image Caption:</Label>
                        <Input id="caption"
                               name="caption"
                               type="text"

                               value={caption}
                               onChange={(e) => setCaption(e.target.value)}
                               readOnly
                        />
                    </FormGroup>


                    <Footer>
                        <Button type="button"
                                onClick={toggle}
                        >
                            Cancel
                        </Button>
                        <Button type="button"
                                $primary onClick={() => onSave(image, imageFile, caption)}
                        >
                            Save
                        </Button>
                    </Footer>
                </form>
            </ModalContainer>
        </Overlay>,
        document.body
    );
}
