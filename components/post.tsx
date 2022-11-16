import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DogBreed } from "../types/DogImage";
import { Box, Typography, Grid } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface PostProps {
    url: string,
    breed: DogBreed,
    updateLike: (index: number) => void
    index: number,
    liked: boolean
}

export default function Post({ url, breed, updateLike, liked, index }: PostProps) {

    let first = true;


    const styledBreed = breed.charAt(0).toUpperCase() + breed.slice(1);
    return <Box>
        <img src={url} alt={`${breed}`} style={{
            maxHeight: "d",
            width: "100%",
            borderRadius: "25px"
        }} onClick={(e) => {
            if (e.detail == 2) {
                if (!liked) {
                    updateLike(index);
                }
            }
        }} />
        {liked ? <Favorite sx={{ fontSize: "50px" }} onClick={() => {
            console.log("weight decreasing");
            updateLike(index)

        }} /> : <FavoriteBorder sx={{ fontSize: "50px" }} onClick={() => {
            console.log("weight increasing")
            updateLike(index)
            console.log("here")

        }} />}
        <h3 style={{ lineHeight: "0", fontSize: "36px" }}>{`${styledBreed}`}</h3>
        <h4 style={{ lineHeight: "0" }}>Show me more</h4>
    </Box >

}

/*

*/