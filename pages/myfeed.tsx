import { Grid, Box } from "@mui/material";
import { useEffect, useState } from "react"
import { Waypoint } from "react-waypoint"
import Post from "../components/post";
import { DogBreed, DogImage } from "../types/DogImage";
import DogImages from "../json/DogImages.json"

export default function MyFeed() {
    const [imgArray, setImgArray] = useState<DogImage[]>([]);
    const [postLikes, setPostLikes] = useState<boolean[]>([])
    const [breedWeights, setBreedWeights] = useState({
        "pug": 20,
        "husky": 20,
        "labrador": 20,
        "hound": 20,
        "corgi": 20
    })

    useEffect(() => {
        function selectBreedEven(): DogBreed {
            const breeds: DogBreed[] = ['corgi', 'husky', 'hound', 'labrador', 'pug'];
            let random = Math.random();
            for (let i = 0; i < breeds.length; i++) {
                if (random < 1 / breeds.length) {
                    return breeds[i]
                } else {
                    random -= 1 / breeds.length
                }
            }
            throw "This shouldn't be reached"
        }

        let data = []

        for (let i = 0; i < 10; i++) {
            const breed: DogBreed = selectBreedEven();
            const random = Math.floor(Math.random() * DogImages[breed].length + 1)
            const url: string = DogImages[breed][random]
            data.push({
                "url": url,
                "breed": breed
            })
        }
        let likeInit = [];
        for (let i = 0; i < data.length; i++) {
            likeInit.push(false)
        }

        setImgArray(data);
        setPostLikes(likeInit);
    }, [])

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

    return imgArray.length > 0 ? <Box sx={{ p: 1, pt: 2 }}>
        <Grid container spacing={3} >
            {imgArray.slice(0, imgArray.length - 5).map((item, index) => <>
                <Grid item lg={4} md={3} sm={1} sx={{ display: { xs: "none", sm: "grid" } }}></Grid>
                <Grid item lg={4} md={6} sm={10} xs={12}>
                    <Post url={item.url} breed={item.breed} updateLike={onPostLikeChange} index={index} liked={postLikes[index]} />
                </Grid>

                <Grid item lg={4} md={3} sm={1} sx={{ display: { xs: "none", sm: "grid" } }}></Grid>
            </>)}
            <Waypoint onEnter={loadFiveDogs} />
            {imgArray.slice(imgArray.length - 5).map((item, index) => <>
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