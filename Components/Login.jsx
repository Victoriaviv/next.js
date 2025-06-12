'use client';

import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Notify } from 'notiflix';

import { useRouter } from "next/navigation";
import Register from "./Register"; // adjust path if needed
import { IoClose } from "react-icons/io5";
import "styles/login.css"; // your login styles
const Login = ({ changeModal, goToRegister }) => {
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
        const { userEmail, userPassword } = data;
  
        // const response = await axios.post(
        //   "https://ecohub-2.onrender.com/user/login",
        //   { userEmail, userPassword },
        //   { headers: { "Content-Type": "application/json" } }
        // );
  
        Notify.success("Login successful");

        localStorage.setItem("userToken", userToken);
        localStorage.setItem("user", JSON.stringify(userData));
        
        reset();
        
        // 👉 THIS triggers dashboard page to refresh and show content
        changeModal(); 

        if (role === "user") {
          router.push("/home");
        } else if (role === "Admin") {
          router.push("/dashboard");
        }
      } catch (error) {
        const message = error.response?.data?.message || "Login failed. Check your credentials.";
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
  
            <p>Don't have an account?</p>
<a href="#" onClick={goToRegister}>Sign up here</a>

          </form>
        ) : (
          <Register changeModal={changeModal} />
        )}
      </div>
    );
  };
  

export default Login;
