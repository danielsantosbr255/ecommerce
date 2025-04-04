import React from "react";

export default function Footer() {
    return (
        <footer className="flex flex-col w-full justify-center items-center p-4 my-4 text-gray-700 font-semibold">
            <p>©2024 Fireforge Labs. All rights reserved.</p>
            <p>Privacy Policy | Terms of Service</p>
            <p className="text-sm text-gray-500">
                Created by <a href="https://github.com/danielsantos255">Daniel Santos</a>
            </p>
        </footer>
    );
}
