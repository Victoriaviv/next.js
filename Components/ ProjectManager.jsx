import React, { useState } from 'react';

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);

  const handleAddProject = () => {
    const name = prompt("Project name:");
    if (name) setProjects([...projects, { name }]);
  };

  return (
    <section>
      <h2>Your Projects</h2>
      <button onClick={handleAddProject}>Add Project</button>
      <ul>
        {projects.map((proj, index) => (
          <li key={index}>{proj.name}</li>
        ))}
      </ul>
    </section>
  );
}
