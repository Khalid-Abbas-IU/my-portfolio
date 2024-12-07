"use client";

import projects from "../../data/projects";

export default function LandingPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>
            <div className="grid gap-8 lg:grid-cols-2">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="border rounded-lg shadow-md p-4 bg-white"
                    >
                        <h2 className="text-2xl font-semibold">{project.title}</h2>
                        <p className="text-gray-700 mt-2">{project.description}</p>

                        <div className="mt-4">
                            <h3 className="font-bold">Video Demo:</h3>
                            <video
                                className="w-full rounded-lg border"
                                controls
                                src={project.video}
                            />
                        </div>

                        <div className="mt-4">
                            <h3 className="font-bold">Screenshots:</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {project.screenshots.map((screenshot, index) => (
                                    <img
                                        key={index}
                                        src={screenshot}
                                        alt={`${project.title} Screenshot`}
                                        className="w-full rounded-lg border"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 flex space-x-4">
                            <a
                                href={project.demo}
                                target="_blank"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                rel="noopener noreferrer"
                            >
                                View Demo
                            </a>
                            {project.source && (
                                <a
                                    href={project.source}
                                    target="_blank"
                                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
                                    rel="noopener noreferrer"
                                >
                                    View Source
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
