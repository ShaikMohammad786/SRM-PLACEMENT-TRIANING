import { useState } from "react";
import API from "../api/courseApi";
import { toast } from "react-toastify";
import { FaPaperPlane, FaUser, FaEnvelope, FaPen } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSubmitting(true);
    try {
      await API.post("/contact", formData);
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page-container glass-container contact-page">
      <h1>Contact Us</h1>
      <p className="page-subtitle">Have questions or want to collaborate? Drop us a line below.</p>

      <form onSubmit={handleSubmit} className="custom-form">
        <div className="input-group">
          <label htmlFor="name-input">
            <FaUser className="input-icon" /> Full Name
          </label>
          <input
            id="name-input"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
            }
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email-input">
            <FaEnvelope className="input-icon" /> Email Address
          </label>
          <input
            id="email-input"
            type="email"
            placeholder="johndoe@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="message-input">
            <FaPen className="input-icon" /> Your Message
          </label>
          <textarea
            id="message-input"
            rows="5"
            placeholder="How can we help you?"
            value={formData.message}
            onChange={(e) =>
              setFormData({
                ...formData,
                message: e.target.value
              })
            }
            required
          />
        </div>

        <button type="submit" className="btn-primary submit-btn" disabled={submitting}>
          {submitting ? (
            <>
              <span className="spinner-small"></span> Sending...
            </>
          ) : (
            <>
              <FaPaperPlane /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default Contact;
