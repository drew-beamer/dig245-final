'use client'
import styles from "./About.module.css";
import { Container, Col, Row } from "react-bootstrap";


export default function About() {
    return <>
        <Container fluid className={styles.contentHolder}>
            <Row className={styles.contentHolderRow}>
                <Col xs={10} md={6}>
                    <h3>About the project</h3>
                    <p>hound is a project created by Drew Beamer. Inspired by Drew’s love of dogs and social media, hound tracks user interactions with the site and presents them to the user in order to raise questions about surveillance and tracking on the Internet.</p>
                    <h4>Privacy</h4>             <p>
                        This site is intended to raise awareness about privacy on the web.
                        <br />
                        hound does not store any information outside of the session.
                        Hound has no database and does not use cookie. While you are on the site, hound uses a React state to keep track of
                        the current weights to get each image with, and then fetches images from our server using those weights.

                        <br />
                        No information that can be used to tie likes to a user is collected.
                        <br />
                        I do not sell any information because, well, I have no information to sell.

                    </p>
                </Col>
                <Col xs={10} md={4}>
                    to be determined thing here
                </Col>
            </Row>
        </Container>
    </>


    /*<Box>
        <Grid container spacing={3}>
            <Grid item>
                <h3>Privacy</h3>
            </Grid>
            <Grid item>
                <p>
                    This site is intended to raise awareness about privacy on the web.
                    <br />
                    hound does not store any information outside of the session.
                    Hound has no database and does not use cookie. While you are on the site, hound uses a React state to keep track of
                    the current weights to get each image with, and then fetches images from our server using those weights.

                    <br />
                    No information that can be used to tie likes to a user is collected.
                    <br />
                    I do not sell any information because, well, I have no information to sell.

                </p>
            </Grid>
        </Grid>
    </Box>*/
}