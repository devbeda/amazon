import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { amazonWhiteLogo, logo } from "../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { RotatingLines } from 'react-loader-spinner'
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { setUserInfo } from "../redux/amazonSlice";

function Signin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const auth = getAuth();
  const [wrongEmail,setWrongEmail]= useState("");
  const [wrongPassword, setWrongPassword] = useState("")
  const [loading,setLoading] = useState(false);
  const [successMsg,setSuccessMsg] = useState("")

  const handelEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
    setWrongEmail("");
  };
  const handelPassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
    setWrongPassword("")
  };

  const handelLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setErrEmail("Enter your email");
    }
    if (!password) {
      setErrPassword("Enter your password");
    } 
    

    if (email && password) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
      
        .then((userCredential) => {
          
          // Signed in
          const user = userCredential.user;
          dispatch(setUserInfo({
            id:user.uid,
            userName:user.displayName,
            email:user.email,
            image:user.photoURL
          }));
          // ...
          setLoading(false)
            setSuccessMsg("Logged in Sucessfully! welcome you back!")
            setTimeout(() => {
              navigate("/")
            }, 2000);
          
        })
        .catch((error) => {
          setLoading(false)
          const errorCode = error.code;
          if(errorCode.includes("auth/invalid-email")) {
            setWrongEmail("Invalid Email")
          }
          if (errorCode.includes("auth/invalid-credential")) {
            setWrongPassword("wrong password! Try again")
          }
        });
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="w-full p-10 bg-gray-100">
        {
          successMsg ? ( 
          <div className="w-full flex justify-center item-center py-32 ">
            <p className=" border-[1px] border-green-500 font-titlefont text-lg
            font-semibold px-6 py-2" >
              {successMsg}
            </p>
          </div> 
          ): (
            <form className="w-[350px] mx-auto flex flex-col items-center ">
            <img src={amazonWhiteLogo} className=" w-32" alt="" />
            <div className="w-full border border-zinc-200 p-6">
              <h2 className="font-titleFont text-3xl font-medium mb-4">
                Sign in
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-sm">Email or Mobile Number</p>
                  <input
                    onChange={handelEmail}
                    value={email}
                    className="w-full lowercase py-1 border-zinc-400 px-2 text-base rounded-sm outline-none
                        focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100 "
                    type="email"
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
                  {wrongEmail && (
                    <p
                      className="text-red-600 text-xs font-semibold tracking-wide flex
                      items-center ga2 -mt-1.5"
                    >
                      <span className="italic font-titleFont font-extrabold text-base mr-1">
                        !
                      </span>{" "}
                      {wrongEmail}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-sm">Password</p>
                  <input
                    onChange={handelPassword}
                    value={password}
                    className="w-full lowercase py-1 border-zinc-400 px-2 text-base rounded-sm outline-none
                        focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100 "
                    type="password"
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
                  {wrongPassword && (
                    <p
                      className="text-red-600 text-xs font-semibold tracking-wide flex
                      items-center ga2 -mt-1.5"
                    >
                      <span className="italic font-titleFont font-extrabold text-base mr-1">
                        !
                      </span>{" "}
                      {wrongPassword}
                    </p>
                  )}
                </div>
                <button
                  onClick={handelLogin}
                  className="w-full py-1.5 text-sm font-normal rounded-sm
                      bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border
                      border-zinc-400 active:border-yellow-800 active:shadow-amazonInput font-titleFont"
                >
                  Continue
                </button>
                {loading ? (
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
                ):null}
                
              </div>
              <p className="text-xs text-black leading-4 mt-4">
                By Continuing, you agree to Amazon's{" "}
                <span className="text-blue-600">Conditions of use </span>and
                <span className="text-blue-600"> Privacy Notice.</span>
              </p>
              <p className="text-xs text-gray-600 mt-4 cursor-pointer group">
                <FontAwesomeIcon icon={faCaretRight} />
                <span className="text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1 ml-1">
                  Need help?
                </span>
              </p>
            </div>
            <p className="w-full text-xs text-gray-600 mt-4 flex items-center">
              <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
              <span className="w-1/3 text-center">New to Amazon?</span>
              <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
            </p>
            <Link to="/resgistration" className="w-full py-0.5">
              <button
                className="w-full py-0.5 mt-4 text-sm font-normal rounded-md
                      bg-white hover:bg-blue-50  border-[2px]  active:border-yellow-800 active:shadow-amazonInput font-titleFont"
              >
                Create your Amazon account
              </button>
            </Link>
          </form> )
        }
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

export default Signin;
