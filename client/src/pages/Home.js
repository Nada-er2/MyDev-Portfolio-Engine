import { useEffect, useState } from "react";
import API from "../api";

import ProjectCard from "../components/ProjectCard";
import Loader from "../components/Loader";
import ThemeToggle from "../components/ThemeToggle";

function Home() {

  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(true);

    API.get("/projects")
      .then((res) => {
        setProjects(res.data);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })

      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

  }, []);

  const filtered = filter
    ? projects.filter((p) =>
        p.technologies.some((tech) =>
          tech.toLowerCase().includes(filter.toLowerCase())
        )
      )
    : projects;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="home-page">

      <div className="container">

        <div className="top-bar">

          <div>
            <h1 className="main-title">
              My Projects
            </h1>

            <p className="sub-title">
              Discover my latest work
            </p>
          </div>

          <div className="dashboard-actions">

            <ThemeToggle />

            <button
              className="custom-btn"
              onClick={() => (window.location = "/login")}
            >
              Login
            </button>

          </div>

        </div>

        <div className="filter-box">

          <input
            type="text"
            className="search-input"
            placeholder="Search by technology..."
            onChange={(e) => setFilter(e.target.value)}
          />

        </div>

        <div className="projects-grid">

          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default Home;