'use client'
import Link from "next/link"
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./Home.module.css";


export default function Home() {
  return <div>
    <Container fluid className={styles.heroContainer}>
      <Row className={styles.heroContainerRow}>
        <Col xs={1} md={1}></Col>
        <Col xs={10} md={5}>
          <h1>Social media, without the bite.</h1>
        </Col>
        <Col xs={1} md={6}>
        </Col>
      </Row>
    </Container>
    <Container fluid className={styles.description}>
      <Row className={styles.descriptionHeader}>
        <Col xs={1}></Col>
        <Col>
          <h3>Wholesome "social" media</h3>
        </Col>
        <Col xs={1}></Col>
      </Row>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Col xs={10} md={5}>
          <h4>Familiar social media feel</h4>
          <p>We use a similar format to other social media sites to enhance hound’s usability and accessibility. Get lost scrolling through dogs for hours!</p>
        </Col>
        <Col xs={10} md={5}>
          <h4>Dogs, dogs, dogs</h4>
          <p>You won’t find anything but dogs here. We limit our content to optimize our user’s happiness and boost serotonin levels. After all, we want to keep your attention.</p>
        </Col>
        <Col xs={10} md={5}>
          <h4>Only what you like</h4>
          <p>Our algorithm figures out what kinds of dogs you like, and shows you more dogs of that variety.</p>
        </Col>
        <Col xs={10} md={5}>
          <h4>No toxicity</h4>
          <p>Users can’t post on hound. All the photos are sourced from an API to create a wholesome social media experience.</p>
        </Col>
      </Row>
    </Container>
  </div>
}