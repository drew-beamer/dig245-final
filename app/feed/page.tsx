'use client';
import React from "react";
import { useEffect, useState } from "react"
import { Waypoint } from "react-waypoint"
import Post from "../../components/post";
import { DogBreed, DogImage } from "../../types/DogImage";
import { Container, Row, Col } from "react-bootstrap";

export default function MyFeed() {
    const [imgArray, setImgArray] = useState<DogImage[]>([]);
    const [postLikes, setPostLikes] = useState<boolean[]>([]);
    const [breedWeights, setBreedWeights] = useState({
        "pug": 1,
        "husky": 1,
        "labrador": 1,
        "hound": 1,
        "corgi": 1
    });

    const onPostLikeChange = (index: number) => {
        const newArray = Array.from(postLikes);
        newArray[index] = !newArray[index]
        setPostLikes(newArray);
        updateBreedWeights(imgArray[index].breed, newArray[index]);
    }

    const updateBreedWeights = (changedBreed: DogBreed, increase: boolean) => {
        let breedWeightsCopy = {...breedWeights};
        if (increase) {
            breedWeightsCopy[changedBreed] += 1;
        } else {
            breedWeightsCopy[changedBreed] -= 1;
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

    useEffect(() => {
        loadFiveDogs();
        setPostLikes([false, false, false, false, false])
    }, []);

    function postsFromDogImageArray(array: DogImage[], keyStartIndex: number) {
        return array.map((item, index) => <Row key={index + keyStartIndex}>
            <Col xs={0} sm={1} md={3} lg={4}></Col>
            <Col xs={12} sm={10} md={6} lg={4}>
                <Post url={item.url} breed={item.breed} updateLike={onPostLikeChange} index={index} liked={postLikes[index]} />
            </Col>
            <Col xs={0} sm={1} md={3} lg={4}></Col>
        </Row>)
    }
    return imgArray.length > 0 ? <div>
        <Container fluid>
            {postsFromDogImageArray(imgArray.slice(0, imgArray.length - 2), 0)}
            <Waypoint key={"Waypoint"} onEnter={loadFiveDogs} />
            {postsFromDogImageArray(imgArray.slice(imgArray.length - 2), imgArray.length - 2)}
        </Container>
    </div > : null
}


/*
            <Waypoint key={"Waypoint"} onEnter={loadFiveDogs} />
            {postsFromDogImageArray(imgArray.slice(imgArray.length - 2), imgArray.length - 2)} */