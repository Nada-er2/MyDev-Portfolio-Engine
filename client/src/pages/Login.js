import { useState } from "react";
import API from "../api";
// import ThemeToggle from "../components/ThemeToggle";
import { toast } from "react-toastify";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    toast.success("Login successful");

    setTimeout(() => {
      window.location = "/dashboard";
    }, 1500);

  } catch (err) {
    toast.error("Email or password incorrect");
  }
};

  return (

    <div className="login-page">

      

      <form
        className="form"
        onSubmit={login}
      >

        <p className="form-title">
          Sign in to your account
        </p>

        <div className="input-container">

          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        <div className="input-container">

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        <button
          type="submit"
          className="custom-btn"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;