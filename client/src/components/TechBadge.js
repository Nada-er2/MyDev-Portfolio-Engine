import React from "react";

const TechBadge = ({ tech }) => {
  return (
    <span className="badge bg-primary me-1">
      {tech}
    </span>
  );
};

export default TechBadge;