"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

export default function ScreenshotModal({ screenshots, isOpen, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!isOpen) return null;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="relative w-11/12 max-w-4xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-2xl"
                >
                    <FaTimes />
                </button>
                {/* Image Carousel */}
                <div className="relative">
                    <img
                        src={screenshots[currentIndex]}
                        alt={`Screenshot ${currentIndex + 1}`}
                        className="rounded-md shadow-lg w-full"
                    />
                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}
