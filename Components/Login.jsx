'use client';

import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Notify } from "notiflix";
import { useRouter } from "next/navigation";
import Register from "./Register";

import { IoClose } from "react-icons/io5";
import "styles/login.css";

const Login = ({ changeModal }) => {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("Login API Response :", data);
      const { userEmail, userPassword } = data;
  
      const response = await axios.post(
        "http://localhost:5000/api/login",
        { email: userEmail, password: userPassword },
        { withCredentials: true }
      );
  
      console.log("API responded with :", response.data);
      const { token, user } = response.data;
      localStorage.setItem("userToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      if (user.role.toLowerCase() === "admin") {
        router.push("/dashboard/home");
      } else {
        router.push("/blog");
      }
  
    } catch (error) {
      console.error("Login error :", error);
      const message = 
        error.response?.data?.message ||
        "Login failed. Check your credentials.";
      Notify.failure(message);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="formscontainer">
      {showLogin ? (
        <form className="forms" onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <IoClose className="iconclose" onClick={changeModal} />

          <input
            type="email"
            placeholder="Enter email"
            {...register("userEmail", { required: "Email is required" })}
            disabled={loading}
          />
          {errors.userEmail && <p>{errors.userEmail.message}</p>}

          <input
            type="password"
            placeholder="Enter password"
            {...register("userPassword", { required: "Password is required" })}
            disabled={loading}
          />
          {errors.userPassword && <p>{errors.userPassword.message}</p>}

          <button type="submit" className="button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p>
            Don't have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowLogin(false);
              }}
            >
              Sign up here
            </a>
          </p>
        </form>
      ) : (
        <Register
          changeModal={changeModal}
          goToLogin={() => setShowLogin(true)}
        />
      )}
    </div>
  );
};

export default Login;
