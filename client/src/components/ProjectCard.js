import { useState } from "react";
import TechBadge from "./TechBadge";

function ProjectCard({ project }) {
  const [showMore, setShowMore] = useState(false);

  const shortText =
    project.description.length > 120
      ? project.description.slice(0, 120) + "..."
      : project.description;

  return (
    <div className="project-card">

      <img
        src={project.imageUrl}
        alt={project.title}
        className="project-image"
      />

      <div className="project-content">

        <h3 className="project-title">
          {project.title}
        </h3>

        <p className="project-description">
          {showMore
            ? project.description
            : shortText}
        </p>

        {project.description.length > 120 && (
          <span
            className="read-more"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Read More"}
          </span>
        )}

        <div className="tech-container">
          {project.technologies.map((tech, index) => (
            <TechBadge key={index} tech={tech} />
          ))}
        </div>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="github-btn"
        >
          Github
        </a>

      </div>
    </div>
  );
}

export default ProjectCard;