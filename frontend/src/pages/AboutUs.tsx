import React from "react";
import "../AboutUs.css"; // we'll create this next

const AboutUs: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Our Wildlife Tracking App is designed to support the conservation and
        protection of wildlife by providing a modern, easy-to-use platform for
        recording and monitoring animal observations.
      </p>
      <p>
        We aim to help researchers, rangers, conservationists, and wildlife
        enthusiasts collect accurate data in real time, improving decision-making
        and promoting sustainable wildlife management.
      </p>
      <h2>Our Objectives</h2>
      <ul>
        <li>Enhance wildlife monitoring and conservation</li>
        <li>Provide accurate and real-time observation records</li>
        <li>Support data-driven conservation decisions</li>
        <li>Raise awareness on wildlife protection</li>
      </ul>
    </div>
  );
};

export default AboutUs;
