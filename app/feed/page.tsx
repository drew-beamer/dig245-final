'use client';
import React from "react";
import { useEffect, useState } from "react"
import { Waypoint } from "react-waypoint"
import Post from "../../components/post";
import { DogBreed, DogImage } from "../../types/DogImage";
import { Container, Row, Col } from "react-bootstrap";
import Popup from "../../components/popup";
import { Bar } from "react-chartjs-2";

// getting some a weird unmount error, solution found: https://stackoverflow.com/questions/68100325/canvas-is-already-in-use-chart-with-id-0-must-be-destroyed-before-the-canvas
import "chart.js/auto";
import Navbar from "../../components/navbar";

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
    const [popupShow, setPopupShow] = useState(false);

    const handlePopupClose = () => {
        setPopupShow(false)
    }

    const onPostLikeChange = (index: number) => {
        const newArray = Array.from(postLikes);
        newArray[index] = !newArray[index]
        setPostLikes(newArray);
        updateBreedWeights(imgArray[index].breed, newArray[index]);
    }

    const updateBreedWeights = (changedBreed: DogBreed, increase: boolean) => {
        let breedWeightsCopy = { ...breedWeights };
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
        setPostLikes([false, false, false, false, false]);
        setPopupShow(true);
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
        <Navbar />
        {popupShow ? <Popup closeFunction={handlePopupClose}>
            <Row>
                <Col xs={12}>
                    <h3 style={{ color: "#333" }}>My Stats</h3>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={5}>
                    <p>Wow...you really like Hounds!

                        You  probably picked up on it by now...Hound isn’t real. Hound exists to illustrate just how quickly social media algorithms can create “filter bubbles,” or show you only content that you agree with or like.  The bar chart to shows your total number of likes by each of the five dogs present in the app, while the pie chart shows the frequency at which breeds of dogs were being fetched as new images were loaded in.
                    </p>
                </Col>
                <Col xs={12} md={7}>
                    <div style={{ width: "100%", height: "234px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Bar id="like-distribution" options={{
                            plugins: {
                                legend: {
                                    position: "bottom"
                                }
                            },
                            indexAxis: 'y' as const,
                            responsive: true,
                        }} data={{
                            labels: ["Hounds", "Huskys", "Corgis", "Pugs", "Labradors"],
                            datasets: [{
                                label: "Total Likes",
                                data: [15, 12, 6, 3, 1]
                            }]
                        }} />
                    </div>

                </Col>
            </Row>
            <Row style={{ marginTop: "30px" }}>
                <Col xs={12} md={7}>
                    <p>chart will go here</p>
                </Col>
                <Col xs={12} md={5}>

                    <p>The algorithm I am using is very simple. Bigger social networks utilize other user data in order to recommend new content. However, I can’t do that, as Hound does not have a database. So I use the relative percentage of your likes from the current session as “weights.”

                        The numbers in the pie chart can be attained by adding one to the number of likes for each of the breeds, and then dividing the number for one breed by the sum for all breeds.</p>
                </Col>
            </Row>
        </Popup> : null}
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

/*



*/