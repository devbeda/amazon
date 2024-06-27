import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar,faHeartCirclePlus,faCircleInfo,faCartPlus,faSliders } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/amazonSlice";


function Products() {
  const dispatch = useDispatch()
  const data = useLoaderData();
  const productData = data.data;
  console.log(productData);

  return (
    <div className="max-w-screen mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 md gap-6 md:gap-10 px-4 ">
      {productData.map((item) => (
        <div
          key={item.id}
          className="bg-white h-auto border-[1px] border-gray-200 py-6 z-30 
            hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative 
             flex flex-col"
        >
          <div className="w-full h-auto flex justify-center items-center px-4 relative group">
          <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-500">{item.category}</span>
            <img
              className="w-52 h-64 object-contain"
              src={item.image}
              alt="productImage"
            />
            <ul className="w-full h-36 bg-gray-100 absolute bottom-[-170px]
              group group-hover:bottom-0 duration-700 flex flex-col items-end justify-center gap-2 
              font-titleFont px-2 border-1 border-r">
              <li className="productLi">Compare <span><FontAwesomeIcon icon={faSliders} /></span></li>
              <li className="productLi">Add to Cart <span><FontAwesomeIcon icon={faCartPlus} /></span></li>
              <li className="productLi">View Details <span><FontAwesomeIcon icon={faCircleInfo} /></span></li>
              <li className="productLi">Add to Wish List <span><FontAwesomeIcon icon={faHeartCirclePlus} /></span></li>
            </ul>
          </div>
          <div className="px-5 z-10 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="font-titleFont tracking-wide text-lg text-[#131921]">{item.title.substring(0, 20)}.. </h2>
              <p className="text-sm text-gray-600 font-semibold">${item.price}</p>
            </div>
            <div>
              <p className="text-sm">{item.description.substring(0,100)}...</p>
              <div className=" text-yellow-500">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
            <button onClick={()=>dispatch(addToCart({
              id:item.id,
              title:item.title,
              description:item.description,
              price:item.price,
              category:item.category,
              image:item.image,
              quantity:1,
            }))} className="w-full font-titleFont font-medium text-base bg-gradient-to-tr
              from-yellow-400 to-yellow-200 hover:from-yellow-300 hover:to-yellow-600
              border-yellow-500 hover:border-yellowo700 active:bg-gradiant-to-bl
              active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3 ">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
