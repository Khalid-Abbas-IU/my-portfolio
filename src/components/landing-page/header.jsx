"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaHome, FaFolderOpen, FaEnvelope } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll event to add/remove shadow for sticky header
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", handleScroll);
    }

    return (
        <header
            className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${
                isScrolled ? "shadow-lg" : "shadow-md"
            }`}
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold text-gray-800">
                    <a href="#">K.A</a>
                </div>
                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-6">
                    <a
                        href="#hero"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all"
                    >
                        <FaHome />
                        Home
                    </a>
                    <a
                        href="#projects"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all"
                    >
                        <FaFolderOpen />
                        Projects
                    </a>
                    <a
                        href="#contact"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all"
                    >
                        <FaEnvelope />
                        Contact
                    </a>
                </nav>
                {/* Buttons */}
                <div className="flex space-x-4 items-center">
                    {/* Hire Me on Upwork Button */}
                    <Button
                        variant="secondary"
                        asChild
                        className="px-4 py-2 flex items-center gap-2 text-sm text-white bg-black hover:bg-green-600"
                    >
                        <a
                            href="https://www.upwork.com/freelancers/~01e48daa9d2ab5861a"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-center items-center"
                        >
                            <FaUpwork size={20}/>
                            <span>Hire Me on Upwork</span>
                        </a>
                    </Button>
                </div>
            </div>
        </header>
    );
}
