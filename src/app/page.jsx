"use client";

import Image from "next/image";
import "./globals.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Banner from "./component/banner";
import Header from "./component/Header";
import BackgroundAnimation from "./component/BackgroundAnimation";

export default function Home() {
  return (
    <div className="relative">
      {/* Capa de animación como fondo */}
      <div className="absolute inset-0">
        <BackgroundAnimation />
      </div>
      <div>
        <Header />
        <Banner />
      </div>
    </div>
  );
}
