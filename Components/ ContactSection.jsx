"use client";
import React, { useState } from"react";
import {FaEnvelope,FaPhoneAlt,FaMapMarkerAlt,FaFacebookF,FaGithub,FaLinkedinIn} from "react-icons/fa";

import contactData from "../data/contact.json"; 
import "../styles/contact.css";

const iconMap = {
  FaEnvelope: <FaEnvelope />,
  FaPhoneAlt: <FaPhoneAlt />,
  FaMapMarkerAlt: <FaMapMarkerAlt />,
  FaFacebookF: <FaFacebookF />,
  FaGithub: <FaGithub />,
  FaLinkedinIn: <FaLinkedinIn />,
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message!");
    setFormData({ firstName: "", email: "", subject: "", message: "" });
  };

  const { contactInfo, socials, formFields, buttonText, title } = contactData;

  return (
    <section id="ContactSection" className="contact-section">
      <div className="contact-left">
        <h3>contact info</h3>

        {Object.entries(contactInfo).map(([key, { label, value, icon }]) => (
          <div className="contact-item" key={key}>
            <i>{iconMap[icon]}</i>
            <div>
              <div className="contact-label">{label}</div>
              <div className="contact-value">{value}</div>
            </div>
          </div>
        ))}
<h3>social info</h3>
        <div className="social-icons">
          {socials.map(({ name, icon, url }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
            >
              {iconMap[icon]}
            </a>
          ))}
        </div>
      </div>

      <div className="contact-right">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          {formFields.map(({ name, placeholder, type }) =>
            type === "textarea" ? (
              <textarea
                key={name}
                name={name}
                placeholder={placeholder}
                value={formData[name] || ""}
                onChange={handleChange}
                required
              />
            ) : (
              <input
                key={name}
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name] || ""}
                onChange={handleChange}
                required
              />
            )
          )}

          <button className="submit-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
