'use client';
import React from "react";
import { useEffect, useState } from "react"
import { Waypoint } from "react-waypoint"
import Post from "../../components/post";
import { DogBreed, DogImage } from "../../types/DogImage";
import { Container, Row, Col } from "react-bootstrap";
import Popup from "../../components/popup";
import { Bar, Pie } from "react-chartjs-2";
import styles from "./Feed.module.css";

// getting some a weird unmount error, solution found: https://stackoverflow.com/questions/68100325/canvas-is-already-in-use-chart-with-id-0-must-be-destroyed-before-the-canvas
import "chart.js/auto";
import Navbar from "../../components/navbar";
import { BreedWeights } from "../../types/BreedWeights";
import { BarChartFill } from "react-bootstrap-icons";

interface LikeBarProps {
    breedWeights: BreedWeights;
}

type SortableWeight = [DogBreed, number]


function sortableWeightsFromBreedWeights(breedWeights: BreedWeights): SortableWeight[] {
    // https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
    let sortableWeights = [] as SortableWeight[];
    for (var breed in breedWeights) {
        sortableWeights.push([breed as DogBreed, breedWeights[breed as DogBreed]]);
    }

    sortableWeights.sort((a, b) => {
        return b[1] - a[1];
    });

    return sortableWeights;
}


function LikeBarChart({ breedWeights }: LikeBarProps) {
    const sortableWeights = sortableWeightsFromBreedWeights(breedWeights);
    const labels = sortableWeights.map((weight) => weight[0]);
    const likes = sortableWeights.map((weight) => weight[1] - 1);
    return <div style={{ width: "100%", height: "234px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Bar id="like-distribution" options={{
            plugins: {
                legend: {
                    position: "bottom"
                }
            },
            indexAxis: 'y' as const,
            responsive: true,
        }} data={{
            labels: labels,
            datasets: [{
                label: "Total Likes",
                data: likes
            }]
        }} />
    </div>
}

function FrequencyPieChart({ breedWeights }: { breedWeights: BreedWeights }) {
    const total = Object.values(breedWeights).reduce((a, b) => a + b);
    const sortableWeights = sortableWeightsFromBreedWeights(breedWeights);
    const labels = sortableWeights.map((weight) => weight[0]);
    const percentages = sortableWeights.map((weight) => Math.round(100 * weight[1] / total))
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Current % of New Images",
                data: percentages,
                borderWidth: 1
            }
        ]
    }

    return <div style={{ width: "100%", height: "234px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Pie options={{
            responsive: true,
            plugins: {
                legend: {
                    position: "right"
                }
            },
            maintainAspectRatio: false
        }
        } data={data} height={"100%"} width={"100%"} />
    </div>
}



export default function MyFeed() {
    const [imgArray, setImgArray] = useState<DogImage[]>([]);
    const [postLikes, setPostLikes] = useState<boolean[]>([]);
    const [secondsElapsedSinceLoad, setSecondsElapsedSinceLoad] = useState(0);
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

        setTimeout(() => {
            setPopupShow(true);
        }, 60000);

    }, []);

    useEffect(() => {
        if (secondsElapsedSinceLoad < 60) {
            setTimeout(() => {
                setSecondsElapsedSinceLoad(secondsElapsedSinceLoad + 1);
            }, 1000)
        }

    }, [secondsElapsedSinceLoad]);

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
        <div className={styles.progressBarWrapper}>
            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar} style={{ width: `${100 * secondsElapsedSinceLoad / 60}%` }}>
                </div>
            </div>
        </div>

        {popupShow ? <Popup closeFunction={handlePopupClose}>
            <Row>
                <Col xs={12}>
                    <h3 style={{ color: "#333" }}>My Stats</h3>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={5}>
                    <p>You probably picked up on it by now...Hound is not real. Hound exists to illustrate just how quickly social media algorithms can create {"\""}filter bubbles,{"\""} or show you only content that you agree with or like.  The bar chart to shows your total number of likes by each of the five dogs present in the app, while the pie chart shows the frequency at which breeds of dogs were being fetched as new images were loaded in.</p>
                </Col>
                <Col xs={12} md={7}>
                    <LikeBarChart breedWeights={breedWeights} />
                </Col>
            </Row>
            <Row >
                <Col xs={12} md={7} style={{ marginTop: "30px" }}>
                    <FrequencyPieChart breedWeights={breedWeights} />
                </Col>
                <Col xs={12} md={5} style={{ marginTop: "30px" }}>
                    <p>The algorithm I am using is very simple. Bigger social networks utilize other user data in order to recommend new content. However, I cannot do that, as Hound does not have a database. So I use the relative percentage of your likes from the current session as weights.<br />The numbers in the pie chart can be attained by adding one to the number of likes for each of the breeds, and then dividing the number for one breed by the sum for all breeds.</p>
                </Col>
            </Row>
        </Popup> : null}
        <Container fluid style={{ marginTop: "20px" }}>

            {postsFromDogImageArray(imgArray.slice(0, imgArray.length - 2), 0)}
            <Waypoint key={"Waypoint"} onEnter={loadFiveDogs} />
            {postsFromDogImageArray(imgArray.slice(imgArray.length - 2), imgArray.length - 2)}
        </Container>



        <div className={styles.showDashboardButton} onClick={() => setPopupShow(true)} style={{ display: secondsElapsedSinceLoad >= 60 ? "flex" : "none" }}>
            <BarChartFill className={styles.showDashboardButtonIcon} />
        </div>
        <div className={styles.showDashboardText} ><p>Show Dashboard</p></div>
    </div > : null
}


/*


/*



*/