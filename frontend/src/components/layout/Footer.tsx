import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-col w-full border-t border-lines mt-auto justify-center items-center p-4 text-tx-secondary font-semibold">
      <div className="flex gap-2 justify-center items-center text-tx-on-primary mb-2 animate-pulse">
        <Link
          href="https://github.com/danielsantosbr255"
          target="_blank"
          className="bg-primary shadow-xs p-2 rounded-xl hover:scale-110 transition-transform duration-300"
        >
          <FaGithub />
        </Link>
        <a
          href="https://www.linkedin.com/in/daniel-santos-7826051b4/"
          target="_blank"
          className="bg-primary shadow-xs p-2 rounded-lg hover:scale-110 transition-transform duration-300"
        >
          <FaLinkedin />
        </a>
      </div>

      <p>©2024 Fireforge Labs. All rights reserved.</p>
      <p>Privacy Policy | Terms of Service</p>
      <p className="text-sm text-tx-secondary flex gap-2">
        <a className="flex gap-2" href="https://github.com/danielsantosbr255" target="_blank">
          <FaGithub /> Created by Daniel Santos
        </a>
      </p>
    </footer>
  );
}
