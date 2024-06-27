import React, { useState } from "react";
import { amazonWhiteLogo } from "../assets";
import { RotatingLines } from 'react-loader-spinner'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Profile } from "../assets";

function Resgistration() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  // Eroor massages
  const [errClintName, setErrClientName] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errCPassword, setErrCPassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handelPassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handelCPassword = (e) => {
    setCPassword(e.target.value);
    setErrCPassword("");
  };

  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handelRegistration = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your name");
    }
    if (!email) {
      setErrEmail("Plese enter your email");
      setFirebaseErr("");
    } else {
      if (!emailValidation(email)) {
        setErrEmail("Enter a valid email");
      }
    }
    if (!password || password.length < 6) {
      setErrPassword("Please enter 8 character password");
    }
    if (!cPassword) {
      setErrCPassword("Plese re-enter your password");
    } else {
      if (password !== cPassword) {
        setErrCPassword("your password is not matching");
      } else {
        setErrCPassword("");
      }
    }

    if (
      clientName &&
      email &&
      emailValidation(email) &&
      password &&
      password.length >= 6 &&
      cPassword &&
      cPassword === password
    ) {
      // console.log(clientName, password, email);
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: clientName,
            photoURL:
              "https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg",
          });
          // Signed up
          const user = userCredential.user;
          // ...
          setLoading(false);
          setSuccessMsg("Account created Successfully");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;
          // ..
          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("Email already in use ");
          }
        });
      setClientName("");
      setEmail("");
      setPassword("");
      setCPassword("");
    }
  };
  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 p-3">
        <form className="w-[350px] mx-auto flex flex-col items-center">
          <img className=" w-24" src={amazonWhiteLogo} alt="" />
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Create Account
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Your name</p>
                <input
                  onChange={handleName}
                  value={clientName}
                  type="text"
                  className="px-1 w-full lowercase py-1 border-zinc-400  text-base rounded-sm outline-none
                            focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  placeholder="First and last name"
                />
                {errClintName && (
                  <p
                    className="text-red-600 text-xs font-semibold tracking-wide flex
                    items-center ga2 -mt-1.5"
                  >
                    <span className="italic font-titleFont font-extrabold text-base mr-1">
                      !
                    </span>{" "}
                    {errClintName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Mobile number or email</p>
                <input
                  onChange={handleEmail}
                  value={email}
                  type="email"
                  className="px-1 w-full lowercase py-1 border-zinc-400  text-base rounded-sm outline-none
                            focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                />
                {errEmail && (
                  <p
                    className="text-red-600 text-xs font-semibold tracking-wide flex
                    items-center ga2 -mt-1.5"
                  >
                    <span className="italic font-titleFont font-extrabold text-base mr-1">
                      !
                    </span>{" "}
                    {errEmail}
                  </p>
                )}
                {firebaseErr && (
                  <p
                    className="text-red-600 text-xs font-semibold tracking-wide flex
                    items-center ga2 -mt-1.5"
                  >
                    <span className="italic font-titleFont font-extrabold text-base mr-1">
                      !
                    </span>{" "}
                    {firebaseErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Password</p>
                <input
                  onChange={handelPassword}
                  value={password}
                  type="password"
                  className="px-1 w-full py-1 border-zinc-400  text-base rounded-sm outline-none
                            focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  placeholder="At least 6 characters"
                />
                {errPassword && (
                  <p
                    className="text-red-600 text-xs font-semibold tracking-wide flex
                    items-center ga2 -mt-1.5"
                  >
                    <span className="italic font-titleFont font-extrabold text-base mr-1">
                      !
                    </span>{" "}
                    {errPassword}
                  </p>
                )}
                <p className="text-xs">
                  <span className="text-blue-600 mr-1.5">
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </span>
                  Passwords must be at least 6 characters.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Re-enter password</p>
                <input
                  onChange={handelCPassword}
                  value={cPassword}
                  type="password"
                  className="px-1 w-full py-1 border-zinc-400  text-base rounded-sm outline-none
                            focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                />
                {errCPassword && (
                  <p
                    className="text-red-600 text-xs font-semibold tracking-wide flex
                    items-center ga2 -mt-1.5"
                  >
                    <span className="italic font-titleFont font-extrabold text-base mr-1">
                      !
                    </span>{" "}
                    {errCPassword}
                  </p>
                )}
              </div>
              <button
                onClick={handelRegistration}
                className="w-full py-0.5 text-sm font-normal rounded-sm
                        bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border
                        border-zinc-400 active:border-yellow-800 active:shadow-amazonInput font-titleFont"
              >
                continue
              </button>
              {loading && (
                <div className="flex justify-center">
                  <RotatingLines
                    visible={true}
                    height="50"
                    width="50"
                    strokeColor="#febd69"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                  />
                </div>
              )}
              {
                successMsg && (
                  <div>
                    <motion.p
                    initial={{y:10, opacity:0}}
                    animate={{y:0,opacity:1}}
                    transition={{duration:0.5}}
                    className="text-base font-titleFont font-semibold text-green-500 
                    border-[1px] border-green-500 px-2 text-center "
                    >{successMsg}</motion.p>
                  </div>
                )
              }
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              By creating an account, you agree to Amazon's{" "}
              <span
                className="text-xs text-blue-600 hover:text-orange-600 hover:underline
            underline-offset-1 cursor-pointer duration-100"
              >
                Conditions of Use{" "}
              </span>{" "}
              and{" "}
              <span
                className="text-xs text-blue-600 hover:text-orange-600 hover:underline
            underline-offset-1 cursor-pointer duration-100"
              >
                Privacy Notice
              </span>
              .
            </p>
            <div className="mt-6">
              <span className=" w-full h-[0.5px] bg-zinc-300 inline-flex "></span>
              <p className=" text-sm">
                Already have an account?{" "}
                <Link to="/signin" className="group">
                  <span
                    className="text-sm text-blue-600 group-hover:text-orange-600 group-hover:underline
                  underline-offset-1 cursor-pointer duration-100"
                  >
                    Sign in{" "}
                  </span>
                  <span
                    className="text-sm text-blue-600 group-hover:text-orange-600 group-hover:underline
            underline-offset-1 cursor-pointer duration-100"
                  >
                    <FontAwesomeIcon icon={faCaretRight} />
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div
        className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex
        flex-col gap-4 justify-center items-center"
      >
        <div className="flex items-center gap-6 py-10 ">
          <p
            className="text-xs text-blue-600 hover:text-orange-600 hover:underline
            underline-offset-1 cursor-pointer duration-100"
          >
            Conditions of Use
          </p>
          <p
            className="text-xs text-blue-600 hover:text-orange-600 hover:underline
            underline-offset-1 cursor-pointer duration-100"
          >
            Privacy Notice
          </p>
          <p
            className="text-xs text-blue-600 hover:text-orange-600 hover:underline
            underline-offset-1 cursor-pointer duration-100"
          >
            help
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
}

export default Resgistration;
