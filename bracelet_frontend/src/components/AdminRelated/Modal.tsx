import styled from 'styled-components';
import React, {useState } from 'react';
import type {Bracelet} from '../../interfaces/Bracelet.ts';

// Followed
// https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react

interface CustomModalProps {
    activeBracelet: Bracelet;
    toggle: () => void;
    onSave: (item: Bracelet) => void;
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
  width: 40%;
  //max-width: 2000px;
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
  font-size: clamp(14px, calc(24px + 2vw), 40px);
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Select = styled.select`
    padding: 0.5rem;
    font-size: clamp(14px, calc(24px + 2vw), 40px);
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

export default function Modal({ activeBracelet, toggle, onSave }: CustomModalProps) {
    const [bracelet, setBracelet] = useState(activeBracelet);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBracelet(
            { ...bracelet,
                [name]: value}
        );
    };

    return (
        <Overlay>
            <ModalContainer>
                <ModalHeader>
                    Bracelet item
                    <CloseButton onClick={toggle}>&times;</CloseButton>
                </ModalHeader>
                <form>
                    <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={bracelet.name || ""}
                            onChange={handleChange}
                            placeholder="Enter Bracelet name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="patternURL">Pattern URL</Label>
                        <Input
                            type="text"
                            id="patternURL"
                            name="patternURL"
                            value={bracelet.pattern_url || ""}
                            onChange={handleChange}
                            placeholder="Enter Pattern URL"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="bType">Bracelet Type</Label>
                        <Select
                            id="bType"
                            name="bType"
                            value={bracelet.bType || ""}
                            onChange={handleChange}
                        >
                            <option value="">Select type...</option>
                            <option value="A">Alpha</option>
                            <option value="N">Normal</option>
                            <option value="M">Macrame</option>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={bracelet.startDate || ""}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={bracelet.endDate || ""}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="numColors">Number of Colors</Label>
                        <Input
                            type="number"
                            id="numColors"
                            name="numColors"
                            value={bracelet.numColors || ""}
                            min={0}
                            step={1}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="bLength">Bracelet Length</Label>
                        <Select
                            id="bLength"
                            name="bLength"
                            value={bracelet.bLength || ""}
                            onChange={handleChange}
                        >
                            <option value="">Select length...</option>
                            <option value="AC">Airpod case</option>
                            <option value="A">Anklet</option>
                            <option value="BE">Belt</option>
                            <option value="B">Bracelet</option>
                            <option value="BM">Bookmark</option>
                            <option value="CS">Chapstick holder</option>
                            <option value="C">Choker</option>
                            <option value="H">Hairpiece</option>
                            <option value="K">Keychain</option>
                            <option value="P">Patch</option>
                            <option value="W">Wallhanging</option>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="numStrings">Number of Strings</Label>
                        <Input
                            type="number"
                            id="numStrings"
                            name="numStrings"
                            value={bracelet.numStrings || ""}
                            min={0}
                            step={1}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="goingWhere">Where is it going?</Label>
                        <Select
                            id="goingWhere"
                            name="goingWhere"
                            value={bracelet.goingWhere || ""}
                            onChange={handleChange}
                        >
                            <option value="">Select place...</option>
                            <option value="K">Keeping</option>
                            <option value="GI">Giving away</option>
                            <option value="GA">Gave away</option>
                            <option value="SE">Selling</option>
                            <option value="SO">Sold</option>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="price">Price</Label>
                        <Input
                            type="number"
                            id="price"
                            name="price"
                            value={bracelet.price || ""}
                            min={0}
                            step={1}
                            onChange={handleChange}
                        />
                    </FormGroup>


                    <Footer>
                        <Button onClick={toggle}>Cancel</Button>
                        <Button $primary onClick={() => onSave(bracelet)}>
                            Save
                        </Button>
                    </Footer>
                </form>
            </ModalContainer>
        </Overlay>
    );
}
