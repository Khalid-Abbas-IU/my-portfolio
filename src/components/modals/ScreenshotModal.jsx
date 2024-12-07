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

    const handleBackdropClick = (e) => {
        if (e.target.id === "modal-backdrop") {
            onClose();
        }
    };

    return (
        <div
            id="modal-backdrop"
            className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center"
            onClick={handleBackdropClick}
        >
            <div className="relative w-11/12 max-w-4xl bg-white rounded-md overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-black text-2xl"
                >
                    <FaTimes />
                </button>
                {/* Image Carousel */}
                <div className="relative">
                    <img
                        src={screenshots[currentIndex]}
                        alt={`Screenshot ${currentIndex + 1}`}
                        className="w-full h-auto"
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
