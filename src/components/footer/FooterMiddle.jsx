import React from "react";
import FooterMiddleList from "./FooterMiddleList";
import { middleList } from "../../constants";
import { logo,indiaflag } from "../../assets/index";

function FooterMiddle() {
  return (
    <div className="w-full bg-[#232F3E] text-white ">
      <div className="w-full border-b-[1px] border-gray-500 py-10">
        <div className="max-w-5xl mx-auto text-gray-300">
          <div className="w-full grid grid-cols-2 lgl:grid-cols-4  md:place-items-center md:items-start gap-2  px-3">
            {middleList.map((item) => (
              <FooterMiddleList
                key={item.id}
                title={item.title}
                listItem={item.ListItem}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex gap-6 items-center justify-center py-6 ">
        <div>
          <img src={logo} className="w-20 " alt="" />
        </div>
        <div className="flex gap-2">
          <p
            className="flex gap-1 items-center justify-center border border-gray-500 
            hover:border-[#febd69] cursor-pointer duration-200 px-2 py-1 "
          >
            English
          </p>
        </div>
        <div className="flex gap-1 items-center justify-center border border-gray-500
          hover:border-[#febd69] cursor-pointer duration-200 px-2 py-1"> 
          <img className="w-6" src={indiaflag} alt="" />
          <h3>India</h3>
        </div>
      </div>
    </div>
  );
}

export default FooterMiddle;
