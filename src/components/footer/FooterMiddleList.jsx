import React from "react";

function FooterMiddleList({title,listItem}) {
  return (
    <div className="mb-4">
      <h3 className="font-titleFont text-[13px] text-white md:text-base font-semibold mb-3">
        {title}
      </h3>
      <ul className="flex flex-col gap-0 md:gap-2 font-bodyFont">
        {
            listItem.map((item)=>
                item.ListData.map((data,i)=>
                    (<li key={i} className="footerLink text-[10px] md:text-sm">{data}</li>))
                
            )
        }
      </ul>
    </div>
  );
}

export default FooterMiddleList;
