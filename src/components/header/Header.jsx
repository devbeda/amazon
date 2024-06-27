import React, { useState } from "react";
import { logo } from "../../assets/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCaretDown,
  faMagnifyingGlass,
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Headerbottom from "./Headerbottom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { userSignOut } from "../../redux/amazonSlice";

function Header() {
  const auth = getAuth();
  const dispatch = useDispatch()
  const [showAll, setShowAll] = useState(false);
  const allItems = [
    {
      id: "100",
      title: "All Department",
    },
    {
      id: "101",
      title: "Arts and Crafts",
    },
    {
      id: "102",
      title: "Automotive",
    },
    {
      id: "103",
      title: "Baby",
    },
    {
      id: "104",
      title: "Beauty",
    },
    {
      id: "105",
      title: "Books",
    },
    {
      id: "106",
      title: "Computer",
    },
    {
      id: "107",
      title: "Deals",
    },
    {
      id: "108",
      title: "Digital Music",
    },
    {
      id: "109",
      title: "Electronics",
    },
    {
      id: "110",
      title: "Girl's Fasion",
    },
    {
      id: "111",
      title: "Health and Households",
    },
    {
      id: "112",
      title: "Home and Kitchen",
    },
    {
      id: "113",
      title: "Industrial and Scientific ",
    },
    {
      id: "114",
      title: "Kindel Store",
    },
    {
      id: "115",
      title: "Luggage",
    },
    {
      id: "116",
      title: "Men's Fashion",
    },
    {
      id: "117",
      title: "Movie and Tv",
    },
    {
      id: "118",
      title: "Music and CDs",
    },
    {
      id: "119",
      title: "Prime Video",
    },
    {
      id: "120",
      title: "Software",
    },
  ];
  const products = useSelector((state) => state.amazon.products);
  const userInfo = useSelector((state) => state.amazon.userInfo);
  function handelLogout(){
    signOut(auth).then(() => {
      dispatch(userSignOut())
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <nav className=" sticky top-0 z-50">
      <div className="w-full bg-[#131921] text-white px-4 py-3 flex items-center justify-between gap-2 ">
        {/* logo..... */}
        <Link to="/">
          <div className="headerHover">
            <img src={logo} alt="logo" className="w-24" />
          </div>
        </Link>
        {/* Delever and location...... */}
        <div className="headerHover  mdl:inline-flex hidden ">
          <FontAwesomeIcon icon={faLocationDot} className="text-whiteT" />
          <p className="text-xs text-lightText font-light flex flex-col">
            Deliver to <span className="text-sm text-white">India</span>
          </p>
        </div>
        {/* Search Bar ........ */}
        <div className="text-white h-10 rounded-md hidden lgl:flex flex-grow items-center relative ">
          <span
            onClick={() => setShowAll(!showAll)}
            className="w-14 h-full text-black bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer
          font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md duration-300 gap-1"
          >
            All <span></span>
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
          {showAll && (
            <div>
              <ul
                className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden
                bg-white border-[1px] border-[#131921] text-black p-2 flex-col gap-1 z-50 "
              >
                {allItems.map((item) => (
                  <li
                    className="text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent
                        hover:border-b-[#131921] cursor-pointer duration-200 "
                    key={item.id}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <input
            className="h-full text-base text-[#131921] flex-grow outline-none border-none px-2 "
            type="text"
          />
          <span
            className="w-12 h-full text-lg flex items-center justify-center bg-[#febd69] hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer
          rounded-tr-md rounded-br-md "
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
        </div>
        {/* Sign in option */}

        <Link to="signin">
          <div className="flex flex-col items-start justify-center headerHover">
            {
              userInfo ? (  
              <p className="text-sm  text-white mdl:text-[#ccc] font-medium ">
                Hello, {userInfo.userName}
              </p> 
              ):(
              <p className="text-sm mdl:text-xs text-white mdl:text-[#ccc] font-light ">
                Hello, sign in
              </p>)
            }
            
            <p className="text-sm font-semibold  text-white hidden mdl:inline-flex">
              Accounts & lists{" "}
              <span>
                <FontAwesomeIcon icon={faCaretDown} />
              </span>{" "}
            </p>
          </div>
        </Link>

        {/* return and orders......... */}

        <div className="hidden mdl:flex flex-col items-start justify-center headerHover">
          <p className="text-xs text-[#ccc] font light ">Return</p>
          <p className="text-sm font-semibold  text-white">Orders</p>
        </div>

        {/* cart section...... */}

        <Link to="cart">
          <div className="flex items-start justify-center p-2 headerHover relative">
            <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
            <p className="text-xs font-semibold  text-white">
              Cart
              <span
                className="absolute text-xs top-[-0.3rem] left-6 font-semibold p-1 h-4 
            bg-[#f3a847] text-[#131921] rounded-full flex justify-center items-center "
              >
                {products.length > 0 ? products.length : 0}
              </span>
            </p>
          </div>
        </Link>
        {
          userInfo && (
            <div
            onClick={handelLogout}
            className="flex flex-col justify-center items-center headerHover relative p-1">
              <FontAwesomeIcon icon={faRightFromBracket} />
              <p className='hidden mdl:inline-flex text-xs font-semibold text-whiteText'>
                Log out
              </p>
            </div>
          )
        }
      </div>
      <Headerbottom />
    </nav>
  );
}

export default Header;
