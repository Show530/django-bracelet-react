import styled from 'styled-components';
import React, {useState } from 'react';
import type { Image } from '../../interfaces/Image.ts';
// needed to add BraceletImage functionality
import type { Bracelet } from '../../interfaces/Bracelet.ts';
import axios from "axios";

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
        caption: string,
        selectedBracelets: Bracelet[] | null,
     ) => void;
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

const StyledTextLikeLabel = styled.p`
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

// const Select = styled.select`
//     padding: 0.5rem;
//     font-size: ${({theme}) => theme.text.body};
//     border: 1px solid #ccc;
//     border-radius: 6px;
//     background: white;
//     cursor: pointer;

//     &:focus {
//         outline: none;
//         border-color: #888;
//     }
// `;


// BraceletImage functionality
const SearchableSelect = styled.div`
    position: relative;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
`;

const DropdownList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 200px;
    overflow-y: auto;
    background: white;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-top: 4px;
    list-style: none;
    padding: 0;
    z-index: 1000;
`;

const DropdownItem = styled.li`
    padding: 0.5rem;
    cursor: pointer;
    vertical-align: middle;
    
    &:hover {
        background: #f0f0f0;
    }
`;

const SelectedBracelet = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #e8f5e9;
    padding: 6px 12px;
    border-radius: 16px;
    margin: 4px;
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    color: #d32f2f;
    cursor: pointer;
    font-weight: bold;
    
    &:hover {
        color: #b71c1c;
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

    // management for BraceletImage functionality
    const [allBracelets, setAllBracelets] = useState<Bracelet[]>([]);
    const [selectedBracelets, setSelectedBracelets] = useState<Bracelet[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const[loading, setLoading] = useState(true);
    
    // useEffect to get all of the bracelets
    useEffect(() => {
        // Fetch all bracelets and load bracelets linked to image
        const fetchAndConnectBracelets = async () => {
            const res = await axios.get('/api/bracelets/');
            const fetchedBraceletData = res.data
            setAllBracelets(fetchedBraceletData);

            // console.log(allBracelets);

            // Load bracelets linked to image if editing
            if (mode === "edit" && activeImage?.bracelets) {
                const linked = fetchedBraceletData.filter((bracelet: Bracelet) => 
                    activeImage.bracelets.some(allB => allB.id.toString() === bracelet.id.toString())
                );
                setSelectedBracelets(linked);
            }
            else {
                setSelectedBracelets([]);
            }
            };
            setLoading(false);
        fetchAndConnectBracelets();
    }, [mode, activeImage]);

    // useEffect to set images
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

    
    const filteredBracelets = allBracelets.filter(bracelet =>
        bracelet.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) && 
        !selectedBracelets?.some(selectedB => selectedB.id === bracelet.id)
    );

    const addBracelet = (bracelet: Bracelet) => {
        setSelectedBracelets([...selectedBracelets, bracelet]);
        setSearchTerm("");
        setShowDropdown(false);
    };

    const removeBracelet = (braceletId: string) => {
        setSelectedBracelets(selectedBracelets.filter(bracelet => bracelet.id !== braceletId));
    }

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
                            <StyledTextLikeLabel>Current Image:</StyledTextLikeLabel>
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
                    {
                        loading
                        ? 
                        <div>Loading bracelets...</div>
                        :
                        <FormGroup>
                            <StyledTextLikeLabel>Linked Bracelets</StyledTextLikeLabel>
                            <div>
                                {
                                    selectedBracelets.map(bracelet => (
                                        <SelectedBracelet key={bracelet.id}>
                                            <p>{bracelet.name}</p>
                                            <RemoveButton onClick={() => removeBracelet(bracelet.id)}>
                                                x
                                            </RemoveButton>
                                        </SelectedBracelet>
                                    ))
                                }
                            </div> 

                            <SearchableSelect>
                                <SearchInput
                                    placeholder='Search bracelets...'
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setShowDropdown(true);
                                    }}
                                    onFocus={() => setShowDropdown(true)}
                                />

                                {showDropdown && searchTerm && filteredBracelets.length > 0 && (
                                    <DropdownList>
                                        {filteredBracelets.slice(0, 10).map(bracelet => (
                                            <DropdownItem 
                                                key={bracelet.id} 
                                                onClick={() => addBracelet(bracelet)}
                                            >
                                                {bracelet.name}
                                            </DropdownItem>
                                        ))}
                                    </DropdownList>
                                )}
                            </SearchableSelect>
                        </FormGroup>
                    }
                    

                    <Footer>
                        <Button type="button"
                                onClick={toggle}
                        >
                            Cancel
                        </Button>
                        <Button type="button"
                                $primary onClick={() => onSave(image, imageFile, caption, selectedBracelets)}
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
