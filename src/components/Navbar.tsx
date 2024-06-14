"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className=" w-full shadow-sm">
      <nav className="container flex items-center justify-around  max-md:block">
        <div className="flex items-center justify-between p-4">
          <Image
            src="/res/images/poupeme-icon.png"
            alt="logo"
            width={48}
            height={64}
          />
          <button
            className="md:hidden ml-3 font-bold text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "X" : "☰"}
          </button>
        </div>

        <div
          className={`flex gap-4 ${
            isOpen ? "flex-col" : "hidden"
          } max-md:shadow-md p-4 md:flex max-md:absolute max-md:w-full z-10 bg-white `}
        >
          <Link
            href="/#encurtar"
            className="hover:text-indigo-400 hover:border-b-indigo-400 border-b-2 font-bold"
          >
            Inicio
          </Link>
          <Link
            href="/estatisticas"
            className="hover:text-indigo-400 hover:border-b-indigo-400 border-b-2 font-bold"
          >
            Estatisticas
          </Link>
          <Link
            href="/"
            className="hover:text-indigo-400 hover:border-b-indigo-400 border-b-2 font-bold"
          >
            Sobre
          </Link>
          <Link
            href="/"
            className="hover:text-indigo-400 hover:border-b-indigo-400 border-b-2 font-bold"
          >
            Termos de Serviço
          </Link>
        </div>
      </nav>
    </header>
  );
}
