import { Grid, Box } from "@mui/material";
import { useState } from "react"
import { Waypoint } from "react-waypoint"
import Post from "../components/post";
import { DogBreed, DogImage } from "../types/DogImage";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getImages } from "./api/fetch-dogs";

export default function MyFeed({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [imgArray, setImgArray] = useState<DogImage[]>(data);
    const [postLikes, setPostLikes] = useState<boolean[]>([false, false, false, false, false]);
    const [breedWeights, setBreedWeights] = useState({
        "pug": 20,
        "husky": 20,
        "labrador": 20,
        "hound": 20,
        "corgi": 20
    });

    const onPostLikeChange = (index: number) => {
        const newArray = Array.from(postLikes);
        newArray[index] = !newArray[index]
        setPostLikes(newArray);
        updateBreedWeights(imgArray[index].breed, newArray[index]);
    }

    const updateBreedWeights = (changedBreed: DogBreed, increase: boolean) => {
        const breeds = Object.keys(breedWeights) as DogBreed[]
        let breedWeightsCopy = {} as typeof breedWeights

        let zeroCount = 0
        breeds.forEach((breed) => {
            if (breedWeights[breed] === 0) {
                zeroCount += 1
            }
        })
        if (increase) {
            breeds.forEach((breed) => {
                if (breed === changedBreed && breedWeights[breed] !== 100) {
                    breedWeightsCopy[breed] = breedWeights[breed] + (4 - zeroCount);
                } else if (breedWeights[breed] !== 0) {
                    breedWeightsCopy[breed] = breedWeights[breed] - 1;
                } else {
                    breedWeightsCopy[breed] = 0;
                }
            })
        } else {
            breeds.forEach((breed) => {
                if (breed === changedBreed && breedWeights[changedBreed] >= 4) {
                    breedWeightsCopy[breed] = breedWeights[breed] - 4
                } else if (breedWeights[changedBreed] >= 4) {
                    breedWeightsCopy[breed] = breedWeights[breed] + 1
                }
            })
        }

        setBreedWeights(breedWeightsCopy)
    }

    function loadFiveDogs(): void {
        const raw = JSON.stringify(breedWeights);
        const requestOptions = {
            method: 'POST',
            body: raw,
        };
        try {
            fetch(window.location.origin + "/api/fetch-dogs", requestOptions)
                .then((res) => res.json())
                .then((json) => {
                    setImgArray([...imgArray, ...json.images])
                })
        } catch (err) {
            console.log(err)
            console.log("Error loading images")
        }

    }

    return imgArray.length > 0 ? <Box sx={{ pt: 2, px: 1 }}>
        <Grid container spacing={3} >
            {imgArray.slice(0, imgArray.length - 2).map((item, index) => <>
                <Grid item lg={4} md={3} sm={1} sx={{ display: { xs: "none", sm: "grid" } }}></Grid>
                <Grid item lg={4} md={6} sm={10} xs={12}>
                    <Post url={item.url} breed={item.breed} updateLike={onPostLikeChange} index={index} liked={postLikes[index]} />
                </Grid>

                <Grid item lg={4} md={3} sm={1} sx={{ display: { xs: "none", sm: "grid" } }}></Grid>
            </>)}
            <Waypoint onEnter={loadFiveDogs} />
            {imgArray.slice(imgArray.length - 2).map((item, index) => <>
                <Grid item lg={4} md={3} sm={1} sx={{ display: { xs: "none", sm: "grid" } }}></Grid>
                <Grid item lg={4} md={6} sm={10} xs={12}>
                    <Post url={item.url} breed={item.breed} updateLike={onPostLikeChange} index={index} liked={postLikes[index]} />
                </Grid>

                <Grid item lg={4} md={3} sm={1} sx={{ display: { xs: "none", sm: "grid" } }}></Grid>
            </>)
            }
        </Grid>
    </Box> : null
}


export const getServerSideProps: GetServerSideProps<{ data: DogImage[] }> = async (context) => {

    const startingWeights = {
        "hound": 20,
        "corgi": 20,
        "pug": 20,
        "husky": 20,
        "labrador": 20
    };

    const data = getImages(startingWeights);

    return {
        props: { data }
    }
}


