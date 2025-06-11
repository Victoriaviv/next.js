"use client";
import React, { useState } from "react";
import resumeData from "../data/experience.json";
import "../styles/Resume.css"; 

const ResumeSection = () => {
    
  const [activeTab, setActiveTab] = useState("Education");

  return (
   
 
    <section id="ResumeSection" className="resume-section">
      <h2 className="section-title">My Resume</h2>

      <div className="resume-tabs">
        {resumeData.tabs.map((tab) => (
          <button
            key={tab}
            className={`resume-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="resume-content">
        {resumeData.content[activeTab].map((item, index) => (
          <div key={index} className="resume-card">
            <h3 className="resume-card-title">{item.title}</h3>
            <h4 className="resume-card-subtitle">{item.subtitle}</h4>
            {item.date && <span className="resume-card-date">{item.date}</span>}
            <p className="resume-card-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
 
  );
};

export default ResumeSection;
