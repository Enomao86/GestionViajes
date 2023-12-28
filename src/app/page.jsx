import Image from "next/image";
import "./globals.css";

import Banner from "./component/banner";
import Header from "./component/Header";
import BackgroundAnimation from "./component/BackgroundAnimation";
import Login from "./component/Login/page";
import ModalButton from "./ModalButton/page";


export default function Home() {
  return (
    <div>
      <div>
        {/* <div className="relative"> */}
        {/* Capa de animación como fondo */}
        {/* <div className="absolute inset-0"> */}
      </div>
      <div>
        <ModalButton />
        
      </div>
    </div>
  );
}
