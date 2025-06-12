'use client';

import React, { useState } from "react";
import "styles/login.css";
import axios from "axios";
import { Notify } from 'notiflix';

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";
import Login from "./Login"; // Adjust path if different

const Register = ({ changeModal }) => {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { firstName, lastName, userEmail, userPassword } = data;

      const formData = {
        firstName,
        lastName,
        userEmail,
        userPassword,
      };

    //   const response = await axios.post(
    //     `https://ecohub-2.onrender.com/user/register`,
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

      Notify.success("Registration successful");
      localStorage.setItem("userToken", JSON.stringify(response.data));
      reset();
      router.push("/dashboard"); // Redirect to dashboard after registration
    } catch (error) {
      console.error(error);
      Notify.failure("Registration failed");
    }
  };

  return (
    <div className="formscontainer1">
      {isSignup ? (
        <form className="forms1" onSubmit={handleSubmit(onSubmit)}>
          <IoCloseSharp className="iconclose" onClick={changeModal} />
          <h2>Register</h2>

          <input
            type="text"
            placeholder="Enter first name"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}

          <input
            type="text"
            placeholder="Enter last name"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}

          <input
            type="email"
            placeholder="Enter email"
            {...register("userEmail", { required: "Email is required" })}
          />
          {errors.userEmail && <p>{errors.userEmail.message}</p>}

          <input
            type="password"
            placeholder="Enter password"
            {...register("userPassword", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.userPassword && <p>{errors.userPassword.message}</p>}

          <button type="submit" className="button">
            Register
          </button>

          <p>Already have an account? </p>
            <a onClick={changeModal}>Login here</a>
  
        </form>
      ) : (
        <Login changeModal={changeModal} />
      )}
    </div>
  );
};

export default Register;
