import { useEffect, useState } from "react";
import API from "../api";
import Loader from "../components/Loader";
import ThemeToggle from "../components/ThemeToggle";
import { toast } from "react-toastify";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [animatedCount, setAnimatedCount] = useState(0);

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    technologies: "",
    githubUrl: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    API.get("/projects")
      .then((res) => {
        setProjects(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let start = 0;

    const interval = setInterval(() => {
      start++;

      setAnimatedCount(start);

      if (start >= projects.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [projects]);

  if (loading) return <Loader />;

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.description ||
      !form.imageUrl ||
      !form.technologies ||
      !form.githubUrl
    ) {
      toast.error("All fields are required");
      return;
    }

    const data = {
      ...form,
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim()),
    };

    try {
      if (editId) {
        const res = await API.put(`/projects/${editId}`, data);

        setProjects(
          projects.map((p) =>
            p.id === editId ? res.data : p
          )
        );

        toast.success("Project updated");
      } else {
        const res = await API.post("/projects", data);

        setProjects([...projects, res.data]);

        toast.success("Project added");
      }

      setForm({
        title: "",
        description: "",
        imageUrl: "",
        technologies: "",
        githubUrl: "",
      });

      setShowForm(false);

      setEditId(null);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const editProject = (p) => {
    setForm({
      ...p,
      technologies: p.technologies.join(", "),
    });

    setEditId(p.id);

    setShowForm(true);
  };

  const logout = () => {
    localStorage.removeItem("token");

    window.location = "/";
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-top">
        <div>
            <h1 className="dashboard-title">
              Dashboard
            </h1>

            <h3 className="project-counter">
              {animatedCount} Projects
            </h3>
          </div>

        <div className="dashboard-actions">
          <ThemeToggle />

          <button
            className="custom-btn"
            onClick={logout}
          >
            Home
          </button>

          <button
            className="add-btn"
            onClick={() => {
              setShowForm(true);

              setEditId(null);

              setForm({
                title: "",
                description: "",
                imageUrl: "",
                technologies: "",
                githubUrl: "",
              });
            }}
          >
            Add
          </button>
        </div>
      </div>

      {showForm && (
        <div className="form-card">
          <input
            className="custom-input"
            placeholder="Project Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <textarea
            className="custom-input"
            placeholder="Project Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <input
            className="custom-input"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) =>
              setForm({
                ...form,
                imageUrl: e.target.value,
              })
            }
          />

          <input
            className="custom-input"
            placeholder="Technologies (React, Node)"
            value={form.technologies}
            onChange={(e) =>
              setForm({
                ...form,
                technologies: e.target.value,
              })
            }
          />

          <input
            className="custom-input"
            placeholder="GitHub URL"
            value={form.githubUrl}
            onChange={(e) =>
              setForm({
                ...form,
                githubUrl: e.target.value,
              })
            }
          />

          <div className="form-buttons">
            <button
              className="add-btn"
              onClick={handleSubmit}
            >
              Confirm
            </button>

            <button
              className="delete-btn"
              onClick={() => {
                setShowForm(false);

                setEditId(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Technologies</th>
              <th>GitHub</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td data-label="Image">
                  <img
                    src={p.imageUrl}
                    alt=""
                    className="table-img"
                  />
                </td>

                <td data-label="Title" className="title-cell">
                  {p.title}
                </td>

                <td className="desc-cell" data-label="Description">
                  {p.description}
                </td>

                <td data-label="Technologies">
                  {p.technologies.join(", ")}
                </td>

                <td data-label="GitHub">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Link
                  </a>
                </td>

                <td data-label="Actions">
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => editProject(p)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        setDeleteId(p.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <div className="modal-overlay">
          <div className="custom-modal">
            <h3>Delete this project ?</h3>

            <div className="modal-buttons">
              <button
                className="delete-btn"
                onClick={async () => {
                  await API.delete(
                    `/projects/${deleteId}`
                  );

                  setProjects(
                    projects.filter(
                      (p) => p.id !== deleteId
                    )
                  );

                  toast.success("Project deleted");

                  setDeleteId(null);
                }}
              >
                Confirm
              </button>

              <button
                className="custom-btn"
                onClick={() =>
                  setDeleteId(null)
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;