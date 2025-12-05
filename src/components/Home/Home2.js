import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
        <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} style={{
  transform: [
    { scaleX: -1 }
  ]
}} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="maincolor"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
            I am a dedicated software engineer currently working at Lockheed Martin, 
            specializing in Software Engineering in Signature Integration for Aeronautics. 
            I have a Bachelors in Computer Science from Lamar University, where I built a strong 
            foundation in my technical field and developed practical skills that support my work today.
              <br />
              <br />
              I’m proficient in
              <i>
                <b className="maincolor">
                  {" "}
                  Java and SQL{" "}
                </b>
                
              </i>
              — and I enjoy exploring new backend and frontend stacks.
              <br />
              <br />
              In my personal time, I enjoy exploring my creativiny through
              <b className="maincolor"> Art</b> through many mediums incuding{" "}
              <i>
                <b className="maincolor">Painting, 3D printing, Cooking</b> and{" "}
                <b className="maincolor">Baking</b>.
              </i>
            </p>
          </Col>
        
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
