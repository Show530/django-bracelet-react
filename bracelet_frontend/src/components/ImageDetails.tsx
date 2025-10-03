import {useEffect, useState} from "react";
import type {Image} from "../interfaces/Image.ts";
import type {Bracelet} from "../interfaces/Bracelet.ts";
import axios from "axios";
import Bracelets from "./Displays/Bracelets.tsx"
import {useParams} from "react-router";
import styled from "styled-components";


const StyledImg = styled.img`
    width: 30%;
    display: block;
    margin: 2% auto;
    border-radius: 25px;
`;

export default function ImageDetails() {
    const { imagePk } = useParams<{ imagePk: string }>();
    const [imageData, setImageData] = useState<Image | null>(null);
    const [braceletPks, setBraceletPks] = useState<number[]>([]);
    const [braceletData, setBraceletData] = useState<Bracelet[]>([]);

    // useEffect for getting image data
    useEffect(() => {
        axios.get("/api/images/"+ imagePk).then((res) => setImageData(res.data)).catch((err) => console.log(err));
            // console.log();
    }, [imagePk]);

    useEffect(() => {
        if (imageData) {
            const currBraceletPks: number[] = [];
            imageData.bracelets.forEach((bracelet) => {
                currBraceletPks.push(bracelet.id);
            });
            // or could do imageData.bracelets.map((bracelet) => bracelet.id);
            // with no currBraceletPks
            setBraceletPks(currBraceletPks);
        }
    }, [imageData]);

    useEffect(() => {
        const fetchBracelets = async () => {
            try {
                const responses = await Promise.all(
                    braceletPks.map((braceletPk) =>
                        axios.get(`/api/bracelets/${braceletPk}/`)
                    )
                );

                const currBraceletData = responses.map((res) => res.data);
                setBraceletData(currBraceletData);
            } catch (err) {
                console.error("Error fetching bracelets", err);
            }
        };
        fetchBracelets();

    }, [braceletPks]);

    return (
      <>
          {imageData &&
              <StyledImg
              loading="lazy"
              src = {imageData.image_file}
              alt={imageData.caption}
              />
          }
          {braceletData && <Bracelets data={braceletData} selling={false}/>}
      </>
    );
}