import "./aboutus.css";

export default function AboutUs() {
  return (
    <div className="about-container">
      <h1>About Our Mission</h1>
      <h2>Empowering Conservation Through Data</h2>
      <p>
        Welcome to the Wildlife Tracker, a cutting-edge platform dedicated to the 
        protection and preservation of our planet’s biodiversity. We bridge the gap 
        between technology and the natural world by providing researchers, rangers, 
        and conservation enthusiasts with the tools they need to monitor wildlife 
        movements in real-time.
      </p>
      <p>
        Our platform is built on the belief that informed decisions are the most 
        powerful weapons we have against extinction and habitat loss.
      </p>

      <h2>Our Objectives</h2>
      <ul>
        <li>
          <strong>Precision Monitoring:</strong> Implement high-fidelity tracking to 
          understand migratory patterns and behavioral health.
        </li>
        <li>
          <strong>Real-Time Insights:</strong> Provide an instant dashboard for rangers 
          to respond to potential threats or poaching activities immediately.
        </li>
        <li>
          <strong>Data-Driven Conservation:</strong> Offer robust analytical tools to 
          help organizations make scientific, evidence-based land management decisions.
        </li>
        <li>
          <strong>Global Collaboration:</strong> Create a unified database where 
          international conservationists can share non-sensitive data to protect cross-border species.
        </li>
        <li>
          <strong>Public Awareness:</strong> Educate the community on the importance 
          of local wildlife through curated, non-intrusive observation data.
        </li>
      </ul>

      <h2>How It Works</h2>
      <ul>
        <li><strong>Observe:</strong> Field data is collected via GPS collars, camera traps, or manual sightings.</li>
        <li><strong>Analyze:</strong> Our system processes the raw data to identify trends and anomalies.</li>
        <li><strong>Protect:</strong> Conservation teams use these insights to deploy resources where they are needed most.</li>
      </ul>
    </div>
  );
}
