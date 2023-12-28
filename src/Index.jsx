// pages/index.js (o el nombre que tengas para tu componente principal)
import Image from "next/image";
import Banner from "../component/Banner";
import Header from "../component/Header";
import BackgroundAnimation from "../component/BackgroundAnimation";
import Login from "../component/Login/page";
import ModalButton from "../ModalButton/page";
import Register from "../component/Register/page";

const Home = () => {
  return (
    <div>
      <div>{/* Capa de animación como fondo */}</div>
      <div>
        <ModalButton />
      </div>
    </div>
  );
};

export default Home;
