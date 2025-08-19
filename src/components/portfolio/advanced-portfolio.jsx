"use client";

import React, { useState, useRef, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Home, FolderOpen, Mail, Code, Box, Rocket, ExternalLink, Play, ChevronLeft, ChevronRight, X, GitBranch, Star, Users } from 'lucide-react';

// Real projects data
const projects = [
    {
        id: 1,
        title: "PDF Stamper Tool",
        description: "A powerful PDF stamping tool designed for welding map inspections. It allows users to add watermarks, timestamps, and annotations to ensure secure and professional document handling.",
        video: "/assets/projects/pdf-stamper/pdf-stamper.mp4",
        screenshots: [
            "/assets/projects/pdf-stamper/pdf-stamper-1.png",
            "/assets/projects/pdf-stamper/pdf-stamper-2.png",
            "/assets/projects/pdf-stamper/pdf-stamper-3.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://pdf-stamper-tool-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/pdf-stamp-app",
        color: "#ff6b6b"
    },
    {
        id: 2,
        title: "Dimensions App",
        description: "An advanced app that enables accurate measurement, annotation, and visualization for various inspection workflows, tailored for professionals.",
        video: "/assets/projects/dimensions-app/video.mp4",
        screenshots: [
            "/assets/projects/dimensions-app/img.png",
            "/assets/projects/dimensions-app/img_1.png",
            "/assets/projects/dimensions-app/img_2.png",
            "/assets/projects/dimensions-app/img_3.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://dimensions-app-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/dimensions-app",
        color: "#4ecdc4"
    },
    {
        id: 3,
        title: "Logoflow App",
        description: "A tool for designing and managing logos efficiently, with multiple customization options for branding professionals.",
        video: "",
        screenshots: [
            "/assets/projects/logoflow/img.png",
            "/assets/projects/logoflow/img_1.png",
            "/assets/projects/logoflow/img_2.png",
            "/assets/projects/logoflow/img_3.png",
            "/assets/projects/logoflow/img_4.png",
            "/assets/projects/logoflow/img_5.png",
            "/assets/projects/logoflow/img_6.png",
            "/assets/projects/logoflow/img_7.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://logoflow-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/logoflow-app",
        color: "#45b7d1"
    },
    {
        id: 4,
        title: "DFD Designer Tool",
        description: "A tool for designing and analyzing Data Flow Diagrams (DFDs) with robust in-house services.",
        video: "/assets/projects/dfd-designer-tool/video.mp4",
        screenshots: [
            "/assets/projects/dfd-designer-tool/img.png",
            "/assets/projects/dfd-designer-tool/img_1.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://dfd-designer-tool-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/dfd-designer-tool",
        color: "#feca57"
    },
    {
        id: 5,
        title: "Weld Map App",
        description: "A comprehensive application tailored for managing weld mapping documentation, providing tools for annotation, process visualization, and reporting.",
        video: "/assets/projects/weld-map/weld-map.mp4",
        screenshots: [
            "/assets/projects/weld-map/weld-map-1.png",
            "/assets/projects/weld-map/weld-map-2.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://weld-map-app-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/weld-map-app",
        color: "#a55eea"
    },
    {
        id: 6,
        title: "Map Plan Marker",
        description: "A tool for marking and annotating plans, particularly useful in welding and construction workflows, ensuring efficient documentation.",
        video: "/assets/projects/map-marker/video.mp4",
        screenshots: [
            "/assets/projects/map-marker/img.png",
            "/assets/projects/map-marker/img_1.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://map-plan-marker-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/map-plan-marker",
        color: "#26de81"
    },
    {
        id: 7,
        title: "Football Easy Coach",
        description: "A platform designed to help football coaches create, manage, and execute strategies effortlessly.",
        video: "",
        screenshots: [
            "/assets/projects/football-easy-coach/img.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://football-easy-coach-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/football-easy-coach",
        color: "#fd79a8"
    },
    {
        id: 8,
        title: "Build Studio",
        description: "An application to assist in setting up studio environments for seamless in-house operations.",
        video: "",
        screenshots: [
            "/assets/projects/build-studio/img.png",
            "/assets/projects/build-studio/img_1.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://build-studio-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/build-studio",
        color: "#fdcb6e"
    },
    {
        id: 9,
        title: "T-Shirt Designer",
        description: "An interactive application for designing T-shirts with real-time preview and customization options.",
        video: "",
        screenshots: [
            "/assets/projects/t-shirt-designer/img.png",
            "/assets/projects/t-shirt-designer/img_1.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://tshirt-designer-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/tshirt-designer",
        color: "#6c5ce7"
    },
    {
        id: 10,
        title: "Generate Image",
        description: "An innovative tool that generates and customizes images based on user inputs, streamlining workflows for graphic and visual design.",
        video: "",
        screenshots: [
            "/assets/projects/generate-image/img.png",
            "/assets/projects/generate-image/img_1.png",
        ],
        technologies: ["Next.js", "Node.js", "Tailwind CSS"],
        demo: "https://generate-image-tool-demo.vercel.app",
        source: "https://github.com/Khalid-Abbas-IU/generate-image-tool",
        color: "#00b894"
    },
];

// Dynamically import Three.js to avoid SSR issues - COMPLETELY CLIENT SIDE
const ThreeScene = dynamic(() => Promise.resolve(({ containerRef }) => {
    const mountRef = useRef(null);
    const [isClient, setIsClient] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Ensure we're completely on the client side
        setIsClient(typeof window !== 'undefined');
    }, []);

    useEffect(() => {
        if (!isClient || !mountRef.current) return;

        let scene, camera, renderer, animationId;
        let meshes = [];

        const initThree = async () => {
            try {
                // Dynamic import of Three.js
                const THREE = await import('three');

                console.log('Three.js loaded successfully'); // Debug log

                // Scene setup
                scene = new THREE.Scene();
                scene.background = new THREE.Color(0x1a1a2e); // Lighter dark background

                // Camera
                camera = new THREE.PerspectiveCamera(
                    75,
                    mountRef.current.clientWidth / mountRef.current.clientHeight,
                    0.1,
                    1000
                );
                camera.position.z = 5;

                // Renderer
                renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                renderer.toneMapping = THREE.ACESFilmicToneMapping; // Better tone mapping
                renderer.toneMappingExposure = 1.2; // Brighter exposure

                if (mountRef.current) {
                    mountRef.current.appendChild(renderer.domElement);
                    console.log('Renderer added to DOM'); // Debug log
                }

                // Enhanced Lighting
                const ambientLight = new THREE.AmbientLight(0x404080, 1.2); // Brighter ambient with blue tint
                scene.add(ambientLight);

                // Multiple point lights for better illumination
                const pointLight1 = new THREE.PointLight(0xffffff, 2, 100);
                pointLight1.position.set(5, 5, 5);
                pointLight1.castShadow = true;
                scene.add(pointLight1);

                const pointLight2 = new THREE.PointLight(0xff6b9d, 1.5, 100); // Pink light
                pointLight2.position.set(-5, 3, 2);
                scene.add(pointLight2);

                const pointLight3 = new THREE.PointLight(0x6b8cff, 1.5, 100); // Blue light
                pointLight3.position.set(3, -5, 4);
                scene.add(pointLight3);

                // Directional light for better overall illumination
                const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
                directionalLight.position.set(10, 10, 5);
                directionalLight.castShadow = true;
                scene.add(directionalLight);

                // Create floating geometric shapes with more variety
                const geometries = [
                    // Basic shapes
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.SphereGeometry(0.7, 32, 32),
                    new THREE.ConeGeometry(0.7, 1.5, 8),
                    new THREE.OctahedronGeometry(0.8),
                    new THREE.TorusGeometry(0.7, 0.3, 16, 100),

                    // Ring and tube shapes
                    new THREE.RingGeometry(0.5, 1.2, 16, 5),
                    new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16),
                    new THREE.CylinderGeometry(0.3, 0.8, 1.5, 8),

                    // Complex shapes
                    new THREE.DodecahedronGeometry(0.8),
                    new THREE.IcosahedronGeometry(0.8),
                    new THREE.TetrahedronGeometry(0.9),

                    // Custom wireframe shapes
                    new THREE.SphereGeometry(1, 16, 16),
                    new THREE.BoxGeometry(1.2, 0.2, 1.2),
                    new THREE.ConeGeometry(0.4, 2, 6),
                ];

                const materials = [
                    // Solid glowing materials
                    new THREE.MeshPhongMaterial({
                        color: 0xff6b6b,
                        transparent: true,
                        opacity: 0.9,
                        shininess: 100,
                        emissive: 0x220000
                    }),
                    new THREE.MeshPhongMaterial({
                        color: 0x4ecdc4,
                        transparent: true,
                        opacity: 0.9,
                        shininess: 100,
                        emissive: 0x002222
                    }),
                    new THREE.MeshPhongMaterial({
                        color: 0x45b7d1,
                        transparent: true,
                        opacity: 0.9,
                        shininess: 100,
                        emissive: 0x001122
                    }),
                    new THREE.MeshPhongMaterial({
                        color: 0xfeca57,
                        transparent: true,
                        opacity: 0.9,
                        shininess: 100,
                        emissive: 0x221100
                    }),
                    new THREE.MeshPhongMaterial({
                        color: 0xa55eea,
                        transparent: true,
                        opacity: 0.9,
                        shininess: 100,
                        emissive: 0x110022
                    }),

                    // Wireframe materials for variety
                    new THREE.MeshBasicMaterial({
                        color: 0x00ff88,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.6
                    }),
                    new THREE.MeshBasicMaterial({
                        color: 0xff0088,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.6
                    }),
                    new THREE.MeshBasicMaterial({
                        color: 0x8800ff,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.6
                    }),

                    // Metallic materials
                    new THREE.MeshStandardMaterial({
                        color: 0x87ceeb,
                        metalness: 0.8,
                        roughness: 0.2,
                        transparent: true,
                        opacity: 0.8,
                        emissive: 0x001122
                    }),
                    new THREE.MeshStandardMaterial({
                        color: 0xdda0dd,
                        metalness: 0.8,
                        roughness: 0.2,
                        transparent: true,
                        opacity: 0.8,
                        emissive: 0x110011
                    })
                ];

                // Increase number of objects for more dynamic scene
                for (let i = 0; i < 25; i++) {
                    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
                    const material = materials[Math.floor(Math.random() * materials.length)];
                    const mesh = new THREE.Mesh(geometry, material);

                    mesh.position.set(
                        (Math.random() - 0.5) * 25,
                        (Math.random() - 0.5) * 25,
                        (Math.random() - 0.5) * 25
                    );

                    mesh.rotation.set(
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        Math.random() * Math.PI
                    );

                    mesh.scale.setScalar(0.2 + Math.random() * 0.8);
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;

                    scene.add(mesh);
                    meshes.push({
                        mesh,
                        rotationSpeed: {
                            x: (Math.random() - 0.5) * 0.03,
                            y: (Math.random() - 0.5) * 0.03,
                            z: (Math.random() - 0.5) * 0.03
                        },
                        floatSpeed: Math.random() * 0.02 + 0.01,
                        initialY: mesh.position.y,
                        floatAmplitude: 0.5 + Math.random() * 1.5
                    });
                }

                // Add some special animated ring groups
                for (let i = 0; i < 3; i++) {
                    const ringGroup = new THREE.Group();

                    // Create multiple concentric rings
                    for (let j = 0; j < 3; j++) {
                        const ringGeometry = new THREE.RingGeometry(0.8 + j * 0.4, 1.0 + j * 0.4, 32);
                        const ringMaterial = new THREE.MeshBasicMaterial({
                            color: [0xff6b9d, 0x6b8cff, 0x6bff8c][j],
                            transparent: true,
                            opacity: 0.4,
                            side: THREE.DoubleSide
                        });
                        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                        ring.rotation.x = j * Math.PI / 6;
                        ringGroup.add(ring);
                    }

                    ringGroup.position.set(
                        (Math.random() - 0.5) * 30,
                        (Math.random() - 0.5) * 30,
                        (Math.random() - 0.5) * 30
                    );

                    scene.add(ringGroup);
                    meshes.push({
                        mesh: ringGroup,
                        rotationSpeed: {
                            x: (Math.random() - 0.5) * 0.02,
                            y: (Math.random() - 0.5) * 0.02,
                            z: (Math.random() - 0.5) * 0.02
                        },
                        floatSpeed: Math.random() * 0.015 + 0.005,
                        initialY: ringGroup.position.y,
                        floatAmplitude: 1.0
                    });
                }

                console.log('Created', meshes.length, 'objects including rings and complex shapes'); // Debug log

                // Mouse interaction
                let mouseX = 0;
                let mouseY = 0;

                const handleMouseMove = (event) => {
                    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
                };

                window.addEventListener('mousemove', handleMouseMove);

                // Animation loop
                const animate = (time) => {
                    animationId = requestAnimationFrame(animate);

                    // Update camera position based on mouse
                    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
                    camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
                    camera.lookAt(scene.position);

                    // Animate meshes
                    meshes.forEach(({ mesh, rotationSpeed, floatSpeed }, index) => {
                        mesh.rotation.x += rotationSpeed.x;
                        mesh.rotation.y += rotationSpeed.y;
                        mesh.rotation.z += rotationSpeed.z;

                        mesh.position.y += Math.sin(time * floatSpeed + index) * 0.01;
                    });

                    renderer.render(scene, camera);
                };

                animate(0);
                setIsLoaded(true); // Mark as loaded after everything is set up
                console.log('3D scene initialized successfully'); // Debug log

                // Handle resize
                const handleResize = () => {
                    if (!mountRef.current) return;
                    camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
                };

                window.addEventListener('resize', handleResize);

                // Cleanup function
                return () => {
                    window.removeEventListener('mousemove', handleMouseMove);
                    window.removeEventListener('resize', handleResize);
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                    }
                    if (mountRef.current && renderer && renderer.domElement) {
                        mountRef.current.removeChild(renderer.domElement);
                    }
                    if (renderer) {
                        renderer.dispose();
                    }
                };
            } catch (error) {
                console.error('Three.js initialization error:', error);
                setIsLoaded(true); // Still set loaded to show fallback
            }
        };

        const cleanup = initThree();

        return () => {
            cleanup.then(cleanupFn => {
                if (cleanupFn) cleanupFn();
            });
        };
    }, [isClient]);

    // Always return the same structure to avoid hydration issues
    return (
        <div ref={mountRef} className="w-full h-full">
            {(!isClient || !isLoaded) && (
                <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20 flex items-center justify-center">
                    <div className="text-center">
                        <Box className="animate-spin text-purple-400 mx-auto mb-2" size={32} />
                        <p className="text-gray-400 text-sm">Loading 3D Scene...</p>
                    </div>
                </div>
            )}
        </div>
    );
}), { ssr: false });

// Animated Background Component
const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),transparent_70%)]" />
        </div>
    );
};

// Header Component
const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isMounted) {
        return (
            <header className="fixed top-0 w-full z-50 bg-transparent">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        K.A
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <a href="#hero" className="flex items-center gap-2 text-gray-300">
                            <Home size={16} />
                            Home
                        </a>
                        <a href="#projects" className="flex items-center gap-2 text-gray-300">
                            <FolderOpen size={16} />
                            Projects
                        </a>
                        <a href="#contact" className="flex items-center gap-2 text-gray-300">
                            <Mail size={16} />
                            Contact
                        </a>
                    </nav>
                    <Button variant="outline" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none">
                        Hire Me
                    </Button>
                </div>
            </header>
        );
    }

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled ? 'bg-black/80 backdrop-blur-md shadow-2xl' : 'bg-transparent'
        }`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    K.A
                </div>
                <nav className="hidden md:flex space-x-8">
                    {[
                        { icon: Home, label: 'Home', href: '#hero' },
                        { icon: FolderOpen, label: 'Projects', href: '#projects' },
                        { icon: Mail, label: 'Contact', href: '#contact' }
                    ].map(({ icon: Icon, label, href }) => (
                        <a
                            key={label}
                            href={href}
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                        >
                            <Icon size={16} />
                            {label}
                        </a>
                    ))}
                </nav>
                <Button
                    variant="outline"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none hover:from-purple-700 hover:to-pink-700"
                >
                    Hire Me
                </Button>
            </div>
        </header>
    );
};

// Hero Section with 3D Background
const HeroSection = () => {
    const containerRef = useRef();

    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Suspense fallback={
                    <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20" />
                }>
                    <ThreeScene containerRef={containerRef} />
                </Suspense>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-20">
                <div className="max-w-4xl">
                    <div className="mb-6">
                        <div className="inline-flex items-center gap-2 bg-purple-600/20 px-4 py-2 rounded-full text-purple-300 text-sm backdrop-blur-sm">
                            <Box className="animate-spin" size={16} />
                            3D Portfolio Experience
                        </div>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                        Khalid Abbas Jan
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                        Full-Stack Developer crafting immersive digital experiences with
                        <span className="text-purple-400 font-semibold"> MERN Stack</span> and
                        <span className="text-pink-400 font-semibold"> Three.js</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
                        >
                            <Rocket className="mr-2" size={20} />
                            View Projects
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg"
                        >
                            <Github className="mr-2" size={20} />
                            GitHub Profile
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        {[
                            { label: 'Projects Completed', value: '10+', icon: FolderOpen },
                            { label: 'Happy Clients', value: '25+', icon: Mail },
                            { label: 'Technologies', value: '15+', icon: Code }
                        ].map(({ label, value, icon: Icon }) => (
                            <div key={label} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                <Icon className="mx-auto mb-3 text-2xl text-purple-400" size={32} />
                                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                                <div className="text-gray-400 text-sm">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// GitHub Section Component
const GitHubSection = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const githubStats = [
        { label: 'Repositories', value: '25+', icon: GitBranch },
        { label: 'Contributions', value: '500+', icon: Code },
        { label: 'Stars Earned', value: '50+', icon: Star },
        { label: 'Followers', value: '15+', icon: Users }
    ];

    if (!isMounted) {
        return (
            <section className="py-20 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                            GitHub Activity
                        </h2>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-pink-900/10 pointer-events-none" />

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-green-600/20 px-4 py-2 rounded-full text-green-300 text-sm backdrop-blur-sm mb-6">
                        <Github className="animate-pulse" size={16} />
                        Open Source Contributions
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                        GitHub Activity
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Consistent coding habits and active contribution to the developer community
                    </p>
                </div>

                {/* GitHub Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {githubStats.map(({ label, value, icon: Icon }, index) => (
                        <Card
                            key={label}
                            className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-green-400/50 transition-all duration-500 hover:transform hover:scale-105 group"
                        >
                            <CardContent className="p-6 text-center">
                                <Icon className="mx-auto mb-3 text-green-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                                <div className="text-2xl font-bold text-white mb-1">{value}</div>
                                <div className="text-gray-400 text-sm">{label}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* GitHub Contribution Chart */}
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-green-400/30 transition-all duration-500 overflow-hidden group">
                    <CardHeader>
                        <CardTitle className="text-center text-white group-hover:text-green-400 transition-colors flex items-center justify-center gap-2">
                            <Github size={24} />
                            Contribution Graph
                        </CardTitle>
                        <CardDescription className="text-center text-gray-400">
                            Daily coding activity over the past year
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-6">
                        <div className="relative rounded-lg overflow-hidden">
                            {!isImageLoaded && (
                                <div className="w-full h-48 bg-gradient-to-r from-green-900/20 to-blue-900/20 animate-pulse rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <Github className="mx-auto mb-3 text-green-400 animate-spin" size={32} />
                                        <p className="text-gray-400">Loading contribution graph...</p>
                                    </div>
                                </div>
                            )}

                            <img
                                src="/assets/images/github-contribution-chart.png"
                                alt="GitHub Contribution Chart"
                                className={`w-full rounded-lg shadow-2xl transition-all duration-700 hover:scale-105 border border-green-400/20 ${
                                    isImageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
                                }`}
                                onLoad={() => setIsImageLoaded(true)}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    setIsImageLoaded(true);
                                }}
                            />
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="outline"
                                className="border-green-400/50 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300"
                                onClick={() => window.open('https://github.com/Khalid-Abbas-IU', '_blank')}
                            >
                                <Github className="mr-2" size={18} />
                                View GitHub Profile
                            </Button>

                            <Button
                                variant="secondary"
                                className="bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                                onClick={() => window.open('https://github.com/Khalid-Abbas-IU?tab=repositories', '_blank')}
                            >
                                <GitBranch className="mr-2" size={18} />
                                Browse Repositories
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional GitHub Info */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-400/30 transition-all duration-500 group">
                        <CardHeader>
                            <CardTitle className="text-white group-hover:text-purple-400 transition-colors flex items-center gap-2">
                                <Code size={20} />
                                Coding Languages
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[
                                    { name: 'JavaScript', percentage: 85, color: '#f7df1e' },
                                    { name: 'TypeScript', percentage: 75, color: '#3178c6' },
                                    { name: 'React/Next.js', percentage: 90, color: '#61dafb' },
                                    { name: 'Node.js', percentage: 80, color: '#339933' },
                                    { name: 'Python', percentage: 60, color: '#3776ab' }
                                ].map(({ name, percentage, color }) => (
                                    <div key={name} className="group/lang">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-300 group-hover/lang:text-white transition-colors">{name}</span>
                                            <span className="text-gray-400">{percentage}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full transition-all duration-1000 ease-out"
                                                style={{
                                                    width: `${percentage}%`,
                                                    backgroundColor: color,
                                                    boxShadow: `0 0 10px ${color}40`
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-blue-400/30 transition-all duration-500 group">
                        <CardHeader>
                            <CardTitle className="text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                <Star size={20} />
                                Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { action: 'Pushed to', repo: 'pdf-stamper-tool', time: '2 hours ago', type: 'commit' },
                                    { action: 'Created', repo: 'dimensions-app', time: '1 day ago', type: 'repo' },
                                    { action: 'Updated', repo: 'logoflow-app', time: '3 days ago', type: 'commit' },
                                    { action: 'Released', repo: 'weld-map-app', time: '1 week ago', type: 'release' }
                                ].map(({ action, repo, time, type }, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group/item">
                                        <div className={`w-2 h-2 rounded-full ${
                                            type === 'commit' ? 'bg-green-400' :
                                                type === 'repo' ? 'bg-blue-400' : 'bg-purple-400'
                                        }`} />
                                        <div className="flex-1">
                                            <p className="text-gray-300 group-hover/item:text-white transition-colors">
                                                {action} <span className="text-blue-400 font-medium">{repo}</span>
                                            </p>
                                            <p className="text-gray-500 text-sm">{time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

// Projects Section Component
const ProjectsSection = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const openProjectModal = (project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
    };

    const closeProjectModal = () => {
        setSelectedProject(null);
        setCurrentImageIndex(0);
    };

    const nextImage = () => {
        if (selectedProject) {
            setCurrentImageIndex((prev) =>
                (prev + 1) % selectedProject.screenshots.length
            );
        }
    };

    const prevImage = () => {
        if (selectedProject) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? selectedProject.screenshots.length - 1 : prev - 1
            );
        }
    };

    if (!isMounted) {
        return (
            <section id="projects" className="py-20 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Featured Projects
                        </h2>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="py-20 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Featured Projects
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Professional web applications and tools built with modern technologies
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <Card
                            key={project.id}
                            className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group cursor-pointer"
                            onClick={() => openProjectModal(project)}
                        >
                            <CardHeader>
                                <div
                                    className="w-full h-48 rounded-lg mb-4 relative overflow-hidden"
                                    style={{
                                        background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)`,
                                        border: `1px solid ${project.color}30`
                                    }}
                                >
                                    {project.screenshots && project.screenshots[0] ? (
                                        <img
                                            src={project.screenshots[0]}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600/20 to-pink-600/20">
                                        <div
                                            className="w-20 h-20 rounded-full opacity-60 group-hover:scale-110 transition-transform duration-300"
                                            style={{ backgroundColor: project.color }}
                                        />
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <Box className="text-white/60 text-xl group-hover:animate-spin" size={24} />
                                    </div>
                                </div>

                                <CardTitle className="text-white group-hover:text-purple-400 transition-colors text-lg">
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="text-gray-400 text-sm line-clamp-3">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>

                            <CardFooter className="flex gap-3">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 border-purple-400/50 text-purple-400 hover:bg-purple-400 hover:text-white"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(project.demo, '_blank');
                                    }}
                                >
                                    <ExternalLink className="mr-2" size={16} />
                                    Live Demo
                                </Button>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="flex-1 bg-white/10 text-white hover:bg-white/20"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(project.source, '_blank');
                                    }}
                                >
                                    <Github className="mr-2" size={16} />
                                    Code
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Project Modal */}
                {selectedProject && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
                                        <p className="text-gray-300">{selectedProject.description}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={closeProjectModal}
                                        className="text-white hover:bg-white/10"
                                    >
                                        <X size={20} />
                                    </Button>
                                </div>

                                {/* Video Section */}
                                {selectedProject.video && (
                                    <div className="mb-6">
                                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                            <Play size={20} />
                                            Video Demo
                                        </h4>
                                        <video
                                            className="w-full rounded-lg border border-white/20"
                                            controls
                                            src={selectedProject.video}
                                        />
                                    </div>
                                )}

                                {/* Screenshots Gallery */}
                                {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                                    <div className="mb-6">
                                        <h4 className="text-lg font-semibold text-white mb-3">Screenshots</h4>
                                        <div className="relative">
                                            <img
                                                src={selectedProject.screenshots[currentImageIndex]}
                                                alt={`${selectedProject.title} Screenshot ${currentImageIndex + 1}`}
                                                className="w-full rounded-lg border border-white/20"
                                            />

                                            {selectedProject.screenshots.length > 1 && (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                                                        onClick={prevImage}
                                                    >
                                                        <ChevronLeft size={20} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                                                        onClick={nextImage}
                                                    >
                                                        <ChevronRight size={20} />
                                                    </Button>

                                                    <div className="flex justify-center mt-4 gap-2">
                                                        {selectedProject.screenshots.map((_, index) => (
                                                            <button
                                                                key={index}
                                                                className={`w-3 h-3 rounded-full transition-colors ${
                                                                    index === currentImageIndex ? 'bg-purple-400' : 'bg-white/30'
                                                                }`}
                                                                onClick={() => setCurrentImageIndex(index)}
                                                            />
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Technologies */}
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4">
                                    <Button
                                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                        onClick={() => window.open(selectedProject.demo, '_blank')}
                                    >
                                        <ExternalLink className="mr-2" size={18} />
                                        View Live Demo
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 border-white/30 text-white hover:bg-white/10"
                                        onClick={() => window.open(selectedProject.source, '_blank')}
                                    >
                                        <Github className="mr-2" size={18} />
                                        View Source Code
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

// Contact Section
const ContactSection = () => {
    return (
        <section id="contact" className="py-20 relative">
            <div className="container mx-auto px-6 text-center">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-4xl font-bold text-white mb-4">
                            Ready to Work Together?
                        </CardTitle>
                        <CardDescription className="text-xl text-gray-300">
                            Let's create something amazing with cutting-edge 3D web technologies
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8"
                            >
                                Hire on Upwork
                            </Button>
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
                            >
                                View Fiverr Gigs
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

// Main Portfolio Component
export default function AdvancedPortfolio() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <Box className="animate-spin text-purple-400 mx-auto mb-4" size={48} />
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Loading Portfolio
                    </h2>
                    <p className="text-gray-400">Initializing 3D experience...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <AnimatedBackground />
            <Header />
            <HeroSection />
            <GitHubSection />
            <ProjectsSection />
            <ContactSection />
        </div>
    );
}