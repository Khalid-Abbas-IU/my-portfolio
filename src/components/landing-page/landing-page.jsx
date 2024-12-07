"use client";

import { useState } from "react";
import projects from "@/data/projects";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeroSection from "./hero-section";
import Header from "./header";
import ScreenshotModal from "../modals/ScreenshotModal";

export default function LandingPage() {
    const [selectedScreenshots, setSelectedScreenshots] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (screenshots) => {
        setSelectedScreenshots(screenshots);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedScreenshots(null);
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Header */}
            <Header />
            {/* Hero Section */}
            <HeroSection />

            {/* Hire Me Section */}
            <section id="contact" className="container mx-auto px-4 py-12 text-center">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-gray-800">
                            Hire Me
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 mb-6">
                            I am available for freelance projects on Upwork and Fiverr. Check
                            my profile for reviews, completed projects, and expertise.
                        </p>
                    </CardContent>
                </Card>
            </section>

            {/* Projects Section */}
            <section id="projects" className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-800">
                    MY PROJECTS
                </h1>
                <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
                    {projects.map((project) => (
                        <Card
                            key={project.id}
                            className="shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        >
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold">
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {project.video && (
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-gray-700">
                                            Video Demo:
                                        </h3>
                                        <video
                                            className="w-full rounded-md border mt-2 shadow"
                                            controls
                                            src={project.video}
                                        />
                                    </div>
                                )}
                                <div className="mt-6">
                                    <h3 className="font-semibold text-gray-700">Screenshots:</h3>
                                    <div className="grid grid-cols-2 gap-3 mt-3">
                                        {project.screenshots.map((screenshot, index) => (
                                            <img
                                                key={index}
                                                src={screenshot}
                                                alt={`${project.title} Screenshot`}
                                                className="w-full rounded-md border hover:scale-105 transition-transform duration-200 cursor-pointer"
                                                onClick={() => handleOpenModal(project.screenshots)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between mt-6">
                                <Button asChild>
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Demo
                                    </a>
                                </Button>
                                {project.source && (
                                    <Button asChild variant="secondary">
                                        <a
                                            href={project.source}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View Source
                                        </a>
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Screenshot Modal */}
            <ScreenshotModal
                screenshots={selectedScreenshots}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}
