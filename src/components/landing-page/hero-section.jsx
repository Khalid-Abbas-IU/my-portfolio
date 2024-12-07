"use client";

import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { TbBrandFiverr,TbBrandLinkedin } from "react-icons/tb";

export default function HeroSection() {
    return (
        <>
            {/* Hero Section */}
            <section
                id="hero"
                className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-8"
            >
                {/* Left Side: Name, Details, and Buttons */}
                <div className="lg:w-1/2">
                    <h1 className="text-5xl font-extrabold mb-4">Khalid Abbas Jan</h1>
                    <p className="text-xl text-gray-600 mb-6">
                        Full-Stack Developer | MERN Stack Expert | Canvas Expert
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6">
                        <li>Fabric.js, HTML5 Canvas, Shadcn Library</li>
                        <li>2D Renderings and Interactive Graphics</li>
                        <li>MERN Stack (MongoDB, Express.js, React.js, Node.js)</li>
                        <li>AWS Deployments, PHP Development</li>
                    </ul>
                    <div className="flex flex-wrap gap-4">
                        {/* GitHub Profile Button */}
                        <Button asChild variant="outline" className="flex items-center gap-2">
                            <a
                                href="https://github.com/Khalid-Abbas-IU"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGithub />
                                GitHub Profile
                            </a>
                        </Button>
                        {/* Fiverr Button */}
                        <Button
                            asChild
                            variant="secondary"
                            className="flex items-center gap-2 px-6 py-3 text-white bg-black hover:bg-black/70"
                        >
                            <a
                                href="https://www.fiverr.com/khalid_abbasiu"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <TbBrandFiverr />
                                View My Fiverr Gigs
                            </a>
                        </Button>
                        {/* Fiverr Button */}
                        <Button
                            asChild
                            variant="secondary"
                            className="flex items-center gap-2 px-6 py-3 text-white bg-purple-500 hover:bg-purple-600"
                        >
                            <a
                                href="https://www.linkedin.com/in/khalid-abbas-869831193/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <TbBrandLinkedin />
                                LinkedIn
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Right Side: Profile Image */}
                <div className="lg:w-1/2 flex justify-end">
                    <img
                        src="/assets/images/profile-pic.png"
                        alt="Profile Picture"
                        className="w-56 h-56 lg:w-[20rem] lg:h-auto rounded-full shadow-lg hover:scale-105 transition-transform"
                    />
                </div>
            </section>

            {/* GitHub Contributions */}
            <section className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-3xl font-bold mb-6">GitHub Contributions</h2>
                <img
                    src="/assets/images/github-contribution-chart.png"
                    alt="GitHub Contribution Chart"
                    className="rounded-md shadow-lg mx-auto hover:scale-105 transition-transform"
                />
            </section>
        </>
    );
}
