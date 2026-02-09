import "./contactus.css";

export default function ContactUs() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-content">
        {/* Left Column: Contact Form */}
        <div className="contact-form">
          <h2>Send Message</h2>
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your Name" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your Email" />

            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Type your message here"></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Right Column: Direct Contact Details */}
        <div className="contact-details">
          <h2>Direct Contact Details</h2>
          <p><strong>Email:</strong> support@wildlifetracker.com</p>
          <p><strong>Phone:</strong> + (254) 70000000</p>
          <p><strong>Headquarters:</strong> 123 WanForest Way,   Murang'a, Kenya</p>

          <h2>Social Media</h2>
          <p><strong>Instagram:</strong> @WildlifeTracker_Live</p>
          <p><strong>X (Twitter):</strong> @ProtectWildlife</p>
          <p><strong>LinkedIn:</strong> Wildlife Tracker Solutions</p>
        </div>
      </div>
    </div>
  );
}
