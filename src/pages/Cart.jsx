import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import {
  deleteItem,
  resetCart,
  incrementQuntity,
  decrementQunatity,
} from "../redux/amazonSlice";
import { emptyCart } from "../assets/index";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.amazon.products);
  const [totalPrice, setTotalPrice] = useState("");
  useEffect(() => {
    let total = 0;
    products.map((item) => {
      total += item.price * item.quantity;
      return setTotalPrice(total.toFixed(2));
    });
  }, [products]);

  return (
    <div className="w-full bg-gray-100 p-4">
      {products.length > 0 ? (
        <div className="container mx-auto h-auto lg:grid grid-cols-5  gap-8">
          <div className="w-full bg-white px-4 col-span-4">
            <div
              className="font-titleFont flex items-center
            justify-between border-b-[1px] border-b-gray-400 py-3 px-4"
            >
              <h2 className=" text-sm md:text-3xl font-medium">Shopping Cart</h2>
              <h4 className=" text-sm md:text-xl font-normal">Price</h4>
            </div>
            {/* products start here */}
            <div>
              {products.map((item) => (
                <div
                  key={item.id}
                  className="w-full border-b-[1px] border-b-gray-300 p-4 flex items-center gap-6 "
                >
                  <div className="w-full flex items-center gap-6">
                    <div className="md:w-1/5 w-[40%]">
                      <img
                        className="md:w-44 w-96 h-44 object-contain"
                        src={item.image}
                        alt=""
                      />
                    </div>
                    <div className="w-[60%] md:w-[80%]">
                      <h2 className="font-semibold text-sm md:text-lg">{item.title}</h2>
                      <p className=" text-xs md:text-sm">{item.description.substring(0,100)}...</p>
                      <p className=" text-sm md:text-base">
                        Unit Price{" "}
                        <span className="text-sm md:textbase font-semibold">${item.price}</span>
                      </p>
                      <div
                        className=" bg-[#f0f2f2] flex justify-center items-center gap-1 w-20 md:w-24 py-1
                    text-center drop-shadow-lg rounded-md "
                      >
                        <p className="text-sm md:text-base" >Qty:</p>
                        <p
                          onClick={() => dispatch(decrementQunatity(item.id))}
                          className="text-xs md:text-base cursor-pointer bg-gray-200 px-1 rounded-md hover:;bg-gray-400 duration-300"
                        >
                          -
                        </p>
                        <p className="text-sm md:text-base">{item.quantity}</p>
                        <p
                          onClick={() => dispatch(incrementQuntity(item.id))}
                          className="text-xs md:text-base cursor-pointer bg-gray-200 px-1 rounded-md hover:;bg-gray-400 duration-300"
                        >
                          +
                        </p>
                      </div>
                      <button
                        onClick={() => dispatch(deleteItem(item.id))}
                        className="bg-red-500 w-24 md:w-36 py-1 rounded-lg text-white mt-2 
                    hover:bg-red-700 active:bg-red-900 duration-300 "
                      >
                        Delete Item
                      </button>
                    </div>
                    <div>
                      <p className="md:text-lg font-titleFont font-semibold text-xs">
                        {item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full py-2">
              <button
                onClick={() => dispatch(resetCart())}
                className="px-10 py-2 bg-red-500 hover:bg-red-600 active:bg-red-800
            text-white rounded-lg font-titleFont font-semibold text-sm md:text-lg tracking-wide"
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div className="w-full md:h-52 h-36 bg-white col-span-2 md:col-span-1 flex flex-col items-center justify-center p-2 md:p-4">
            <div>
              <p className=" text-[0.6rem] md:text-sm text-start">
                <span className=" bg-white text-green-500 rounded-full">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>{" "}
                Your order qulifies for FREE Shiping this option at checkout.{" "}
                <span className=" text-blue-500">See details....</span>
              </p>
            </div>
            <div className="">
              <p className="text-xs md:text-base font-semibold px-10 flex items-center justify-between">
                Total:
                <span className=" text-xs md:text-lg font-bold">{totalPrice}</span>
              </p>
            </div>
            <button
              className="w-full font-titleFont font-medium text-xs md:text-base bg-gradient-to-tr from-yellow-400
          to-yellow-200 border hover:from-yellow-300  hover:t0-yellow-400 border-yellow-500 active:bg-gradient-to-bl
          active:from-yellow-400 duration-200 py-1.5 rounded-md mt-3"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      ) : (
        <div className=" flex items-center justify-center gap-2 py-2 ">
          <div>
            <img className="md:w-44 w-28 " src={emptyCart} alt="" />
          </div>
          <div className="md:w-64 w-44 p-4 text-center  bg-white flex flex-col items-center justify-center rounded-md shadow-lg ">
            <h1 className=" text-sm md:text-xl font-bold  font-titleFont">
              Your Cart feels lonely.
            </h1>
            <p className=" text-xs md:text-sm text-center">
              Your shooping cart lives to serde. give it purpose - fill it with
              books, electronics, videos, etc make it happy.
            </p>
            <Link to="/">
              <button
                className="w-full font-titleFont font-medium text-xs md:text-base bg-gradient-to-tr from-yellow-400
          to-yellow-200 border hover:from-yellow-300  hover:t0-yellow-400 border-yellow-500 active:bg-gradient-to-bl
          active:from-yellow-400 duration-200 rounded-md mt-3 px-4 py-2"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
