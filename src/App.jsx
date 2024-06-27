import { useState } from "react";
import {
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import firebaseConfig from "./firebase.config";
import Header from "./components/header/Header";
import Banner from "./components/home/Banner";
import Footer from "./components/footer/Footer";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import { productsData } from "./api/Api";
import Cart from "./pages/Cart";
import Resgistration from "./pages/Resgistration";

function Layout() {
  return (
    <>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} loader={productsData} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route>
          <Route path="signin" element={<Signin />} />
          <Route path="resgistration" element={<Resgistration/>} />
        </Route>

      </Route>
    )
  );

  return (
    <div className="font-bodyFont bg-gray-100">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
