"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import imgbanner from "@/app/asset/img/gestionviajes.png";
import ModalButton from "./ModalButton";
import Login from "../../../pages/Login";

function Banner() {
  return (
    <section className="flex">
      <div className="flex-1">
        <Image
          src={imgbanner}
          alt="logo"
          className="h-[80%] w-[80%] opacity-50"
          priority={true}
        ></Image>
      </div>
      <div className="flex-1">
        <p className="text-lg">
          Diseña un panel intuitivo que muestra información clave, como la lista
          de pasajeros, estado de pagos, destinos y fechas del viaje. <br />{" "}
          Permite al organizador agregar detalles de cada pasajero, como nombre,
          contacto, preferencias y estado de pago. La capacidad de modificar o
          eliminar pasajeros. <br /> sistema que registra los pagos de cada
          pasajero, indicando si pagaron total, parcial o nada. incluye
          notificaciones para recordar los pagos pendientes. <br />
          Mantén un historial de actividades, como cambios en la lista de
          pasajeros o actualizaciones de pago. Esto proporcionará una visión
          completa del proceso organizativo.
        </p>
      
<Login/>
        <div></div>
      </div>
    </section>
  );
}

export default Banner;
