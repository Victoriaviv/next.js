import React from "react";
import projectsData from "../data/projects.json";
import "../styles/project.css";




const ProjectsSection = () => {
  return (
    <section id="projectsSection" className="projects-section">
      <h2 className="section-title">My Projects</h2>
      <div className="projects-grid">
        {projectsData.projects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.image} alt={project.title} className="project-image" />
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tags">
              {project.technologies.map((tech, index) => (
                <span key={index} className="project-tag">{tech}</span>
              ))}
            </div>
            <div className="project-links">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer">Live</a>
              )}
              <a href={project.githubUrl} target="_blank" rel="noreferrer">Code</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
