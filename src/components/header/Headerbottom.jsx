import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faAngleRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import SideNavContent from "./SideNavContent";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

function Headerbottom() {
  const ref = useRef();
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    document.body.addEventListener(
      "click",
      (e) => {
        if (e.target.contains(ref.current)) {
          setSidebar(false);
        }
      },
      [ref, sidebar]
    );
  });

  return (
    <div className="w-full px-4 h-[36px] bg-[#232F3E] text-white flex items-center">
      {/* list item statrt here */}
      <ul className="flex items-center gap-2 text-sm tracking-wide">
        <li onClick={() => setSidebar(true)} className="headerHover">
          {" "}
          <span>
            <FontAwesomeIcon icon={faBars} />
          </span>
          All
        </li>
        <li className="headerHover hidden md:inline-flex">Today's Deal</li>
        <li className="headerHover hidden md:inline-flex">Customer Service</li>
        <li className="headerHover hidden md:inline-flex">Gift Card</li>
        <li className="headerHover hidden md:inline-flex">Registry</li>
        <li className="headerHover hidden md:inline-flex">Sell</li>
      </ul>

      {sidebar && (
        <div className="w-full h-screen text-black fixed top-0 left-0 bg-[#131921] bg-opacity-50 ">
          <div className="w-full h-full relative">
            <motion.div
              ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[75%] md:w-[350px] h-full bg-white border border-black  "
            >
              <div className="w-full bg-[#232F3E] text-white py-2 px-6 flex items-center gap-4">
                {userInfo ? (
                  <img
                    className="w-12 h-10 rounded-[50%]"
                    src={userInfo.image}
                    alt=""
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
                <h3 className="font-titleFont font-bold text-lg tracking-wide">
                  Hello, {userInfo ? userInfo.userName : "User"}
                </h3>
              </div>
              <SideNavContent
                title="Digital Content & Devices"
                one="Amazon Music"
                two="Kindel E-readers"
                three="Amazon Appstore"
              />
              <SideNavContent
                title="Shop by Department"
                one=" Electronics"
                two="Computers"
                three="Smart Home"
              />
              <SideNavContent
                title="Programs & Features"
                one="Gift Cards"
                two="Shop By Interest"
                three="Amazon Live"
              />
              <SideNavContent
                title="Help & Settings"
                one="Your Account"
                two="Customer Service"
              />
              <span
                onClick={() => setSidebar(false)}
                className=" text-xl cursor-pointer absolute top-0 left-[80%] md:left-[360px] w-10 h-10 text-black
              flex items-center justify-center border bg-gray-200 hover:bg-red-500 
              hover:text-white duration-300"
              >
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Headerbottom;
