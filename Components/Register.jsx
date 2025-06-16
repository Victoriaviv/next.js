'use client';

import React, { useState } from "react";
import "styles/login.css";
import axios from "axios";
import { Notify } from 'notiflix';

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";
import Login from "Components/Login.jsx";

const Register = ({ changeModal }) => {
  const [isSignup, setIsSignup] = useState(true);

  const goToLogin = () => setIsSignup(false);
  const goToRegister = () => setIsSignup(true);

  // Backend validation errors per field
  const [backendErrors, setBackendErrors] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setBackendErrors({});
      const formData = {
        name: data.name,
        username: data.username,
        email: data.userEmail,
        password: data.userPassword,
      };
      const response = await axios.post('http://localhost:5000/api/register', formData);
  
      // 1. Success
      Notify.success("Registration successful");
  
      // 2. Store the token immediately
      localStorage.setItem("userToken", response.data?.token);
      localStorage.setItem("user", JSON.stringify(response.data?.user));
  
      // 3. Redirect to Dashboard directly
      changeModal();
      router.push("/login");
  
    } catch (error) {
      console.error('Registration Error!', error);
      Notify.failure(error.response?.data?.message || "Registration failed.");
      if (error.response?.data?.errors) {
        setBackendErrors(error.response?.data?.errors);
      }
    }
  };
  
  

  return (
    <div className="formscontainer1">
      {isSignup ? (
        <form className="forms1" onSubmit={handleSubmit(onSubmit)} noValidate>
          <IoCloseSharp className="iconclose" onClick={changeModal} />
          <h2>Register</h2>

          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            disabled={isSubmitting}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby="name-error"
          />
          {(errors.name || backendErrors.name) && (
            <p className="error" id="name-error" aria-live="polite">
              {errors.name?.message || backendErrors.name}
            </p>
          )}

          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
            disabled={isSubmitting}
            aria-invalid={errors.username ? "true" : "false"}
            aria-describedby="username-error"
          />
          {(errors.username || backendErrors.username) && (
            <p className="error" id="username-error" aria-live="polite">
              {errors.username?.message || backendErrors.username}
            </p>
          )}

          <input
            type="email"
            placeholder="Enter email"
            {...register("userEmail", { required: "Email is required" })}
            disabled={isSubmitting}
            aria-invalid={errors.userEmail ? "true" : "false"}
            aria-describedby="email-error"
          />
          {(errors.userEmail || backendErrors.email) && (
            <p className="error" id="email-error" aria-live="polite">
              {errors.userEmail?.message || backendErrors.email}
            </p>
          )}

          <input
            type="password"
            placeholder="Enter password"
            {...register("userPassword", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            disabled={isSubmitting}
            aria-invalid={errors.userPassword ? "true" : "false"}
            aria-describedby="password-error"
          />
          {(errors.userPassword || backendErrors.password) && (
            <p className="error" id="password-error" aria-live="polite">
              {errors.userPassword?.message || backendErrors.password}
            </p>
          )}

          <button type="submit" className="button" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          <p>
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goToLogin();
              }}
            >
              Login here
            </a>
          </p>
        </form>
      ) : (
        <Login changeModal={changeModal} goToRegister={goToRegister} />
      )}
    </div>
  );
};

export default Register;
